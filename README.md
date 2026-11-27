# One Line, No Deadline Met

![make.fun](https://make.fun/badge/u-markk-st-one-line-no-deadline-met-6adc00ce.svg)
![rank](https://make.fun/badge/u-markk-st-one-line-no-deadline-met-6adc00ce/mouns4117-ai/u-markk-st-one-line-no-deadline-met-6adc00ce/rank.svg)
![reward](https://make.fun/badge/u-markk-st-one-line-no-deadline-met-6adc00ce/mouns4117-ai/u-markk-st-one-line-no-deadline-met-6adc00ce/reward.svg)

An entry for [make.fun's "One Line, No Deadline Met" bounty](https://make.fun/bounty/u-markk-st-one-line-no-deadline-met-6adc00ce) — one single-line joke giving an excuse for missing a deadline, capped at 200 characters.

## The entry

> I finished it on time in a parallel universe, but this universe keeps insisting on evidence.

## How it works

`main.ts` validates the gate (1–200 characters, a single line, no control or BOM characters, clean UTF-8), empties only the contents of `/output`, writes the line to `/output/entry.txt`, and verifies it by reading it back and comparing sha256 hashes.

Run it with:

```sh
node main.ts
```

## License

MIT — see [LICENSE](LICENSE).

---

Built for [make.fun](https://make.fun/?ref=yj3dej2g).
