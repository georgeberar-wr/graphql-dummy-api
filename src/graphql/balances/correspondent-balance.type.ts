import { Field, InputType, ObjectType } from "@nestjs/graphql";

@ObjectType("Correspondent")
export class Correspondent {
  @Field()
  id: string;

  @Field()
  name: string;
}

@ObjectType("FinancialAmount")
class FinancialAmount {
  @Field()
  amount: number;

  @Field()
  currency: string;
}

@ObjectType("CorrespondentBalance")
export class CorrespondentBalance {
  @Field()
  correspondent: Correspondent;

  @Field()
  pending: FinancialAmount;

  @Field()
  current: FinancialAmount;
}

@ObjectType("Metadata")
class Metadata {
  @Field()
  total_items: number;

  @Field()
  total_pages: number;

  @Field()
  previous_page: number;

  @Field()
  next_page: number;
}

@ObjectType("PaginatedCorrespondentBalance")
export class PaginatedCorrespondentBalance {
  @Field((type) => [CorrespondentBalance])
  balances: CorrespondentBalance[];

  @Field()
  metadata: Metadata;
}

export enum SortingDirection {
  ASC = "asc",
  DESC = "desc",
}

@InputType()
export class Sorting {
  @Field()
  direction: SortingDirection;
}
