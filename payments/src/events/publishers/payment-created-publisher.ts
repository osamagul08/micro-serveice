import { Subjects, Publisher, PaymentCreatedEvent } from "@usamagul/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
