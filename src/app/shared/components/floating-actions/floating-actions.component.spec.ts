import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatingActionsComponent } from './floating-actions.component';

describe('FloatingActionsComponent', () => {
  let component: FloatingActionsComponent;
  let fixture: ComponentFixture<FloatingActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FloatingActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FloatingActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
