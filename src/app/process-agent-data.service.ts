import { Injectable } from '@angular/core';
import { Agent, Task } from './agents-api.service';

@Injectable({
  providedIn: 'root'
})
export class ProcessAgentDataService {
  categories: Set<Task['category']>;
  tasks: Task[];

  constructor() { }

  /**
   * Returns an array with categories and averages per categories.
   */
  public getAveragesWithCategories(agent: Agent) {
    const averages = [];
    const categories: Set<Task['category']> = this.getCategories(agent);

    categories.forEach(category => {
      averages.push({
        category,
        average: this.processAvg(agent, category)
      });
    });

    return averages;
  }


  /**
   * Calculates and returns an array with averages for an agent.
   */
  public getAverages(agent: Agent): number[] {
    const averages = [];
    const categories: Set<Task['category']> = this.getCategories(agent);

    categories.forEach(category => {
      averages.push(this.processAvg(agent, category));
    });

    return averages;
  }

  /**
   * Returns set with categories for an agent.
   * Using set to avoid duplicates.
   */
  public getCategories(agent: Agent): Set<Task['category']> {
    const categories = new Set<Task['category']>();
    agent.tasks.forEach(task => categories.add(task.category));
    return categories;
  }

  /**
   * Helper function to calculate averages.
   */
  private processAvg(agent: Agent, category: Task['category']): number {
    const memoryTasks = agent.tasks.filter(task => task.category === category);
    const memorySum = memoryTasks.map(task => task.score).reduce((acc, cur) => acc + cur);
    return (memorySum / memoryTasks.length);
  }
}
