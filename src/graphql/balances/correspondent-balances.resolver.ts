import { Args, Query, Resolver } from "@nestjs/graphql";
import { uuid } from "uuidv4";
import { Pagination } from "../common/common.type";
import {
  CorrespondentBalance,
  PaginatedCorrespondentBalance,
} from "./correspondent-balance.type";

import { uniqueNamesGenerator, names } from "unique-names-generator";

const BALANCES: CorrespondentBalance[] = [];
let TOTAL_PAGES;

function getRandomNumber(max) {
  return Math.floor(Math.random() * max);
}

function getRandomCurrencyCode(): string {
  const r = getRandomNumber(2);
  return r == 0 ? "EUR" : "USD";
}

function load() {
  for (let i = 0; i < 125; i++) {
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
        amount: getRandomNumber(1000),
        currency: currency,
      },
      current: {
        amount: getRandomNumber(1000),
        currency: currency,
      },
    });
  }

  TOTAL_PAGES = Math.floor(BALANCES.length / 25);
}

load();

@Resolver(() => PaginatedCorrespondentBalance)
export class CorrespondentBalanceResolver {
  constructor() {}

  @Query(() => PaginatedCorrespondentBalance, {
    name: "getCorrespondentBalances",
  })
  async getCorrespondentBalances(
    @Args("pagination", {
      type: () => Pagination,
      nullable: true,
      defaultValue: { page: 0, limit: 25 },
    })
    pagination: Pagination
  ): Promise<PaginatedCorrespondentBalance> {
    const balances: CorrespondentBalance[] = [];

    for (let i = pagination.page + 25; i < pagination.page + 50; i++) {
      balances.push(BALANCES[i]);
    }

    const response: PaginatedCorrespondentBalance = {
      balances: balances,
      metadata: {
        total_items: BALANCES.length,
        total_pages: TOTAL_PAGES,
        next_page: pagination.page + 1 > TOTAL_PAGES ? 0 : pagination.page + 1,
        previous_page: pagination.page - 1 < 0 ? 0 : pagination.page - 1,
      },
    };

    return Promise.resolve(response);
  }
}

@Resolver(() => PaginatedCorrespondentBalance)
export class CorrespondentBalanceV2Resolver {
  constructor() {}

  @Query(() => [CorrespondentBalance], {
    name: "correspondentBalances",
  })
  async getCorrespondentBalances(): Promise<CorrespondentBalance[]> {
    const balances: CorrespondentBalance[] = [];

    for (let i = 0; i < BALANCES.length; i++) {
      balances.push(BALANCES[i]);
    }

    return Promise.resolve(balances);
  }
}
