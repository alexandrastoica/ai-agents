import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { AgentsApiService, Agent, Task } from '../agents-api.service';
import { MessageService } from '../message.service';
import { ProcessAgentDataService } from '../process-agent-data.service';

@Component({
  selector: 'app-agent-detail',
  templateUrl: './agent-detail.component.html',
  styleUrls: ['./agent-detail.component.scss']
})
export class AgentDetailComponent implements OnInit {
  @Input() agent: Agent;
  averages = {};
  categories: Set<Task['category']>;
  dataError = false;
  dataLoaded = false;
  displayedColumns: string[] = ['name', 'category', 'score'];
  displayedColumnsAvg: string[] = ['category', 'average'];
  tasks: Task[] = [];

  constructor(private route: ActivatedRoute, private location: Location,
              private agentsApiService: AgentsApiService, private messageService: MessageService,
              private processAgentDataService: ProcessAgentDataService) { }

  ngOnInit(): void {
    const state: any = this.location.getState();

    // If the agent data wasn't passed via state, fetch the agent by name.
    if (state.hasOwnProperty('agent')) {
      this.setAgent(state.agent);
    } else {
      this.fetchAgent();
    }
  }

  // Helper function for navigating back.
  goBack(): void {
    this.location.back();
  }

  /**
   * Fetches agend by getting the agent name from the route.
   * Sets flags to display app status.
   * Sends a global message if the fetch fails.
   */
  fetchAgent(): void {
    const name = this.route.snapshot.paramMap.get('name');
    if (name) {
      this.agentsApiService.getAgentByName(name).then(agent => {
        this.setAgent(agent);
      }).catch(error => {
        this.dataError = true;
        this.messageService.openSnackBar('Couldn\'t fetch this agent. Please try again.', 'Retry');
      });
    }
  }

  /**
   * Set agent data and processes averages and categories.
   */
  setAgent(agent: Agent): void {
    this.agent = agent;
    this.tasks = this.agent.tasks;
    this.averages = this.processAgentDataService.getAveragesWithCategories(this.agent);
    this.categories = this.processAgentDataService.getCategories(this.agent);
    this.dataLoaded = true;
  }
}
