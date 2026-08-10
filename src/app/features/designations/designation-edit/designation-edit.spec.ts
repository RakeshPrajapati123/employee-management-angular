import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignationEdit } from './designation-edit';

describe('DesignationEdit', () => {
  let component: DesignationEdit;
  let fixture: ComponentFixture<DesignationEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesignationEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesignationEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
