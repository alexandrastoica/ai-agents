import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AgentCardComponent } from './agent-card/agent-card.component';
import { AgentCompareChartComponent } from './agent-compare-chart/agent-compare-chart.component';
import { AgentCompareComponent } from './agent-compare/agent-compare.component';
import { AgentCompareSelectComponent } from './agent-compare-select/agent-compare-select.component';
import { AgentDetailComponent } from './agent-detail/agent-detail.component';
import { AgentHomeComponent } from './agent-home/agent-home.component';
import { AgentsAPI, AgentsApiService } from './agents-api.service';
import { MessageService } from './message.service';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Using this to perform search.
import { Ng2SearchPipeModule } from 'ng2-search-filter';

// Using this to generate charts.
import { ZingchartAngularModule } from 'zingchart-angular';

// Using Angular Material components.
import { AngularMaterialModule } from './angular-material.module';


@NgModule({
  declarations: [
    AgentCardComponent,
    AgentCompareChartComponent,
    AgentCompareComponent,
    AgentCompareSelectComponent,
    AgentDetailComponent,
    AgentHomeComponent,
    AppComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    AngularMaterialModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    Ng2SearchPipeModule,
    ZingchartAngularModule,
  ],
  providers: [AgentsAPI, AgentsApiService, MessageService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
