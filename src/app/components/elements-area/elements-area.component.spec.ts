import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementsAreaComponent } from './elements-area.component';

describe('ElementsAreaComponent', () => {
  let component: ElementsAreaComponent;
  let fixture: ComponentFixture<ElementsAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElementsAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementsAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
