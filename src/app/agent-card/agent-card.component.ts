import { Component, OnInit, Input } from '@angular/core';
import { Agent } from '../agents-api.service';

@Component({
  selector: 'app-agent-card',
  templateUrl: './agent-card.component.html',
  styleUrls: ['./agent-card.component.scss']
})
export class AgentCardComponent implements OnInit {
  @Input() agent: Agent;

  constructor() { }

  ngOnInit(): void {}
}
