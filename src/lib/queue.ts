import { delay } from "./utils";

export interface QueueConfig {
  waitTimePerMessage: number;
}

export class Queue<T> {

  private config: QueueConfig = {
    waitTimePerMessage: 1000
  }

  private messages: T[] = [];

  private initialized = false;

  constructor(config?: QueueConfig) {
    if (config) {
      this.config = config;
    }
  }

  init() {
    this.initialized = true;
  }

  post(message: T) {
    if (!this.initialized) {
      console.log("Queue is not initialized");
      return;
    }
    this.messages.unshift(message);
    console.log("Message posted to queue", JSON.stringify(message, null, 2));
  }

  private consume(): T {
    const removedMessage = this.messages.pop();
    if (!removedMessage) {
      throw new Error('Invalid message to the queue');
    }
    return removedMessage;
  }

  async subscribe(callbackFn: (arg: T) => any) {
    if (!this.initialized) {
      console.log("Queue is not initialized");
      return;
    }
    while (true) {
      await delay(this.config.waitTimePerMessage);
      if (this.messages.length) {
        console.log("Processing message");
        const message = this.consume();
        await callbackFn(message);
        console.log("Message processed successfully");
      }
    }
  }
}
