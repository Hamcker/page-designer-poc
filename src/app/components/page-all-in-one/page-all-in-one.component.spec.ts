import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAllInOneComponent } from './page-all-in-one.component';

describe('PageAllInOneComponent', () => {
  let component: PageAllInOneComponent;
  let fixture: ComponentFixture<PageAllInOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageAllInOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageAllInOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
