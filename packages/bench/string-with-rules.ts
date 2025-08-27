import { makeData, makeSchema } from "./benchUtil.js";
import { string } from "valleys";
import { metabench } from "./metabench.js";

const { zod3, zod4 } = makeSchema((z) => z.string().min(0).max(100));
const validator = string({ minLength: 0, maxLength: 100 });

const DATA = makeData(10000, () => `${Math.random()}`);
const bench = metabench("z.string().parse", {
  zod3() {
    for (const _ of DATA) zod3.parse(_);
  },
  zod4() {
    for (const _ of DATA) zod4.parse(_);
  },
  valleys() {
    for (const _ of DATA) validator.unstable_validate(_);
  },
});

await bench.run();
