import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { FundingPaymentResolver } from "./graphql/funding-payment.resolver";

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
  providers: [FundingPaymentResolver],
})
export class AppModule {}
