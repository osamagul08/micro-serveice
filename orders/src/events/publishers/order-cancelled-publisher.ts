import { Subjects, OrderCancelledEvent, Publisher } from "@usamagul/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
