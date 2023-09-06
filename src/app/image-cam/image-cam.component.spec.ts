import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageCamComponent } from './image-cam.component';

describe('ImageCamComponent', () => {
  let component: ImageCamComponent;
  let fixture: ComponentFixture<ImageCamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImageCamComponent]
    });
    fixture = TestBed.createComponent(ImageCamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
