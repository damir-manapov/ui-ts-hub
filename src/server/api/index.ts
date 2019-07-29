import { Router } from 'express';
import { AgentClient } from '../../lib/server/clients/agent-client';
import { BaseServerRepository } from '../../lib/server/types/base-repository';
import { bindRepositoryHandlers } from './utils';
import { getAgentClientMethodRoute } from '../../lib/shared/utils';
import { EAgentClientRoutes } from '../../lib/shared/types';

const api = Router();
const agentClient = new AgentClient();

/**
 * Search tickets. Осуществляет поиск билетов.
 */
api.get(
  getAgentClientMethodRoute(EAgentClientRoutes.SearchTickets),
  async (req, res) => {
    res.json(await agentClient.searchTickets(req.query));
  },
);

/**
 * Buy ticket. Осуществляет покупку билета.
 */
// api.post(
//   getAgentClientMethodRoute(EAgentClientRoutes.BuyTicket),
//   async (req, res) => {
//     res.json(await agentClient.buyTicket);
//   },
// );

/**
 * Реализуем обработку запросов для всех репозиториев, имеющихся в серверном
 * клиенте для агентов.
 */
Object.values(agentClient).forEach(field => {
  if (field instanceof BaseServerRepository) {
    bindRepositoryHandlers(field, api);
  }
});

export { api };
