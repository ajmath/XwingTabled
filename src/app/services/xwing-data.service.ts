import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpProvider } from '../providers/http.provider';
import { Observable, from, onErrorResumeNext, of, zip } from 'rxjs';
import { concatMap, flatMap, map, tap, catchError } from 'rxjs/operators';
import { Events } from '@ionic/angular';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { DomSanitizer } from '@angular/platform-browser';
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { FactionShipPilot, Manifest, DamageCard, FactionShip, Keyed, Upgrade } from '../types';
import { clone, arrayFlatMap } from '../util/helpers';
@Injectable({
  providedIn: 'root'
})
export class XwingDataService {
  topic = 'XwingDataService';
  last_message = '';
  downloading = false;
  // Data structure containing filename => json mapping
  progress = 0;
  initialized = false;
  transfer!: FileTransferObject;

  // Should be hotlinked?
  hotlink = true;

  // key/filename pairs
  image_map: {[s: string]: string} = { };

  // base64urls for native, hotlinks for mobile

  image_urls: {[s: string]: string} = { };
  manifest_url = 'https://raw.githubusercontent.com/jychuah/XwingTabled/master/scripts/manifest.json';

  // Json Data
  data?: Manifest;

  constructor(private storage: Storage, private http: HttpProvider, private events: Events,
              private platform: Platform, private file: File,
              private sanitizer: DomSanitizer) {

    this.hotlink = !platform.is('cordova');

    this.storage.ready().then(
      () => {
        this.status('service_ready', 'X-Wing Data Service Ready');
        this.check_manifest();
      }
    );
  }

  status(status: string, message: string = '', progress: number = this.progress) {
    this.events.publish(this.topic, { 'status' : status, 'message' : message, 'progress' : progress });
    this.last_message = message;
    console.log(status, message);
  }

  async reset() {
    // Delete all locally stored DB data (not images)
    this.initialized = false;
    this.image_map = { };
    this.image_urls = { };
    this.data = undefined;
    await this.storage.clear();
    this.check_manifest();
  }

  check_manifest() {
    // Start of data verification/download sequence
    // Loads cached data structure containing all xwing-data2 data.
    // If none is stored, then this.data will be null
    // Followed by download_manifest()
    this.status('manifest_loading', 'Loading cached manifest... ');
    this.storage.get('manifest').then(
      (data) => {
        this.status('manifest_loading', 'Loading cached manifest... found!');
        this.data = data;
        this.download_manifest();
      },
      (error) => {
        this.status('manifest_loading', 'Loading cached manifest... none found');
        this.download_manifest();
      }
    );
  }

  download_manifest() {
    // Download the current manifest from xwing-data2
    this.status('manifest_downloading', 'Downloading current manifest...');
    console.log('Downloading from', this.manifest_url);
    this.http.get(this.manifest_url).subscribe(
      (manifest: Manifest) => {
        if (!manifest) {
          return;
        }
        this.status('manifest_downloading', 'Downloading current manifest... received!');
        const new_manifest = manifest;
        if (!this.data || this.data['version'] !== new_manifest['version']) {
          this.storage.set('manifest', new_manifest);
          this.data = new_manifest;
        }
        // Our manifest is good to go.
        this.status('manifest_current', 'Manifest is current.');
        console.log('X-Wing Json Data', this.data);
        this.load_images(this.data);
      },
      (error) => {
        if (this.data) {
          // Even if we weren't able to download a manifest, at least we have some existing data
          this.load_images(this.data);
        } else {
          this.status('no_data_no_connection', 'Unable to load or download manifest.json');
        }
      }
    );
  }


  load_from_storage(keys: string[]): Observable<{ key: string, value: any }> {
    // Helper function to sequentially load keys from storage
    let done = 0;
    // Stream keys one at a time
    const keys_obs = from(keys);
    const value_obs = from(keys).pipe(
      concatMap(key => {
        // Save last key streamed, attempt to get the data
        return this.storage.get(key);
      })
    );
    return zip(keys_obs, value_obs)
      .pipe(
        map(([key, value]) => ({ key, value })),
        tap(() => {
          done = done + 1;
          this.progress = (done / keys.length) * 100;
        }),
      );
  }

