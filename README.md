Here’s a `README.md` file that describes each part of the project (Basic Pub-Sub, Redis Message Broker, and RabbitMQ Queues). This README will guide users on how to set up and run each part of the event-driven architecture examples.

---

# Event-Driven Architecture Demo

This repository demonstrates building an event-driven architecture from the ground up, progressing through three stages:

1. **Basic Pub-Sub (In-Memory)**
2. **Redis Message Broker**
3. **RabbitMQ Queues**

Each part illustrates different aspects of event-driven messaging, scaling considerations, and use cases for real-time data processing.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Getting Started](#getting-started)
- [Setup Instructions](#setup-instructions)
  - [Basic Pub-Sub](#1-basic-pub-sub)
  - [Redis Message Broker](#2-redis-message-broker)
  - [RabbitMQ Queues](#3-rabbitmq-queues)
- [Examples](#examples)
- [Architecture Comparison](#architecture-comparison)
- [License](#license)

---

## Project Overview

This repository showcases a progression of three event-driven architectures to demonstrate different levels of scalability, reliability, and durability. Each part builds upon the previous, showcasing how to handle real-time events within a microservices-oriented system.

### Key Concepts

- **Event-Driven Communication**: Services communicate by producing and consuming events.
- **Scalability**: Each part introduces greater scalability capabilities, supporting distributed and fault-tolerant messaging.
- **Message Durability**: Reliability is gradually enhanced, with RabbitMQ providing the highest durability and delivery guarantees.

---

## Getting Started

To set up the project, ensure you have **Node.js**, **Docker**, and **Docker Compose** installed.

Clone the repository and install the necessary dependencies:

```bash
git clone <repository-url>
cd event-driven-architecture-demo
npm install
```

The project is divided into three parts, each with its own setup instructions.

---

## Setup Instructions

### 1. Basic Pub-Sub

The Basic Pub-Sub pattern is an in-memory model, using a custom `EventEmitter` class for a single-instance setup.

1. **Run the Server**:
   ```bash
   node basic-pubsub/index.js
   ```

2. **Endpoints**:
   - `GET /review/post?rating=<rating>`: Publishes a "review-posted" event.
   - `GET /review/reply?id=<id>&reply=<reply>`: Publishes a "review-reply" event.

3. **Description**:
   - This model is limited to a single instance and does not support distributed processing or message durability.

---

### 2. Redis Message Broker

The Redis Message Broker introduces distributed messaging, enabling multiple instances of consumers to listen to the same events.

1. **Start Redis**:
   Use Docker Compose to run Redis and RedisInsight for monitoring.

   ```bash
   docker-compose up -d redis redisinsight
   ```

2. **Run the Redis Pub-Sub Server**:
   ```bash
   node redis-pubsub/index.js
   ```

3. **Endpoints**:
   - `GET /review/post?rating=<rating>`: Publishes a "review-posted" event to Redis.
   - `GET /review/reply?id=<id>&reply=<reply>`: Publishes a "review-reply" event to Redis.

4. **Description**:
   - Redis distributes events across multiple consumer instances, allowing for scalability.
   - However, it does not guarantee message durability, meaning messages can be lost if a consumer is offline.

---

### 3. RabbitMQ Queues

The RabbitMQ Queues implementation uses a queue-based model to ensure each message is processed exactly once by a single consumer.

1. **Start RabbitMQ**:
   Use Docker Compose to run RabbitMQ and its management interface.

   ```bash
   docker-compose up -d rabbitmq
   ```

2. **Run the RabbitMQ Queue Server**:
   ```bash
   node rabbitmq-queue/index.js
   ```

3. **Endpoints**:
   - `GET /review/post?rating=<rating>`: Publishes a "review-posted" message to RabbitMQ.
   - `GET /review/reply?id=<id>&reply=<reply>`: Publishes a "review-reply" message to RabbitMQ.

4. **Description**:
   - RabbitMQ ensures message durability and provides load balancing by distributing messages across multiple consumers.
   - This is ideal for critical workflows where reliable message processing is necessary.

---

## Examples

You can test each setup by making requests to the relevant endpoints using tools like **curl** or **Postman**.

### Example Requests

```bash
# Publish a review-posted event
curl "http://localhost:5050/review/post?rating=5"

# Publish a review-reply event
curl "http://localhost:5050/review/reply?id=123&reply=Thank you!"
```

### Expected Output

- **Basic Pub-Sub**: Only works within a single instance; each event is logged to the console immediately.
- **Redis Pub-Sub**: Events are broadcast to all instances connected to Redis, so each consumer processes every event.
- **RabbitMQ Queues**: Each event is processed once by a single consumer, ensuring reliable, balanced processing.

---

## Architecture Comparison

| Feature               | Basic Pub-Sub       | Redis Message Broker              | RabbitMQ Queues                 |
|-----------------------|---------------------|-----------------------------------|---------------------------------|
| **Message Durability**| None                | No                                | Yes                             |
| **Scaling**           | Single Instance     | Distributed, Multiple Instances   | Load-Balanced, Multiple Instances |
| **Use Case**          | Simple Applications | Real-Time Notifications           | Critical, Reliable Workflows    |
| **Backpressure Handling** | None            | None                              | Yes (using queues)              |

---

## License

This project is licensed under the MIT License.

---

This README provides an overview, setup instructions, and a clear comparison for each part, guiding users through the different stages of building and scaling an event-driven architecture.
