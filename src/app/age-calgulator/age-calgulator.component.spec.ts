import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgeCalgulatorComponent } from './age-calgulator.component';

describe('AgeCalgulatorComponent', () => {
  let component: AgeCalgulatorComponent;
  let fixture: ComponentFixture<AgeCalgulatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgeCalgulatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgeCalgulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