  create_file_list(manifest: Manifest, extension: string) {
    // "Flatten" a JSON dictionary, keeping only string values with a file extension
    const unpack_queue: any[] = [ ];
    const download_list: string[] = [];

    // Push the manifest dictionary as the first object
    unpack_queue.push(manifest);

    // While there are still items to unpack
    while (unpack_queue.length > 0) {
      // Dequeue the front item
      const item = unpack_queue.shift();

      try {
        // If the item is a string, see if it matches our extension
        if (typeof item === 'string' && item.endsWith(extension)) {
          download_list.push(item);
        } else if (item instanceof Array) {
          // If it's an array, push all values to the back of the unpack queue
          unpack_queue.push(...item.filter((i) => !!i));
        } else {
          // If it's a dictionary, unpack all key/value pairs and only push the values
          unpack_queue.push(...Object.values(item).filter((i) => !!i));
        }
      } catch (err) {
        console.log('Error creating file list from manifest', manifest);
        console.log('Could not unpack', item);
      }
    }
    return download_list;
  }

  url_to_filename(url: string) {
    // Extract the filename from a URL
    const tokens = url.split('/');
    return tokens[tokens.length - 1];
  }

  download(urls: string[], options: any = {}) {
    // Helper function to sequentially download files
    this.progress =  0;
    this.downloading = true;
    let done = 0;
    const url_obs = from(urls);
    const download_obs = from(urls).pipe(
      concatMap(
        url => this.http.get(url, { }, options).pipe(
          catchError(error => {
            console.log('HTTP get error', error);
            return of(undefined);
          })
        )
      ),
    );
    return zip(url_obs, download_obs)
      .pipe(
        map((url, response) => ({ url, response})),
        tap(() => {
          done = done + 1;
          this.progress = (done / urls.length) * 100;
        }),
      );
  }

  mangle_name(name: string): string {
    // Canonicalizes names: T-65 X-Wing => t65xwing
    return name.replace(/\s/g, '').replace(/\-/g, '').toLowerCase();
  }

  store_response(url: string, response: any) {
    const key = this.url_to_key_name(url);
    const value = response;
    this.storage.set(key, value);
  }

  create_data_file_list(manifest: Manifest, extension: string) {
    // Create a list of data files to download. Skip ships.json since it no longer
    // exists in xwing-data2
    const files = this.create_file_list(manifest, extension);
    return files.filter((f) => f !== 'data/ships/ships.json');
  }

  url_to_key_name(url: string): string {
    // Extract file.json from end of URL and strip to friendly keyname
    const url_elements = url.split('/');
    const name = url_elements[url_elements.length - 1];
    return this.mangle_name(name).replace(/.json$/, '').replace(/.png$/, '').replace(/.jpg$/, '');
  }

  getDamageDeck() {
    const deck: DamageCard[] = [];
    if (!this.data) {
      return [];
    }

    this.data.damagedecks[0].cards.forEach(
      (card) => {
        for (let i = 0; i < card.amount; i++) {
          let initials = '';
          card.title.split(' ').forEach(
            (word) => {
              initials = initials + word[0];
            }
          );
          deck.push({ ...card, initials, exposed: false, });
        }
      }
    );
    return deck;
  }

  getCondition(xwsCondition: string) {
    if (!this.data) {
      return;
    }
    const condition = this.data.conditions.find((c) => c.xws === xwsCondition);
    return condition ? clone(condition) : undefined;
  }

  getPilot(faction: string, xwsShip: string,
           xwsPilot: string): FactionShipPilot | undefined {
    if (!this.data) {
      return;
    }
    // Given a faction string and pilot object retrieve object data
    // or return null if it can't be retrieved
    const ship = this.getShip(faction, xwsShip);
    if (!ship) {
      return;
    }
    if (this.data.shims.xwsPilot[xwsPilot]) {
      xwsPilot = this.data.shims.xwsPilot[xwsPilot];
    }
    const pilot = ship.pilots.find((p) => p.xws === xwsPilot);
    return pilot ? clone(pilot) : undefined;
  }

  getXwsPilotFromFFG(id: number): PilotShipIds | undefined {
    if (!this.data) {
      return;
    }
    for (const faction of this.data.pilots) {
      for (const ship of Object.values(faction.ships)) {
        const shipData = ship.pilots.find((p) => p.ffg === id);
        if (shipData) {
          return {
            id: shipData.xws,
            name: shipData.xws,
            ship: ship.xws,
          };
        }
      }
    }
    return undefined;
  }

  getXwsUpgradeFromFFG(id: number): UpgradeIds | undefined {
    if (!this.data) {
      return;
    }

    for (const [type, upgrades] of Object.entries(this.data.upgrades)) {
      const upgradeData = upgrades.find((u) => u.sides[0].ffg === id);
      if (upgradeData) {
        return { type, xws: upgradeData.xws };
      }
    }
    return undefined;
  }

