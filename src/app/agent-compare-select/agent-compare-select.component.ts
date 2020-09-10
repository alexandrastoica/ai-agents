import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Agent } from '../agents-api.service';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-agent-compare-select',
  templateUrl: './agent-compare-select.component.html',
  styleUrls: ['./agent-compare-select.component.scss']
})
export class AgentCompareSelectComponent implements OnInit {
  @Input() agentId: number;
  @Input() agents: Agent[];
  @Input() compareAgent: Agent;
  @Input() duplicatedAgents: boolean;
  @Output() notify: EventEmitter<MatSelectChange> = new EventEmitter<MatSelectChange>();

  constructor() { }

  ngOnInit(): void {
  }

  selectionChanged(event: MatSelectChange): void {
    this.notify.emit(event);
  }

}
