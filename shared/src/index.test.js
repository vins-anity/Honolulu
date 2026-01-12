import { describe, it, expect } from "vitest";
import { parse } from "valibot";
import { HelloWorldSchema } from "./index";
describe("Shared Schema", () => {
    it("validates hello world message", () => {
        const result = parse(HelloWorldSchema, { message: "Bun" });
        expect(result).toEqual({ message: "Bun" });
    });
});
