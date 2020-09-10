import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentCompareSelectComponent } from './agent-compare-select.component';

describe('AgentCompareSelectComponent', () => {
  let component: AgentCompareSelectComponent;
  let fixture: ComponentFixture<AgentCompareSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentCompareSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentCompareSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
