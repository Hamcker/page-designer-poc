import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDesignerComponent } from './view-designer.component';

describe('ViewDesignerComponent', () => {
  let component: ViewDesignerComponent;
  let fixture: ComponentFixture<ViewDesignerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDesignerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDesignerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
