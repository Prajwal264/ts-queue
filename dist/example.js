"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const utils_1 = require("./lib/utils");
const messageHandler = (message) => {
    console.log('message: ', message);
};
index_1.queue.init();
index_1.queue.post({ message: 'first' });
index_1.queue.post({ message: 'second' });
index_1.queue.post({ message: 'third' });
index_1.queue.subscribe(messageHandler);
(0, utils_1.delay)(1000).then(() => {
    index_1.queue.post({ message: 'fourth, posted after subscription' });
});
//# sourceMappingURL=example.js.map