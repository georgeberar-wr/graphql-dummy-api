import { Field, ObjectType } from "@nestjs/graphql";

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
