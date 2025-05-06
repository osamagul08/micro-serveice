export enum OrderStatus {
  Created = "created", //order has been created but not yet paid for
  AwaitingPayment = "awaiting:payment", //order has been created and is awaiting payment
  Complete = "complete", //order has been paid for and is complete
  //the order has been cancelled by the user or the system
  Cancelled = "cancelled", //the ticket the order is reserving has been cancelled
  Expired = "expired", //the order has expired and is no longer valid
}
