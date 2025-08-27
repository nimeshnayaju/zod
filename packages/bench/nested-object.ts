import * as z4 from "zod/v4";
import * as z3 from "zod3";
import { metabench } from "./metabench.js";
import * as v from "valibot";
import { object, string, number, or, constant } from "valleys";

const z3Schema = z3.object({
  nested: z3.object({
    role: z3.union([z3.literal("admin"), z3.literal("user")]),
    name: z3.string().min(0).max(100),
    age: z3.number().min(0).max(100),
  }),
});

const z4Schema = z4.object({
  nested: z4.object({
    role: z4.union([z4.literal("admin"), z4.literal("user")]),
    name: z4.string().min(0).max(100),
    age: z4.number().min(0).max(100),
  }),
});

const valibotSchema = v.object({
  nested: v.object({
    role: v.union([v.literal("admin"), v.literal("user")]),
    name: v.pipe(v.string(), v.minLength(0), v.maxLength(100)),
    age: v.pipe(v.number(), v.minSize(0), v.maxSize(100)),
  }),
});

const valleysSchema = object({
  nested: object({
    role: or([constant("admin"), constant("user")]),
    name: string({ minLength: 0, maxLength: 100 }),
    age: number({ min: 0, max: 100 }),
  }),
});

const DATA = Array.from({ length: 10_000 }, () =>
  Object.freeze({
    nested: {
      role: Math.random() > 0.5 ? "admin" : "user",
      name: `${Math.random()}`,
      age: Math.random(),
    },
  })
);

console.log(z3Schema.parse(DATA[0]));
console.log(z4Schema.parse(DATA[0]));
console.log(v.parse(valibotSchema, DATA[0]));
console.log(valleysSchema.unstable_validate(DATA[0]));

const bench = metabench("z.object().parse", {
  zod3() {
    for (const d of DATA) z3Schema.parse(d);
  },
  zod4() {
    for (const d of DATA) z4Schema.parse(d);
  },
  valibot() {
    for (const d of DATA) v.parse(valibotSchema, d);
  },
  valleys() {
    for (const d of DATA) valleysSchema.unstable_validate(d);
  },
});

await bench.run();
