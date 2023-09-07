import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-image-cam',
  templateUrl: './image-cam.component.html',
  styleUrls: ['./image-cam.component.less'],
})
export class ImageCamComponent {
  // toggle webcam on/off
  showWebcam = true;
  allowCameraSwitch = true;
  multipleWebcamsAvailable = false;
  deviceId: string = '';

  trigger: Subject<void> = new Subject<void>();
  nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();

  webcamImage: any = null;
  errorMessage: any = '';

  constructor(private http: HttpClient, private router: ActivatedRoute) {}

  ngOnInit() {
    WebcamUtil.getAvailableVideoInputs().then(
      (mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      }
    );
  }

  get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }

  triggerSnapshot() {
    this.trigger.next();
  }

  toggleWebcam() {
    this.showWebcam = !this.showWebcam;
  }

  handleInitError(error: WebcamInitError) {
    this.errorMessage = error.message;
    console.log(error);
  }

  showNextWebcam(directionOrDeviceId: boolean | string) {
    this.nextWebcam.next(directionOrDeviceId);
  }

  handleImage(webcamImage: WebcamImage) {
    this.webcamImage = webcamImage;
  }

  cameraWasSwitched(deviceId: string) {
    this.deviceId = deviceId;
  }

  postImage() {
    let requestUrl: any = JSON.parse(localStorage.getItem('scanner_url')!);

    let dataURI = this.webcamImage.imageAsDataUrl;
    this.errorMessage = '';

    fetch(dataURI)
      .then((res) => res.blob())
      .then((blob) => {
        let formData = new FormData();
        formData.append('file', blob, 'filename');

        this.http.post(requestUrl.url, formData).subscribe(
          (response: any) => {
            this.sendFileResponse(response);
          },
          (respose: any) => {
            console.log(respose);
            this.errorMessage = respose.error.error.message;
          }
        );
      });
  }

  sendFileResponse(data: any) {
    let requestUrl: any = JSON.parse(localStorage.getItem('scanner_file_url')!);

    this.http.post(requestUrl.url, data).subscribe(
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
