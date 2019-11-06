import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedalhasComponent } from './medalhas.component';

describe('MedalhasComponent', () => {
  let component: MedalhasComponent;
  let fixture: ComponentFixture<MedalhasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedalhasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedalhasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
