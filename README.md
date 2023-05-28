# TS-queue

## Overview
The Queue library provides a simple and efficient way to manage a queue of messages in your Node.js applications. It allows you to post messages to the queue and subscribe to process those messages asynchronously.

## Usage
First, import the Queue class from the library:

```typescript
import { Queue } from 'my-queue-library';
```

Create an instance of the Queue class:

```typescript
const queue = new Queue();
```

### Initialization
Before using the queue, it needs to be initialized using the init method:

```typescript
queue.init();
```

### Posting Messages
To post a message to the queue, use the post method:

```typescript
const message = 'Hello, Queue!';
queue.post(message);
```

### Subscribing to Messages
To subscribe to the queue and start processing messages, use the subscribe method:

```typescript
async function handleMessage(message) {
  // Process the message
  console.log('Received message:', message);
}

queue.subscribe(handleMessage);
```

The subscribe method takes a callback function that will be called for each message in the queue. Inside the callback function, you can perform any necessary processing on the message.

### Custom Configuration
You can customize the behavior of the queue by passing a QueueConfig object to the constructor:

```typescript
const config: QueueConfig = {
  waitTimePerMessage: 500 // Custom wait time in milliseconds
};

const queue = new Queue(config);
```

## Contributing
Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request on the GitHub repository.

## License
This project is licensed under the MIT License. See the LICENSE file for more information.

## Acknowledgements
The Queue library was inspired by the need for a simple and efficient message queuing system in Node.js applications. 

## Contact
If you have any questions or need assistance, feel free to reach out to the maintainers of this project:

Prajwal P (prajwal.praveen1997@gmail.com)

## Happy coding!
