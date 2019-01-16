import { TestBed, getTestBed } from '@angular/core/testing';
import { XwingDataService } from './xwing-data.service';
import { configureTestbed } from '../app.test-config';

describe('XwingDataService', () => {
  let injector: TestBed;
  let service: XwingDataService;
  const test_manifest = require('./test-manifest.json');

  beforeEach(() => {
    configureTestbed();
    injector = getTestBed();
    service = injector.get(XwingDataService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should find all files of a given extension in a json', () => {
    const generated_queue = service.create_file_list(test_manifest, '.json');
    expect(generated_queue.length).toEqual(11);
  });

  it('should mangle names', () => {
    expect(service.mangle_name('t-65-x-wing')).toEqual('t65xwing');
    expect(service.mangle_name('modified yt-1300')).toEqual('modifiedyt1300');
  });
});
