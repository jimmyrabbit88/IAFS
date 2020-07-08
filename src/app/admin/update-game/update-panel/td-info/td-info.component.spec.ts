import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TdInfoComponent } from './td-info.component';

describe('TdInfoComponent', () => {
  let component: TdInfoComponent;
  let fixture: ComponentFixture<TdInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TdInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TdInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
