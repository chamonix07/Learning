import { Body, Controller, Post } from '@nestjs/common';
import { AgentService } from './agent.service';

interface QueryDto {
  message: string;
}

@Controller('agent')
export class AgentController {
  constructor(private readonly agentService: AgentService) {}

  /**
   * POST /agent/query
   * Entry point for the multi-step AI pipeline.
   */
  @Post('query')
  async query(@Body() body: QueryDto) {
    const result = await this.agentService.runPipeline(body.message);
    return result;
  }
}
