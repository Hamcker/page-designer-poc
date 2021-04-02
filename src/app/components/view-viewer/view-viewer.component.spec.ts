import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewViewerComponent } from './view-viewer.component';

describe('ViewViewerComponent', () => {
  let component: ViewViewerComponent;
  let fixture: ComponentFixture<ViewViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
