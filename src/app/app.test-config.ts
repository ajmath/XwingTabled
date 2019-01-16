import { TestBed, getTestBed, TestModuleMetadata } from '@angular/core/testing';
import { IonicStorageModule } from '@ionic/storage';
import { HttpProvider } from './providers/http.provider';
import { HttpAngularProvider } from './providers/http-angular.provider';
import { HttpNativeProvider } from './providers/http-native.provider';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP } from '@ionic-native/http/ngx';
import { Events, Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';

const default_metadata: TestModuleMetadata = {
  providers: [
    Events, HttpProvider, HttpAngularProvider,
    HttpNativeProvider, Platform, HTTP, File, FileTransfer ],
  imports: [ IonicStorageModule.forRoot(), HttpClientTestingModule ],
  schemas: [],
  declarations: [],
};

function merge_arrays(one: any[], two: any[]): any[] {
  const result = [];
  if (one) {
    one.forEach(
      (element) => { result.push(element ); }
    );
  }
  if (two) {
    two.forEach(
      (element) => {
        if (!result.includes(element)) {
          result.push(element);
        }
      }
    );
  }

  return result;
}

function merge_metadata(one: TestModuleMetadata, two: TestModuleMetadata): TestModuleMetadata {
  const result: TestModuleMetadata = {
    providers: [],
    imports: [],
    schemas: [],
    declarations: []
  };
  Object.entries(result).forEach(
    ([ key, value ]) => {
      result[key] = merge_arrays(one[key], two[key]);
    }
  );
  return result;
}

export function configureTestbed(metadata: TestModuleMetadata = { }) {
  return TestBed.configureTestingModule(merge_metadata(default_metadata, metadata));
}
