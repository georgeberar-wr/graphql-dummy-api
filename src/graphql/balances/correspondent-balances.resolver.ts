import { Args, Query, Resolver } from "@nestjs/graphql";
import { uuid } from "uuidv4";
import { Pagination } from "../common/common.type";
import { CorrespondentBalance } from "./correspondent-balance.type";

import { uniqueNamesGenerator, names } from "unique-names-generator";

const BALANCES: CorrespondentBalance[] = [];

function getRandomNumber(max) {
  return Math.floor(Math.random() * max);
}

function getRandomCurrencyCode(): string {
  const r = getRandomNumber(2);
  return r == 0 ? "EUR" : "USD";
}

function load() {
  for (let i = 0; i < 100; i++) {
    const currency = getRandomCurrencyCode();

    BALANCES.push({
      correspondent: {
        id: uuid(),
        name: uniqueNamesGenerator({
          style: "capital",
          dictionaries: [names],
        }),
      },
      pending: {
        amount: 10,
        currency: currency,
      },
      current: {
        amount: 100,
        currency: currency,
      },
    });
  }
}

load();

@Resolver(() => CorrespondentBalance)
export class CorrespondentBalanceResolver {
  constructor() {}

  @Query(() => [CorrespondentBalance], {
    name: "balances",
  })
  async getCorrespondentBalances(
    @Args("pagination", {
      type: () => Pagination,
      nullable: true,
      defaultValue: { offset: 0, limit: 25 },
    })
    pagination: Pagination
  ): Promise<CorrespondentBalance[]> {
    const response: CorrespondentBalance[] = [];

    for (
      let i = pagination.offset;
      i < pagination.offset + pagination.limit;
      i++
    ) {
      response.push(BALANCES[i]);
    }

    return Promise.resolve(response);
  }
}
