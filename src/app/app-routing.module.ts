import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { ImageCamComponent } from './image-cam/image-cam.component';

const routes: Routes = [
  {
    path: 'upload/:member_id',
    component: FileUploadComponent,
  },
  {
    path: 'camera/:member_id',
    component: ImageCamComponent,
  },
  {
    path: '**',
    redirectTo: 'upload/:member_id',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
