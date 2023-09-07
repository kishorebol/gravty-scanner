import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  title = 'gravty-scanner';
  requestUrl: { method: 'post' | 'get' | 'put' | 'delete'; url: string } = {
    url: location.origin,
    method: 'post',
  };

  fileUrl: { method: 'post' | 'get' | 'put' | 'delete'; url: string } = {
    url: location.origin,
    method: 'post',
  };

  ngOnInit() {
    if (
      localStorage.getItem('scanner_url') === null ||
      localStorage.getItem('scanner_url') === undefined ||
      localStorage.getItem('scanner_url') === ''
    ) {
      localStorage.setItem('scanner_url', JSON.stringify(this.requestUrl));
    } else {
      this.requestUrl = JSON.parse(localStorage.getItem('scanner_url')!);
    }

    if (
      localStorage.getItem('scanner_file_url') === null ||
      localStorage.getItem('scanner_file_url') === undefined ||
      localStorage.getItem('scanner_file_url') === ''
    ) {
      localStorage.setItem('scanner_file_url', JSON.stringify(this.fileUrl));
    } else {
      this.fileUrl = JSON.parse(localStorage.getItem('scanner_file_url')!);
    }
  }
}
