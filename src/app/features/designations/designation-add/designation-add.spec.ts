import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignationAdd } from './designation-add';

describe('DesignationAdd', () => {
  let component: DesignationAdd;
  let fixture: ComponentFixture<DesignationAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesignationAdd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesignationAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
