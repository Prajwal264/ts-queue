import { delay } from "./utils";

export interface IQueueConfig {
  waitTimePerMessage: number;
}

export class Queue<T> {

  private config: IQueueConfig = {
    waitTimePerMessage: 1000
  }

  private messages: T[] = [];

  private initialized = false;

  constructor(config?: IQueueConfig) {
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

  async subscribe(callbackFn: (arg: T) => Promise<void>) {
    if (!this.initialized) {
      console.log("Queue is not initialized");
      return;
    }
    while (true) {
      await delay(this.config.waitTimePerMessage);
      if (this.messages.length) {
        console.log("Processing message");
        const message = this.consume();
        await callbackFn(message).catch(() => {
          // if any error occurs, lets push the message back to the queue, so that it can be processed again
          // TODO: if there is a runtime error, the message will keep retrying forever. We need to have a retry count for each message. 
          //       any message pushed to a dead-letter queue will be kept stagnant until processing is triggered
          this.messages.push(message);
        });
        console.log("Message processed successfully");
      }
    }
  }
}
