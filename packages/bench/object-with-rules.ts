import * as z4 from "zod/v4";
import * as z3 from "zod3";
import { metabench } from "./metabench.js";
import * as v from "valibot";
import { object, string, boolean, number } from "valleys";

const z3Schema = z3.object({
  string: z3.string().min(0).max(100),
  boolean: z3.boolean(),
  number: z3.number().min(0).max(100),
});

const z4Schema = z4.object({
  string: z4.string().min(0).max(100),
  boolean: z4.boolean(),
  number: z4.number().min(0).max(100),
});

const valibotSchema = v.object({
  string: v.pipe(v.string(), v.minLength(0), v.maxLength(100)),
  boolean: v.boolean(),
  number: v.pipe(v.number(), v.minSize(0), v.maxSize(100)),
});

const valleysSchema = object({
  string: string({ minLength: 0, maxLength: 100 }),
  boolean: boolean(),
  number: number({ min: 0, max: 100 }),
});

const DATA = Array.from({ length: 10_000 }, () =>
  Object.freeze({
    number: Math.random(),
    string: `${Math.random()}`,
    boolean: Math.random() > 0.5,
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
