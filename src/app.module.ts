import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { HelloController } from "./rest/hello.controller";

@Module({
  imports: [
    // GraphQLModule.forRootAsync<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   useFactory: async () => ({
    //     autoSchemaFile: true,
    //     playground: true,
    //     introspection: true,
    //   }),
    // }),
  ],
  controllers: [HelloController],
  providers: [],
})
export class AppModule {}
