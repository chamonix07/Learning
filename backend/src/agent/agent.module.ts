import { Module } from '@nestjs/common';
import { AgentController } from './agent.controller';
import { AgentService } from './agent.service';
import { VectorStoreService } from './vector-store.service';
import { IntentAgentService } from './intent-agent.service';
import { ResponseAgentService } from './response-agent.service';

@Module({
  controllers: [AgentController],
  providers: [
    AgentService,
    VectorStoreService,
    IntentAgentService,
    ResponseAgentService,
  ],
})
export class AgentModule {}
