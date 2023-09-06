import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  title = 'gravty-scanner';
  requestUrl: any = {
    url: 'http://localhost:4200',
  };

  fileUrl: any = {
    url: 'http://localhost:4200',
  };

  ngOnInit() {
    if (
      localStorage.getItem('scanner_url') === null ||
      localStorage.getItem('scanner_url') === undefined ||
      localStorage.getItem('scanner_url') === ''
    ) {
      localStorage.setItem('scanner_url', JSON.stringify(this.requestUrl));
    } else {
      this.requestUrl = localStorage.getItem('scanner_url');
    }

    if (
      localStorage.getItem('scanner_file_url') === null ||
      localStorage.getItem('scanner_file_url') === undefined ||
      localStorage.getItem('scanner_file_url') === ''
    ) {
      localStorage.setItem('scanner_file_url', JSON.stringify(this.fileUrl));
    } else {
      this.fileUrl = localStorage.getItem('scanner_file_url');
    }
  }
}
