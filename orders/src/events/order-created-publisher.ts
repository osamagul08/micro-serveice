import { Publisher, OrderCreatedEvent, Subjects } from "@usamagul/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
