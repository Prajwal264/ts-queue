"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queue = void 0;
const utils_1 = require("./utils");
class Queue {
    constructor(config) {
        this.config = {
            waitTimePerMessage: 1000
        };
        this.messages = [];
        this.initialized = false;
        if (config) {
            this.config = config;
        }
    }
    init() {
        this.initialized = true;
    }
    post(message) {
        if (!this.initialized) {
            console.log("Queue is not initialized");
            return;
        }
        this.messages.unshift(message);
        console.log("Message posted to queue", JSON.stringify(message, null, 2));
    }
    consume() {
        const removedMessage = this.messages.pop();
        if (!removedMessage) {
            throw new Error('Invalid message to the queue');
        }
        return removedMessage;
    }
    async subscribe(callbackFn) {
        if (!this.initialized) {
            console.log("Queue is not initialized");
            return;
        }
        while (true) {
            await (0, utils_1.delay)(this.config.waitTimePerMessage);
            if (this.messages.length) {
                console.log("Processing message");
                const message = this.consume();
                await callbackFn(message);
                console.log("Message processed successfully");
            }
        }
    }
}
exports.Queue = Queue;
//# sourceMappingURL=queue.js.map