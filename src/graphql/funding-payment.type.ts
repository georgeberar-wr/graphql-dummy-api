import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType("fundingpayments")
export class FundingPayment {
  @Field()
  id: string;

  @Field()
  version: Number;

  @Field()
  correspondent_id: string;

  @Field()
  tracker_payment_id: string;

  @Field()
  status: string;

  @Field()
  trade_currency_code: string;

  @Field()
  trade_date: Date;

  @Field()
  planned_settlement_amount: Number;

  @Field()
  planned_settlement_amount_usd: Number;

  @Field()
  expected_settlement_date: Date;

  @Field()
  actual_settlement_amount: Number;

  @Field()
  actual_settlement_amount_usd: Number;

  @Field()
  actual_settlement_date: Date;
}
