import { InputType, Field, Int, ObjectType } from "@nestjs/graphql";
import { IsOptional, Max, Min } from "class-validator";

@InputType()
export class Pagination {
  @Field(() => Int, {
    defaultValue: 0,
    nullable: true,
    description:
      "The index of the first page to return. Default: 0 (the first item). Use with limit to get the next set of items.",
  })
  @IsOptional()
  @Min(0)
  page: number;

  @Field(() => Int, {
    defaultValue: 10,
    nullable: true,
    description:
      "The maximum number of items to return. Default: 10. Minimum: 1. Maximum: 25.",
  })
  @IsOptional()
  @Min(1)
  @Max(25)
  limit: number;
}