  getYasbUpgrade(id: number) {
    if (!this.data) {
      return;
    }

    const upgrade = this.data.yasb.upgrades[id];
    if (!upgrade) {
      return null;
    }
    return clone(upgrade);
  }

  getYasbPilot(id: number) {
    if (!this.data) {
      return;
    }

    const pilot = this.data.yasb.pilots[id];
    return pilot ? clone(pilot) : undefined;
  }

  getShip(faction: string, xwsShip: string): (FactionShip & Keyed) | undefined {
    if (!this.data) {
      return;
    }

    if (this.data.shims.xwsShip[xwsShip]) {
      xwsShip = this.data.shims.xwsShip[xwsShip];
    }

    const factionData = this.data.pilots.find((p) => p.faction === faction);
    if (!factionData || !factionData.ships || !factionData.ships[xwsShip]) {
      return;
    }
    return {
      ...clone(factionData.ships[xwsShip]),
      keyname: xwsShip,
    };
  }

  getUpgrade(upgradeType: string, xwsUpgrade: string) {
    if (!this.data) {
      return;
    }

    if (this.data.shims.xwsUpgrade[xwsUpgrade]) {
      xwsUpgrade = this.data.shims.xwsUpgrade[xwsUpgrade];
    }

    if (!this.data.upgrades[upgradeType]) {
      throw new Error(`Invalid upgrade type: ${upgradeType}`);
    }
    const upgrade = this.data.upgrades[upgradeType].find((u) => u.xws === xwsUpgrade);
    return upgrade ? clone(upgrade) : undefined;
  }


  load_images(manifest: Manifest) {
    if (this.hotlink) {
      // If this is running in a desktop browser, then we can simply
      // hotlink to FFG's image CDN
      this.hotlink_images(manifest);
    } else {
      // Otherwise, begin a local file storage loading sequence.
      this.await_mainpage_loading_notification(manifest);
    }
  }

  await_mainpage_loading_notification(manifest: Manifest) {
    // Wait for the Main Page to verify that the "loading" screen is present
    this.events.subscribe('mainpage', (event) => {
      if (event.message === 'loading_controller_present') {
        this.load_images_from_storage(manifest);
      }
    });
    // Notify the Main Page that we will begin loading images.
    // The above subscription actually begins the loading - but we have
    // to wait for the Main Page to disable screen interactions with
    // LoadingController
    this.status('loading_images', 'Loading artwork.');
  }

  load_images_from_storage(manifest: Manifest) {
    // Create a list of image filenames to search for locally
    // from a manifest.
    const filenames: string[] = [ ];

    this.create_file_list(manifest, '.png').forEach(
      (url) => {
        filenames.push(this.url_to_filename(url));
      }
    );
    this.create_file_list(manifest, '.jpg').forEach(
      (url) => {
        filenames.push(this.url_to_filename(url));
      }
    );

    // Find the app's cacheDirectory
    this.file.resolveDirectoryUrl(this.file.cacheDirectory).then(
      (value) => {
        // Once found, load image files from the app's cache directory
        this.load_files_from_directory(value, filenames);
      },
      (error) => {
        // Something is seriously wrong - we can't load the app cache directory?
        console.log('can\'t resolve directory url', error);
      }
    );
  }

  async get_image_by_key(key: string): Promise<string> {
    // Image loader helper method
    // Given a image keyname, find its associated URL
    if (this.image_urls[key]) {
      // For hotlinked images, this should always be filled
      return this.image_urls[key];
    }
    // If an image_url[key] is empty, that means we must load from disk and cache it for later
    const base64url = await this.file.readAsDataURL(this.file.cacheDirectory, this.image_map[key]);
    this.image_urls[key] = this.sanitizer.bypassSecurityTrustUrl(base64url) as string;
    return this.image_urls[key];
  }

  async get_image_by_url(url: string): Promise<string> {
    // Get an image via its URL
    return await this.get_image_by_key(this.url_to_key_name(url));
  }

