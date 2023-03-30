import { Controller, Get } from "@nestjs/common";

@Controller("/")
export class HelloController {
  @Get()
  sayHello(): string {
    return "Hi there!";
  }
}
