import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopnavWithSidenavComponent } from './topnav-with-sidenav.component';

describe('TopnavWithSidenavComponent', () => {
  let component: TopnavWithSidenavComponent;
  let fixture: ComponentFixture<TopnavWithSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopnavWithSidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopnavWithSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
