import { logger } from '../../helpers/logger';
import { IQueueProvider } from './IQueueProvider';

class RabbitFakeProvider implements IQueueProvider {
  async publish(data: unknown): Promise<void> {
    logger.info(JSON.stringify(data));
  }
}

export { RabbitFakeProvider };