  load_files_from_directory(directory: any, filenames: string[]) {
    // Do a quick file check for a list of images in a directory

    // Create a ({filename, status}) sequence
    const filenames_obs = from(filenames);
    const filereader_obs = from(filenames).pipe(
      flatMap(
        filename => from(
          this.file.checkFile(this.file.cacheDirectory, filename)
        )
      ),
      catchError(
        error => {
          return of(undefined);
        }
      )
    );
    const zipped = zip(filenames_obs, filereader_obs)
      .pipe(
        map(([filename, status]) => ({ filename, status }))
      );

    let done = 0;
    const missing: string[] = [ ];

    // Subscribe to the sequence
    zipped.subscribe(
      (item) => {
        // Mark progress that a file has been checked
        done = done + 1;
        this.progress = (done / filenames.length) * 100;
        const key = this.url_to_key_name(item.filename);

        if (item.status) {
          // If a file is present, record its filename in our image_map
          this.image_map[key] = item.filename;
          // this.status("image_loaded", "Found image " + item.filename);
        } else {
          // If it's missing, mark it as missing
          this.status('image_loaded', 'Missing image ' + item.filename);
          missing.push(item.filename);
        }
      },
      (error) => {
        console.log('image loader error', error);
      },
      () => {
        // Notify Main Page that loading images has finished
        this.status('loading_images_complete', 'Loading images complete');
        if (missing.length) {
          // If there are missing images, notify the Main Page so the user can be prompted to download it
          // This should trigger download_missing_images()
          this.status('images_missing', 'Some X-Wing artwork is missing and must be downloaded');
        } else {
          // If there are no missing images, then mark this service as initialized!
          this.initialized = true;
          this.status('images_complete', 'All X-Wing artwork loaded');
          console.log('X-Wing Image Data', this.image_map);
        }
      }
    );
  }

  missing_file_list(manifest: Manifest): string[ ] {
    // Construct a list of missing image files. Missing image
    // files are any .png or .jpg that do not appear in the image_map, which
    // should have been loaded during load_files_from_directory
    return [
      ...this.create_file_list(manifest, '.png')
        .filter((u) => !this.image_map[this.url_to_key_name(u)]),
      ...this.create_file_list(manifest, '.jpg')
        .filter((u) => !this.image_map[this.url_to_key_name(u)])
    ];
  }

  hotlink_images(manifest: any) {
    // Hotlink any images in our image_urls structure directly to FFG.
    this.create_file_list(manifest, '.png').forEach(
      (url) => {
        this.image_urls[this.url_to_key_name(url)] = url;
      }
    );
    this.create_file_list(manifest, '.jpg').forEach(
      (url) => {
        this.image_urls[this.url_to_key_name(url)] = url;
      }
    );
    // Notify Main Page that loading images has finished
    this.status('loading_images_complete', 'Loading images complete');
    this.status('images_complete', 'X-Wing artwork hotlinked');
    this.initialized = true;
    console.log('X-Wing Images hotlinked URLS', this.image_urls);
  }

  download_missing_images(manifest: any) {
    // Sequentially ownload missing images from FFG image-cdn

    // Create a list of images to download
    const missing: string[] = [ ];
    const urls = this.missing_file_list(manifest);

    // Create a sequence of ( { urls, fileEntry })
    const url_obs = from(urls);
    const file_obs = from(urls).pipe(
      concatMap(
        url => this.transfer.download(url, this.file.cacheDirectory + this.url_to_filename(url))
      ),
      catchError(
        error => {
          console.log('download error', error);
          return of(undefined);
        }
      )
    );
    const zipped = zip(url_obs, file_obs, (url, fileEntry) => ({ url, fileEntry}));
    let done = 0;

    // Subscribe to the downloads
    zipped.subscribe(
      (result) => {
        const key = this.url_to_key_name(result.url);
        done = done + 1;
        this.progress = (done / urls.length) * 100;
        // Check each download
        if (result.fileEntry) {
          // If a fileEntry is present, mark it as downloaded in our image_map
          this.status('image_download', 'Downloaded ' + key);
          this.image_map[key] = this.url_to_filename(result.url);
        } else {
          // Otherwise mark it is missing
          this.status('image_download', 'Unable to download ' + key);
          missing.push(key);
        }
      },
      (error) => { },
      () => {
        if (missing.length) {
          // If there are images that could not be downloaded, inform the Main Page
          this.status('image_download_incomplete', 'Unable to download one or more images');
        } else {
          // Otherwise we are good to go. Mark the service as initialized!
          this.status('image_download_complete', 'X-Wing artwork has been downloaded');
          this.initialized = true;
          console.log('X-Wing Image Data', this.image_map);
        }
      }
    );
  }
}

export interface PilotShipIds {
  id: string;
  name: string;
  ship: string;
}

export interface UpgradeIds {
  type: string;
  xws: string;
}
