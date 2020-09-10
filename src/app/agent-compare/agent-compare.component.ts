import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Agent, AgentsApiService } from '../agents-api.service';
import { ProcessAgentDataService } from '../process-agent-data.service';
import { MessageService } from '../message.service';
import { Subscription } from 'rxjs';

import { MatSelectChange } from '@angular/material/select';

type ComparisonAgent = Agent | undefined;

@Component({
  selector: 'app-agent-compare',
  templateUrl: './agent-compare.component.html',
  styleUrls: ['./agent-compare.component.scss']
})
export class AgentCompareComponent implements OnInit, OnDestroy {
  MAX_AGENTS = 2; // constant for the number of agents to compare.
  agentNames: string[] = [];
  agents: ReadonlyArray<Agent> = [];
  agentsToCompare: ComparisonAgent[] = [];
  chartData = {};
  dataError = false;
  dataLoaded = false;
  params: string[];
  acceptedParams = [];
  duplicatedAgents = false;
  sub: Subscription;

  constructor(private router: Router, private route: ActivatedRoute, public agentsApiService: AgentsApiService,
              private processAgentDataService: ProcessAgentDataService, private messageService: MessageService) {

    this.acceptedParams = [];
    this.agentsToCompare = [];

    // Setting up params and priming agentsToCompare array.
    for (let i = 0; i < this.MAX_AGENTS; i++) {
      this.acceptedParams.push(this.processPramaKey(i + 1));
      this.agentsToCompare.push(undefined);
    }
  }

  ngOnInit(): void {
    this.fetchAgents();
  }

  /**
   * Fetches agents to display select options and assign agents to compare.
   * Needs refactor: this might be too expensive if the data set is large.
   * Optimisation: fetching names only to display as select options
   *    (assuming names are unique), and fetching only the two agents
   *    needed for comparison.
   */
  fetchAgents(): void {
    this.agentsApiService.listAgents().then(data => {
      this.agents = data;
      this.dataLoaded = true;
      this.setFromParams();
    }).catch(() => {
      this.dataError = true;
      this.messageService.openSnackBar('Couldn\'t fetch agents. Please try again.', 'Retry');
    });
  }

  /**
   * Gets agent by name by filtering through agents (assumes names are unique).
   */
  getAgentByName(value: string): Agent {
    return this.agents.filter(agent => agent.name.toLowerCase() === value.toLowerCase())[0];
  }

  /**
   * Subscribes to ActivatedRoute to set the params passed via route.
   */
  setFromParams(): void {
    this.sub = this.route.queryParams.subscribe(() => {
      this.params = [];
      this.duplicatedAgents = false;

      for (let i = 0; i < this.MAX_AGENTS; i++) {
        const agentName = this.route.snapshot.queryParamMap.get(this.acceptedParams[i]);

        // If the name is already in the params array,
        // we have duplicated agents.
        if (this.params.includes(agentName)) {
          this.duplicatedAgents = true;
        }

        if (agentName && !this.params.includes(agentName)) {
          this.params.push(agentName);
          this.setSelectedAgent(i, agentName);
          this.setGroupData();
        }
      }
    });
  }

  /**
   * Sets respective agent by id. If agent not found
   * displays a message to inform the user.
   * This displays a snackbar message instead of an error, because it means
   * the user passed an incorect name in the URL, and to maintain the mental
   * model around failing API calls/not finding data.
   */
  setSelectedAgent(i: number, name: string): void {
    // Don't update agents that are already set accordingly.
    if (this.agentsToCompare[i] && this.agentsToCompare[i].name.toLowerCase() === name) {
      return;
    }

    const agent = this.getAgentByName(name);
    if (agent) {
      this.agentsToCompare[i] = agent;
    } else {
      // If no agent found, display a message.
      this.messageService.openSnackBar(`Couldn't find agent ${i + 1}.`);
    }
  }

  /**
   * Method fired when the user selects a value. This checks which select
   * component was changed by id, and updates the route accordingly.
   */
  selectChanged(event: MatSelectChange): void {
    this.duplicatedAgents = false;
    const id = event.source.id;
    const agentNo = +id[id.length - 1];
    if (!isNaN(agentNo)) {
      this.updateRoute(agentNo, event.value);
    }
  }

  /**
   * Updates route accepted params.
   */
  updateRoute(agentNo: number, param: string): void {
    const key = this.processPramaKey(agentNo);
    // Ensure the key is in the accepted params.
    if (!this.acceptedParams.includes(key)) {
      return;
    }

    const queryParams = {};
    queryParams[key] = param.toLowerCase();
    this.router.navigate([], {
      queryParams,
      queryParamsHandling: 'merge'
    });
  }

  /**
   * Generated required data to be passed for generating the bar chart.
   */
  setGroupData() {
    this.chartData = {};

    // Don't show chart if two agents are the same.
    if (this.duplicatedAgents) {
      return;
    }

    // Loop through agents to build chart data.
    for (let i = 0; i < this.MAX_AGENTS; i++) {
      // If an agent is not selected, don't show bar chart.
      if (!this.agentsToCompare[i]) {
        this.chartData = {};
        break;
      }

      this.chartData[this.agentsToCompare[i].name]
                = this.processAgentDataService.getAveragesWithCategoriesObj(this.agentsToCompare[i]);
    }
  }

  // Helper method to generate param key based on agent number.
  private processPramaKey(n: number): string {
    return `agent${n}`;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
