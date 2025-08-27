import { makeData, makeSchema, randomString } from "./benchUtil.js";
import { metabench } from "./metabench.js";
import { array, string } from "valleys";  

const { zod3, zod4 } = makeSchema((z) => z.array(z.string()));
const validator = array(string());
const DATA = makeData(1000, () => Array.from({ length: 3 }, () => randomString(10)));

// make sure they're working
console.log(zod3.parse(DATA[0]));
console.log(zod4.parse(DATA[0]));
console.log(validator.unstable_validate(DATA[0]));

const bench = metabench("z.array() parsing", {
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
