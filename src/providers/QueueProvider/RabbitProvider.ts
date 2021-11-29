import { Channel, connect, Connection, Options } from 'amqplib';

import { logger } from '../../helpers/logger';
import { IQueueProvider } from './IQueueProvider';

function publish(
  channel: Channel,
  exchange: string,
  routingKey: string,
  data: Buffer,
  options: Options.Publish,
) {
  return new Promise<void>((resolve) => {
    if (!channel.publish(exchange, routingKey, data, options)) {
      channel.once('drain', resolve);
    } else {
      resolve();
    }
  });
}

export interface IRabbitConfig {
  url: string;
  exchange: string;
  routingKey: string;
  queue: string;
}

class RabbitProvider implements IQueueProvider {
  private url: string;
  private exchange: string;
  private routingKey: string;
  private connection: Connection | undefined;
  private channel: Channel | undefined;

  constructor(rabbitConfig: IRabbitConfig) {
    const { url, exchange, routingKey } = rabbitConfig;

    this.url = url;
    this.exchange = exchange;
    this.routingKey = routingKey;
  }

  async _getConnection() {
    this.connection = this.connection || (await this.connect());
    return this.connection;
  }

  async connect() {
    const connection = await connect(`${this.url}?heartbeat=60`);
    logger.info('[AMQP] connected');
    return connection;
  }

  async _getChannel() {
    if (!this.channel) {
      const connection = await this._getConnection();
      this.channel = await connection.createChannel();
    }

    return this.channel;
  }

  async _closeChannel() {
    if (this.channel) {
      const { channel } = this;
      this.channel = undefined;
      await channel.close();
    }
  }

  async closeConnection() {
    await this._closeChannel();

    if (this.connection) {
      const { connection } = this;
      this.connection = undefined;
      await connection.close();
    }
  }

  async publish(data: unknown): Promise<void> {
    const channel = await this._getChannel();

    await publish(
      channel,
      this.exchange,
      this.routingKey,
      Buffer.from(JSON.stringify(data)),
      {
        persistent: true,
        contentType: 'application/json',
      },
    );

    this.closeConnection();
  }
}

export { RabbitProvider };
