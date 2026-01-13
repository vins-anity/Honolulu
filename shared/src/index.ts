import * as v from "valibot";

export const HelloWorldSchema = v.object({
	message: v.string(),
});

export type HelloWorld = v.InferOutput<typeof HelloWorldSchema>;
