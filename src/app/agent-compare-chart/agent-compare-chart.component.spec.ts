import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentCompareChartComponent } from './agent-compare-chart.component';

describe('AgentCompareChartComponent', () => {
  let component: AgentCompareChartComponent;
  let fixture: ComponentFixture<AgentCompareChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentCompareChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentCompareChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
