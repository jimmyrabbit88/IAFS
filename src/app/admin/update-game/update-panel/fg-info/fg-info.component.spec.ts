import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FgInfoComponent } from './fg-info.component';

describe('FgInfoComponent', () => {
  let component: FgInfoComponent;
  let fixture: ComponentFixture<FgInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FgInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FgInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
