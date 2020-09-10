import { Component, Input, AfterContentInit, OnChanges } from '@angular/core';
import zingchart from 'zingchart/es6';
/**
 * Zingchart should be compatible in modern browsers
 * ref: https://help.zingsoft.com/en/articles/1577886-zingchart-what-browsers-is-zingchart-compatible-with
 */

export interface ChartData {
  readonly category: number;
}

@Component({
  selector: 'app-agent-compare-chart',
  templateUrl: './agent-compare-chart.component.html',
  styleUrls: ['./agent-compare-chart.component.scss']
})
export class AgentCompareChartComponent implements AfterContentInit, OnChanges {
  @Input() data: [];
  config: zingchart.graphset = {
    type: 'bar',
    fontSize: 16,
    backgroundColor: 'transparent',
    title: {
      text: 'Average scores on categories',
      fontFamily: 'Lato',
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
      fontFamily: 'Lato',
    },
    scaleY: {
      label: {
        text: 'Average score',
        fontFamily: 'Lato',
        fontSize: '16px',
      },
      item: {
        fontFamily: 'Lato',
        fontSize: '14px',
        color: '#000'
      },
    },
    scaleX: {
      label: {
        text: 'Category',
        fontFamily: 'Lato',
        fontSize: '16px',
      },
      item: {
        fontFamily: 'Lato',
        fontSize: '14px',
        color: '#000'
      },
    },
    noData: {
      text: 'Fetching data...',
      fontFamily: 'Lato',
    }
  };
  series: zingchart.series = [];
  colors = ['#1A237E', '#F8BBD0', '#304ffe'];
  hideChart = false;

  constructor() { }

  ngOnChanges() {
    this.processData();
  }

  ngAfterContentInit() {
    this.processData();
  }

  processData(): void {
    // Hide chart if data is empty.
    if (Object.keys(this.data).length) {
      this.hideChart = true;
    }

    this.series = [];
    Object.keys(this.data).forEach((agent, i) => {
      if (!this.data[agent]) {
        // Hide chart if an agent is undefined.
        this.hideChart = true;
        return;
      }
      // This assumes all the agents have exactly the same categories.
      if (i === 0) {
        this.config.scaleX.labels = Object.keys(this.data[agent]);
      }

      this.series.push({
        values: Object.values(this.data[agent]),
        backgroundColor: this.colors[i],
        text: agent
      });
    });
  }
}
