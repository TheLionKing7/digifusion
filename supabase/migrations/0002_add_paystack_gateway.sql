-- Add Paystack as a supported payment gateway

alter table orders drop constraint if exists orders_gateway_check;
alter table orders add constraint orders_gateway_check
  check (gateway in ('stripe', 'flutterwave', 'opay', 'paystack', 'manual'));

alter table webhook_events drop constraint if exists webhook_events_gateway_check;
alter table webhook_events add constraint webhook_events_gateway_check
  check (gateway in ('stripe', 'flutterwave', 'opay', 'paystack'));
