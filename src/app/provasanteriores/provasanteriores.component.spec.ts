import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvasAnterioresComponent } from './provasanteriores.component';

describe('ProvasAnterioresComponent', () => {
  let component: ProvasAnterioresComponent;
  let fixture: ComponentFixture<ProvasAnterioresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvasAnterioresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvasAnterioresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
