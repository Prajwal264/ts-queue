import { queue } from "./index";
import { delay } from "./lib/utils";

const messageHandler = async (message: Object) => {
  console.log('message: ', message);
}

// initialize
queue.init();

// push message to a queue
queue.post({ message: 'first' });
queue.post({ message: 'second' });
queue.post({ message: 'third' });

queue.subscribe(messageHandler);

delay(1000).then(() => {
  queue.post({ message: 'fourth, posted after subscription' });
})
