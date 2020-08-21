import { Injectable } from '@angular/core';

// == Fake API Data ==
type AgentId = number;

export interface Agent {
  readonly id: AgentId;
  readonly name: string;
  readonly description: string;
  readonly tasks: Task[];
}

interface Task {
  readonly id: string;
  readonly name: string;
  readonly category: 'memory'|'planning'|'logic';
  readonly score: number;
}

// == Helper utilities ==
export class AgentsAPI {
  currentId = 1;
  MIN_LATENCY_MS = 100;
  MAX_LATENCY_MS = 3000;
  FAILURE_RATE = 0.05; /* 5% API calls fail */

  constructor() {}

  /** Returns a new unique ID at every invocation. */
  public nextId(): number {
    return this.currentId++;
  }

  /** Returns a random number between min and max. */
  private randomBetween(min: number, max: number): number {
    const rand = Math.random();
    const span = max - min;
    return rand * span + min;
  }

  /** Returns true a random percentage of invocations. */
  private randomCondition(percentageTrue: number): boolean {
    const rand = Math.random();
    return rand < percentageTrue;
  }

  /**
   * Returns the data as a Promise, delayed by a random latency and
   * occasionally failing with an error.
   */
  public asFallibleAsyncResponse<T>(data: T): Promise<T> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this.randomCondition(this.FAILURE_RATE)) {
          reject(new Error('API Error - database unavailable.'));
        } else {
          resolve(data);
        }
      }, this.randomBetween(this.MIN_LATENCY_MS, this.MAX_LATENCY_MS));
    });
    return Promise.resolve(data);
  }
}

// == Fake API Service ==
// API service to use to complete the project.
@Injectable({
  providedIn: 'root'
})
export class AgentsApiService {
  agents: ReadonlyArray<Agent> = [];

  constructor(public agentsAPI: AgentsAPI) {
    /** Fake list of agents. */
    this.agents = [{
      id: this.agentsAPI.nextId(),
      name: 'IMPALA',
      description: 'Scalable Distributed Deep-RL with Importance Weighted Actor-Learner Architectures',
      tasks: [
        {
          id: 'mem_1',
          name: 'Blackjack',
          category: 'memory',
          score: 56,
        },
        {
          id: 'mem_2',
          name: 'Q-bert',
          category: 'memory',
          score: 61,
        },
        {
          id: 'logic_1',
          name: 'Breakout',
          category: 'logic',
          score: 79,
        },
        {
          id: 'logic_2',
          name: 'Tetris',
          category: 'logic',
          score: 21,
        },
        {
          id: 'logic_3',
          name: 'Basic Math',
          category: 'logic',
          score: 54,
        },
        {
          id: 'planning_1',
          name: 'Pacman',
          category: 'planning',
          score: 58,
        },
      ],
    },
    {
      id:  this.agentsAPI.nextId(),
      name: 'AlphaZero',
      description: 'Generalisation of AlphaGo Zero that can achieve, tabula rasa, superhuman performance in many challenging domains such as Chess, Shogi and Go.',
      tasks: [
        {
          id: 'mem_1',
          name: 'Blackjack',
          category: 'memory',
          score: 37,
        },
        {
          id: 'mem_2',
          name: 'Q-bert',
          category: 'memory',
          score: 29,
        },
        {
          id: 'logic_1',
          name: 'Breakout',
          category: 'logic',
          score: 78,
        },
        {
          id: 'logic_2',
          name: 'Tetris',
          category: 'logic',
          score: 92
        },
        {
        id: 'logic_3',
        name: 'Basic Math',
        category: 'logic',
        score: 88,
        },
        {
        id: 'planning_1',
        name: 'Pacman',
        category: 'planning',
        score: 100,
        },
      ],
    },
    {
        id:  this.agentsAPI.nextId(),
        name: 'R2D3',
        description: 'Making Efficient Use of Demonstrations to Solve Hard Exploration Problems.',
        tasks: [
        {
          id: 'mem_1',
          name: 'Blackjack',
          category: 'memory',
          score: 85,
        },
        {
          id: 'mem_2',
          name: 'Q-bert',
          category: 'memory',
          score: 73,
        },
        {
          id: 'logic_1',
          name: 'Breakout',
          category: 'logic',
          score: 28,
        },
        {
          id: 'logic_2',
          name: 'Tetris',
          category: 'logic',
          score: 26,
        },
        {
          id: 'logic_3',
          name: 'Basic Math',
          category: 'logic',
          score: 44,
        },
        {
          id: 'planning_1',
          name: 'Pacman',
          category: 'planning',
          score: 72,
        },
      ],
    }];
  }

  public listAgents(): Promise<ReadonlyArray<Agent>> {
    return this.agentsAPI.asFallibleAsyncResponse(this.agents);
  }


  public searchAgents(nameSubstr: string): Promise<ReadonlyArray<Agent>> {
    return this.agentsAPI.asFallibleAsyncResponse(
        this.agents.filter(agent => agent.name.includes(nameSubstr)));
  }


  public getAgent(id: AgentId): Promise<Agent|undefined> {
    return this.agentsAPI.asFallibleAsyncResponse(this.agents.find(agent => agent.id === id));
  }
}




