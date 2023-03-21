import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import {
  CorrespondentBalanceResolver,
  CorrespondentBalanceV2Resolver,
} from "./graphql/balances/correspondent-balances.resolver";

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: async () => ({
        autoSchemaFile: true,
        playground: true,
        introspection: true,
      }),
    }),
  ],
  controllers: [],
  providers: [CorrespondentBalanceResolver, CorrespondentBalanceV2Resolver],
})
export class AppModule {}
