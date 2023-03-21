import { Args, Query, Resolver } from "@nestjs/graphql";
import { uuid } from "uuidv4";
import { Pagination } from "../common/common.type";
import {
  CorrespondentBalance,
  PaginatedCorrespondentBalance,
  Sorting,
  SortingDirection,
} from "./correspondent-balance.type";

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
    pagination: Pagination,
    @Args("sort", {
      type: () => Sorting,
      nullable: true,
      defaultValue: {
        direction: SortingDirection.ASC,
      },
    })
    sort: Sorting
  ): Promise<PaginatedCorrespondentBalance> {
    const balances: CorrespondentBalance[] = [];

    for (let i = pagination.page; i < pagination.page + pagination.limit; i++) {
      balances.push(BALANCES[i]);
    }

    balances.sort((a, b) =>
      a.correspondent.name.localeCompare(b.correspondent.name)
    );

    if (sort.direction === SortingDirection.DESC) {
      balances.reverse();
    }

    const response: PaginatedCorrespondentBalance = {
      balances: balances,
      metadata: {
        total_items: BALANCES.length,
        total_pages: BALANCES.length / pagination.limit,
        next_page:
          pagination.page + 1 > BALANCES.length ? 0 : pagination.page + 1,
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
