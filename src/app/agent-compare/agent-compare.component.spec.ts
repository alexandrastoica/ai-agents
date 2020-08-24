import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentCompareComponent } from './agent-compare.component';

describe('AgentCompareComponent', () => {
  let component: AgentCompareComponent;
  let fixture: ComponentFixture<AgentCompareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentCompareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
