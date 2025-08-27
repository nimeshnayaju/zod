import { makeData, makeSchema } from "./benchUtil.js";
import { metabench } from "./metabench.js";
import { boolean } from "valleys";

const { zod3, zod4 } = makeSchema((z) => z.boolean());
const validator = boolean();    
const DATA = makeData(10000, () => Math.random() > 0.5);

const bench = metabench("z.boolean().parse", {
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
