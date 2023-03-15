import { Args, Query, Resolver } from "@nestjs/graphql";
import { FundingPayment } from "./funding-payment.type";
import { uuid } from "uuidv4";

@Resolver(() => FundingPayment)
export class FundingPaymentResolver {
  constructor() {}

  @Query(() => [FundingPayment], {
    name: "fundingpayments",
  })
  async getFundingPayments(
    @Args("count", {
      type: () => Number,
      description: "The number of items to generate and return.",
      nullable: false,
    })
    count: Number
  ): Promise<FundingPayment[]> {
    const payments: FundingPayment[] = [];

    for (let i = 0; i < count; i++) {
      payments.push({
        id: uuid(),
        version: this.getRandomNumber(5),
        correspondent_id: uuid(),
        tracker_payment_id: uuid(),
        status: this.getRandomStatus(),
        trade_currency_code: this.getRandomCurrencyCode(),
        trade_date: new Date(),
        planned_settlement_amount: this.getRandomNumber(1000),
        planned_settlement_amount_usd: this.getRandomNumber(1000),
        expected_settlement_date: new Date(),
        actual_settlement_amount: this.getRandomNumber(1000),
        actual_settlement_amount_usd: this.getRandomNumber(1000),
        actual_settlement_date: new Date(),
      });
    }

    return Promise.resolve(payments);
  }

  getRandomNumber(max) {
    return Math.floor(Math.random() * max);
  }

  getRandomStatus(): string {
    const r = this.getRandomNumber(2);
    return r == 0 ? "IN_TRANSIT" : "SETTLED";
  }

  getRandomCurrencyCode(): string {
    const r = this.getRandomNumber(2);
    return r == 0 ? "EUR" : "USD";
  }
}
