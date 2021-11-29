interface IQueueProvider {
  publish(data: unknown): Promise<void>;
}

export { IQueueProvider };
