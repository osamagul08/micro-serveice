import { Publisher, Subjects, TicketUpdatedEvent } from "@usamagul/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
