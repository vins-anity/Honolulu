import * as v from "valibot";
export declare const HelloWorldSchema: v.ObjectSchema<{
    readonly message: v.StringSchema<undefined>;
}, undefined>;
export type HelloWorld = v.InferOutput<typeof HelloWorldSchema>;
//# sourceMappingURL=index.d.ts.map