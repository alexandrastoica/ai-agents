import { Component, OnInit } from '@angular/core';
import { Agent, AgentsApiService, Task } from '../agents-api.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-agent-home',
  templateUrl: './agent-home.component.html',
  styleUrls: ['./agent-home.component.scss'],
  providers: [AgentsApiService]
})
export class AgentHomeComponent implements OnInit {
  agents: ReadonlyArray<Agent> = [];
  selectedAgent: Agent;
  query: string;
  dataLoaded = false;
  dataError = false;

  constructor(public agentsApiService: AgentsApiService, public messageService: MessageService) {}

  ngOnInit(): void {
    this.displayData();
  }

  /**
   * Fetches agents from via service.
   * Sets flags to display app status.
   * Sends a global message if the fetch fails.
   */
  public displayData(): void {
    this.agentsApiService.listAgents().then(data => {
      this.dataLoaded = true;
      this.agents = data;
    }).catch((error) => {
      this.dataError = true;
      this.messageService.openSnackBar('Couldn\'t fetch agents. Please try again.', 'Retry');
    });
  }

}
