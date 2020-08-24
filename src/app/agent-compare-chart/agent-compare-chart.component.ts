import { Component, Input, AfterContentInit, OnChanges } from '@angular/core';
import zingchart from 'zingchart/es6';

/**
 * Zingchart should be compatible in modern browsers
 * ref: https://help.zingsoft.com/en/articles/1577886-zingchart-what-browsers-is-zingchart-compatible-with
 */

@Component({
  selector: 'app-agent-compare-chart',
  templateUrl: './agent-compare-chart.component.html',
  styleUrls: ['./agent-compare-chart.component.scss']
})
export class AgentCompareChartComponent implements AfterContentInit, OnChanges {
  @Input() data: [];
  config: zingchart.graphset = {
    type: 'bar',
    backgroundColor: 'transparent',
    title: {
      text: 'Compare average scores on categories',
      fontSize: 16,
    },
    plot: {
      animation: {
        effect: 'ANIMATION_EXPAND_BOTTOM',
        method: 'ANIMATION_STRONG_EASE_OUT',
        sequence: 'ANIMATION_BY_NODE',
        speed: 275,
      }
    },
    legend: {
      draggable: true,
    },
    scaleY: {
      label: { text: 'Average score' }
    },
    scaleX: {
      label: { text: 'Category' },
    },
    noData: {
      text: 'Fetching data...'
    }
  };
  series: zingchart.series = [];

  constructor() { }

  ngOnChanges() {
    this.init();
  }

  ngAfterContentInit() {
    this.init();
  }

  init(): void {
    const keys = Object.keys(this.data);
    const agent1 = this.data[keys[0]];
    const agent2 = this.data[keys[1]];

    this.series = [{
      values: agent1,
      backgroundColor: '#00008c',
      text: keys[0]
    }, {
      values: agent2,
      backgroundColor: '#FD96A9',
      text: keys[1]
    }];

    // Hardcoded categories: needs refactor.
    this.config.scaleX.labels = ['Memory', 'Logic', 'Planning'];
  }
}
