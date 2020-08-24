import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location } from '@angular/common';

import { Agent, AgentsApiService } from '../agents-api.service';
import { ProcessAgentDataService } from '../process-agent-data.service';
import { MessageService } from '../message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-agent-compare',
  templateUrl: './agent-compare.component.html',
  styleUrls: ['./agent-compare.component.scss']
})
export class AgentCompareComponent implements OnInit, OnDestroy {
  MAX_AGENTS = 2; // constant for the number of agents to compare.
  agents: ReadonlyArray<Agent> = [];
  agentsToCompare: Agent[] = [];
  chartData = {};
  dataError = false;
  dataLoaded = false;
  params: Params = [];
  possibleParams = ['agent1', 'agent2'];
  sameAgent = false;
  selectedAgent1: string;
  selectedAgent2: string;
  sub: Subscription;

  constructor(private router: Router, private route: ActivatedRoute, private location: Location,
              public agentsApiService: AgentsApiService, private processAgentDataService: ProcessAgentDataService,
              private messageService: MessageService) {}

  ngOnInit(): void {
    this.getAgents();
  }

  init() {
    this.setParams();
    this.setAgentsFromParams();
  }

  /**
   * Checks whethen the passed params are accepted and
   * sets the respective agent.
   */
  setAgentsFromParams(): void {
    for (const [key, value] of Object.entries(this.params)) {
      if (key === this.possibleParams[0]) {
        this.setSelectedAgent(0, value);
      } else if (key === this.possibleParams[1]) {
        this.setSelectedAgent(1, value);
      }
    }
    this.setSelectFromParams();
    this.checkIfSameAgent();
    this.setGroupData();
  }

  /**
   * Fetches agents to display select options and assign agents to compare.
   * Needs refactor: this might be too expensive if the data set is large.
   * Optimisation: fetching names only to display as select options
   *    (assuming names are unique), and fetching only the two agents
   *    needed for comparison.
   */
  getAgents(): void {
    this.agentsApiService.listAgents().then(data => {
      this.agents = data;
      this.init();
      this.dataLoaded = true;
    }).catch((error) => {
      this.dataError = true;
      this.messageService.openSnackBar('Couldn\'t fetch agents. Please try again.', 'Retry');
    });
  }

  /**
   * Subscribes to ActivatedRoute to set the params passed via route.
   */
  setParams(): void {
    this.sub = this.route.queryParams.subscribe(params => {
      this.params = params;
    });
  }

  /**
   * Gets agent by name by filtering through agents (assumes names are unique).
   */
  getAgentByName(value: string): Agent {
    return this.agents.filter(agent => agent.name.toLocaleLowerCase() === value.toLocaleLowerCase())[0];
  }

  /**
   * Sets selected agents names to display in select component.
   */
  setSelectFromParams() {
    this.selectedAgent1 = this.agentsToCompare[0] ? this.agentsToCompare[0].name.toLocaleLowerCase() : '';
    this.selectedAgent2 = this.agentsToCompare[1] ? this.agentsToCompare[1].name.toLocaleLowerCase() : '';
  }

  /**
   * Sets respective agent by number (either 0 or 1). If agent not found
   * displays a message to inform the user.
   * This displays a snackbar message instead of an error, because it means
   * the user passed an incorect name in the URL, and to maintain the mental
   * model around failing API calls/not finding data.
   */
  setSelectedAgent(i: number, name: string) {
    const agent = this.getAgentByName(name);
    if (agent) {
      this.agentsToCompare[i] = agent;
    } else {
      this.messageService.openSnackBar(`Couldn\'t find agent ${i + 1}. Please try another one.`);
    }
  }

  /**
   * Method fired when the user selects a value. This checks which select
   * component was changed by id, and updates the data accordingly.
   */
  change(event): void {
    this.sameAgent = false;
    const id = event.source.id;
    if (id === 'agent-1') {
      this.setSelectedAgent(0, event.value);
      this.updateRoute(1);
      this.checkIfSameAgent();
      this.setGroupData();
    } else if (id === 'agent-2') {
      this.setSelectedAgent(1, event.value);
      this.updateRoute(2);
      this.checkIfSameAgent();
      this.setGroupData();
    }
  }

  /**
   * Checks that the user didn't select the same agents to compare.
   * The flag is used to display an error message.
   */
  checkIfSameAgent(): void {
    if (this.agentsToCompare.length === this.MAX_AGENTS && this.agentsToCompare[0] === this.agentsToCompare[1]) {
      this.sameAgent = true;
    }
  }

  /**
   * Updates route params (agent1 or agent2) by checking which
   * agent changed.
   */
  updateRoute(agentNo: number): void {
    if (agentNo === 1) {
      this.router.navigate([], {
        queryParams: {
          agent1: this.agentsToCompare[0].name
        },
        queryParamsHandling: 'merge'
      });
    }

    if (agentNo === 2) {
      this.router.navigate([], {
        queryParams: {
          agent2: this.agentsToCompare[1].name
        },
        queryParamsHandling: 'merge'
      });
    }
  }

  /**
   * Generated required data to be passed for generating the bar chart.
   */
  setGroupData() {
    this.chartData = {};
    if (this.agentsToCompare.length === this.MAX_AGENTS) {
      for (let i = 0; i < this.MAX_AGENTS; i++) {
        // This needs to pass categories in as well, to be used as labels on the x-axis.
        this.chartData[this.agentsToCompare[i].name] = this.processAgentDataService.getAverages(this.agentsToCompare[i]);
      }
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
