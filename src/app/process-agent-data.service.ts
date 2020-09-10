import { Injectable } from '@angular/core';
import { Agent, Task } from './agents-api.service';

interface Averages {
  category: string;
  average: number[];
}

@Injectable({
  providedIn: 'root'
})
export class ProcessAgentDataService {
  constructor() { }

  /**
   * Returns an array with categories and averages per categories.
   */
  public getAveragesWithCategories(agent: Agent): Averages[] {
    if (!agent) {
      return [];
    }

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
   * Returns an object with categories and averages per categories.
   */
  public getAveragesWithCategoriesObj(agent: Agent): {} {
    if (!agent) {
      return {};
    }

    const averages = {};
    const categories: Set<Task['category']> = this.getCategories(agent);

    categories.forEach(category => {
      averages[category] = this.processAvg(agent, category);
    });

    return averages;
  }

  /**
   * Calculates and returns an array with averages for an agent.
   * Future iteration: calculate meedian and mode if needed.
   */
  public getAverages(agent: Agent): number[] {
    if (!agent) {
      return [];
    }

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
    if (!agent) {
      return new Set();
    }

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
    const n = (memorySum / memoryTasks.length).toString();
    return +Number.parseFloat(n).toFixed(3);
  }
}
