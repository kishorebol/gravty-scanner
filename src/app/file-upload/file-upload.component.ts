import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.less'],
})
export class FileUploadComponent {
  constructor(private http: HttpClient, private router: ActivatedRoute) {}
  errorMessage: any = '';

  uploadFile(fileData: any) {
    let requestUrl: {
      method: 'post' | 'get' | 'put' | 'delete' | 'patch';
      url: string;
    } = JSON.parse(localStorage.getItem('scanner_url')!);

    let formData = new FormData();
    formData.append('file', fileData.target.files[0]);

    let requestOptions: any = {};

    if (requestUrl.method !== 'get') {
      requestOptions['body'] = formData;
    }

    this.http
      .request(requestUrl.method, requestUrl.url, requestOptions)
      .subscribe(
        (response: any) => {
          this.sendFileResponse(response);
        },
        (respose: any) => {
          console.log(respose);
          this.errorMessage = respose.error.error.message;
        }
      );
  }

  sendFileResponse(data: any) {
    let requestUrl: {
      method: 'post' | 'get' | 'put' | 'delete' | 'patch';
      url: string;
    } = JSON.parse(localStorage.getItem('scanner_file_url')!);

    let requestOptions: any = {};

    if (requestUrl.method !== 'get') {
      requestOptions['body'] = data;
    }

    this.http
      .request(requestUrl.method, requestUrl.url, requestOptions)
      .subscribe(
        (response: any) => {
          this.errorMessage = 'Success';
          setTimeout(() => {
            this.errorMessage = '';
          }, 3000);
        },
        (respose: any) => {
          console.log(respose);
          this.errorMessage = respose.error.error.message;
        }
      );
  }
}
