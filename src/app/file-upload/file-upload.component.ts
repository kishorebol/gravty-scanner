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
    let requestUrl: any = JSON.parse(localStorage.getItem('scanner_url')!);
    let member_id = this.router.snapshot.params['member_id'];
    requestUrl = requestUrl.url + '/' + member_id;
    
    let formData = new FormData();
    formData.append('file', fileData.target.files[0]);

    this.http.post(requestUrl, formData).subscribe(
      (response: any) => {
        this.errorMessage = 'Success';
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      },
      (respose: any) => {
        console.log(respose);
        this.errorMessage = respose.error.message;
      }
    );
  }
}
