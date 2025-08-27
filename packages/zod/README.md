This repo is a fork of Zod's original repository. I've included [Valleys](https://github.com/nimeshnayaju/valleys) in the existing benchmarks that Zod already used to compare Zod 4 against Zod 3. Since Valleys is a newer validation library, it doesn't support all the validator types that Zod does. Therefore, only benchmarks for validators available in both libraries are tested.

## Benchmarks

You can run these benchmarks yourself in the repo:

```sh
$ git clone git@github.com:nimeshnayaju/zod.git
$ cd zod
$ pnpm install
```

Then, to run a particular benchmark:

```sh
$ pnpm bench <name>
```

### 1.7x faster string parsing vs Zod 4

```sh
$ pnpm bench string
runtime: node v22.12.0 (arm64-darwin)

benchmark      time (avg)             (min … max)       p75       p99      p999
------------------------------------------------- -----------------------------
• z.string().parse
------------------------------------------------- -----------------------------
zod3          322 µs/iter       (262 µs … 705 µs)    346 µs    480 µs    594 µs
zod4       23'814 ns/iter    (20'041 ns … 220 µs) 23'584 ns 71'125 ns 94'083 ns
valleys    14'024 ns/iter    (12'250 ns … 261 µs) 13'292 ns 64'500 ns 75'958 ns

summary for z.string().parse
  valleys
   1.7x faster than zod4
   22.95x faster than zod3
```

### 34x faster string (with min and max length rule) parsing vs Zod 4

```sh
$ pnpm bench string-with-rules
runtime: node v22.12.0 (arm64-darwin)

benchmark      time (avg)             (min … max)       p75       p99      p999
------------------------------------------------- -----------------------------
• z.string().parse
------------------------------------------------- -----------------------------
zod3          398 µs/iter       (297 µs … 612 µs)    417 µs    542 µs    609 µs
zod4          632 µs/iter       (572 µs … 872 µs)    638 µs    788 µs    834 µs
valleys    18'232 ns/iter    (14'916 ns … 332 µs) 15'958 ns 74'541 ns    164 µs

summary for z.string().parse
  valleys
   21.82x faster than zod3
   34.68x faster than zod4
```

### 1.5x faster number parsing vs Zod 4

```sh
$ pnpm bench number
runtime: node v22.12.0 (arm64-darwin)

benchmark      time (avg)             (min … max)       p75       p99      p999
------------------------------------------------- -----------------------------
• z.number().parse
------------------------------------------------- -----------------------------
zod3          356 µs/iter       (316 µs … 618 µs)    368 µs    470 µs    541 µs
zod4       34'979 ns/iter    (24'375 ns … 229 µs) 28'500 ns    102 µs    171 µs
valleys    23'098 ns/iter    (20'417 ns … 218 µs) 22'167 ns 89'750 ns    119 µs

summary for z.number().parse
  valleys
   1.51x faster than zod4
   15.42x faster than zod3
```

### 18x faster number (with min and max value rule) parsing vs Zod 4

```sh
$ pnpm bench number-with-rules
runtime: node v22.12.0 (arm64-darwin)

benchmark      time (avg)             (min … max)       p75       p99      p999
------------------------------------------------- -----------------------------
• z.number().parse
------------------------------------------------- -----------------------------
zod3          365 µs/iter       (316 µs … 705 µs)    385 µs    479 µs    572 µs
zod4          491 µs/iter       (454 µs … 849 µs)    491 µs    602 µs    651 µs
valleys    27'116 ns/iter    (23'292 ns … 217 µs) 24'500 ns    107 µs    128 µs

summary for z.number().parse
  valleys
   13.44x faster than zod3
   18.12x faster than zod4
```

### 2.2x faster array (of string) parsing vs Zod 4

```sh
$ pnpm bench array-of-string
runtime: node v22.12.0 (arm64-darwin)

benchmark      time (avg)             (min … max)       p75       p99      p999
------------------------------------------------- -----------------------------
• z.array() parsing
------------------------------------------------- -----------------------------
zod3          220 µs/iter     (139 µs … 1'812 µs)    162 µs  1'187 µs  1'760 µs
zod4       18'329 ns/iter    (16'917 ns … 637 µs) 17'792 ns 39'250 ns    109 µs
valleys     8'233 ns/iter     (7'708 ns … 148 µs)  8'167 ns 10'500 ns 19'625 ns

summary for z.array() parsing
  valleys
   2.23x faster than zod4
   26.67x faster than zod3
```

### 20x faster array (of string with min and max length rule) parsing vs Zod 4

```sh
$ pnpm bench array-of-string-with-rules
runtime: node v22.12.0 (arm64-darwin)

benchmark      time (avg)             (min … max)       p75       p99      p999
------------------------------------------------- -----------------------------
• z.array() parsing
------------------------------------------------- -----------------------------
zod3          229 µs/iter     (147 µs … 1'805 µs)    169 µs  1'237 µs  1'697 µs
zod4          168 µs/iter     (149 µs … 1'283 µs)    162 µs    350 µs  1'208 µs
valleys     8'238 ns/iter     (7'666 ns … 158 µs)  8'167 ns 10'625 ns 20'916 ns

summary for z.array() parsing
  valleys
   20.39x faster than zod4
   27.74x faster than zod3
```

### 1.7x slower object (containing primitive values) parsing vs Zod 4

```sh
$ pnpm bench object
runtime: node v22.12.0 (arm64-darwin)

benchmark      time (avg)             (min … max)       p75       p99      p999
------------------------------------------------- -----------------------------
• z.object().parse
------------------------------------------------- -----------------------------
zod3        2'394 µs/iter   (2'273 µs … 2'814 µs)  2'421 µs  2'593 µs  2'814 µs
zod4          307 µs/iter       (276 µs … 531 µs)    304 µs    410 µs    469 µs
valibot     1'676 µs/iter   (1'580 µs … 1'854 µs)  1'700 µs  1'826 µs  1'854 µs
valleys       530 µs/iter       (498 µs … 711 µs)    529 µs    629 µs    689 µs

summary for z.object().parse
  zod4
   1.73x faster than valleys
   5.45x faster than valibot
   7.79x faster than zod3
```

### 2.5x faster object (containing primitives values with min and max rule) parsing vs Zod 4

```sh
$ pnpm bench object-with-rules
runtime: node v22.12.0 (arm64-darwin)

benchmark      time (avg)             (min … max)       p75       p99      p999
------------------------------------------------- -----------------------------
• z.object().parse
------------------------------------------------- -----------------------------
zod3        2'578 µs/iter   (2'372 µs … 3'323 µs)  2'634 µs  3'140 µs  3'323 µs
zod4        1'267 µs/iter   (1'147 µs … 1'563 µs)  1'302 µs  1'493 µs  1'563 µs
valibot     2'712 µs/iter   (2'434 µs … 5'983 µs)  2'744 µs  4'137 µs  5'983 µs
valleys       492 µs/iter     (448 µs … 1'040 µs)    501 µs    686 µs    976 µs

summary for z.object().parse
  valleys
   2.57x faster than zod4
   5.23x faster than zod3
   5.51x faster than valibot
```

### 2.2x faster nested object (containing primitives values with min and max rule) parsing vs Zod 4

```sh
$ pnpm bench nested-object
runtime: node v22.12.0 (arm64-darwin)

benchmark      time (avg)             (min … max)       p75       p99      p999
------------------------------------------------- -----------------------------
• z.object().parse
------------------------------------------------- -----------------------------
zod3        6'423 µs/iter   (6'186 µs … 7'005 µs)  6'504 µs  7'005 µs  7'005 µs
zod4        2'097 µs/iter   (1'949 µs … 2'507 µs)  2'148 µs  2'371 µs  2'507 µs
valibot     3'691 µs/iter   (3'496 µs … 4'074 µs)  3'779 µs  4'050 µs  4'074 µs
valleys       945 µs/iter     (860 µs … 1'210 µs)    978 µs  1'109 µs  1'210 µs

summary for z.object().parse
  valleys
   2.22x faster than zod4
   3.9x faster than valibot
   6.79x faster than zod3
```
