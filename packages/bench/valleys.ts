import { makeData, randomString } from "./benchUtil.js";
import { metabench } from "./metabench.js";
import * as valleys from "valleys";
import * as z from "zod/v4";
import * as v from "valibot";

// Basic validators
const stringData = makeData(10000, () => `${Math.random()}`);
const numberData = makeData(10000, () => Math.random());
const booleanData = makeData(10000, () => Math.random() > 0.5);

// Object validation
const objectData = makeData(1000, () => ({
  id: Math.floor(Math.random() * 100),
  name: randomString(10),
  email: `${randomString(8)}@example.com`,
  active: Math.random() > 0.5,
  age: Math.floor(Math.random() * 100),
}));

// Array validation
const arrayData = makeData(1000, () => 
  Array.from({ length: 10 }, () => randomString(5))
);

// Union validation
const unionData = makeData(1000, () => 
  Math.random() > 0.5 ? "pending" : "completed"
);

// ISO8601 datetime validation
const datetimeData = makeData(1000, () => new Date().toISOString());

// Schemas
const zodObjectSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  active: z.boolean(),
  age: z.number().min(0).max(120),
});

const valibotObjectSchema = v.object({
  id: v.number(),
  name: v.string(),
  email: v.string(),
  active: v.boolean(),
  age: v.number(),
});

const valleysObjectSchema = valleys.object({
  id: valleys.number({ min: 0, max: 120 }),
  name: valleys.string({ minLength: 1, maxLength: 50 }),
  email: valleys.string({ minLength: 5, maxLength: 100 }),
  active: valleys.boolean(),
  age: valleys.number({ min: 0, max: 120 }),
});

const zodArraySchema = z.array(z.string());
const valibotArraySchema = v.array(v.string());
const valleysArraySchema = valleys.array(valleys.string());

const zodUnionSchema = z.union([z.literal("pending"), z.literal("completed")]);
const valibotUnionSchema = v.union([v.literal("pending"), v.literal("completed")]);
const valleysUnionSchema = valleys.or([valleys.constant("pending"), valleys.constant("completed")]);

const zodDatetimeSchema = z.string().datetime();
const valibotDatetimeSchema = v.string();
const valleysDatetimeSchema = valleys.iso8601();

// Basic validators benchmark
console.log("=== Basic Validators ===");
const basicBench = metabench("Basic validators", {
  "zod-string"() {
    for (const _ of stringData) z.string().parse(_);
  },
  "valleys-string"() {
    for (const _ of stringData) valleys.validate(_, valleys.string());
  },
  "zod-number"() {
    for (const _ of numberData) z.number().parse(_);
  },
  "valleys-number"() {
    for (const _ of numberData) valleys.validate(_, valleys.number());
  },
  "zod-boolean"() {
    for (const _ of booleanData) z.boolean().parse(_);
  },
  "valleys-boolean"() {
    for (const _ of booleanData) valleys.validate(_, valleys.boolean());
  },
});

await basicBench.run();

// Object validation benchmark
console.log("\n=== Object Validation ===");
const objectBench = metabench("Object validation", {
  "zod-object"() {
    for (const _ of objectData) zodObjectSchema.parse(_);
  },
  "valibot-object"() {
    for (const _ of objectData) v.parse(valibotObjectSchema, _);
  },
  "valleys-object"() {
    for (const _ of objectData) valleys.validate(_, valleysObjectSchema);
  },
});

await objectBench.run();

// Array validation benchmark
console.log("\n=== Array Validation ===");
const arrayBench = metabench("Array validation", {
  "zod-array"() {
    for (const _ of arrayData) zodArraySchema.parse(_);
  },
  "valibot-array"() {
    for (const _ of arrayData) v.parse(valibotArraySchema, _);
  },
  "valleys-array"() {
    for (const _ of arrayData) valleys.validate(_, valleysArraySchema);
  },
});

await arrayBench.run();

// Union validation benchmark
console.log("\n=== Union Validation ===");
const unionBench = metabench("Union validation", {
  "zod-union"() {
    for (const _ of unionData) zodUnionSchema.parse(_);
  },
  "valibot-union"() {
    for (const _ of unionData) v.parse(valibotUnionSchema, _);
  },
  "valleys-union"() {
    for (const _ of unionData) valleys.validate(_, valleysUnionSchema);
  },
});

await unionBench.run();

// Datetime validation benchmark
console.log("\n=== Datetime Validation ===");
const datetimeBench = metabench("Datetime validation", {
  "zod-datetime"() {
    for (const _ of datetimeData) zodDatetimeSchema.parse(_);
  },
  "valibot-datetime"() {
    for (const _ of datetimeData) v.parse(valibotDatetimeSchema, _);
  },
  "valleys-iso8601"() {
    for (const _ of datetimeData) valleys.validate(_, valleysDatetimeSchema);
  },
});

await datetimeBench.run();
