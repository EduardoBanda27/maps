import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicacionesPage } from './indicaciones.page';

describe('IndicacionesPage', () => {
  let component: IndicacionesPage;
  let fixture: ComponentFixture<IndicacionesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicacionesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicacionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
