import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentDetailComponent } from './agent-detail.component';

describe('AgentDetailComponent', () => {
  let component: AgentDetailComponent;
  let fixture: ComponentFixture<AgentDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
