import { Component } from '@angular/core';
import { Agent, AgentsApiService } from './agents-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AgentsApiService]
})
export class AppComponent {
  agents: ReadonlyArray<Agent> = [];

  constructor(public agentsApiService: AgentsApiService) {
    this.displayData();
  }

  displayData(): void {
    this.agentsApiService.listAgents().then(data => {
      this.agents = data;
    }).catch((error) => {
      console.error(error);
    });
  }
}
