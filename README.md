# diagram

Turns a natural-language description into a Mermaid diagram.

| | |
|---|---|
| Type | tools |
| Tools | 1 |
| Version | 1.0.0 |

## Tools

| Tool | What it does |
|---|---|
| `create_diagram` | Generate a Mermaid diagram (flowchart, sequence, class, and others) |

## Requirements

| Requirement | Detail |
|---|---|
| None | Text output; rendering happens wherever you paste it |

## Configuration

`defaultType`, `direction`.

Configured in LM Studio under Integrations → diagram; field definitions live in `src/configSchematics.ts`.

## Privileged surface

None. Produces text and touches no files.

## Failure modes

| Symptom | Cause |
|---|---|
| Diagram does not render | Mermaid syntax error — the model's output is not validated before return |

## Example prompts

- "Diagram our login flow as a sequence diagram."
- "Show this class hierarchy as a Mermaid class diagram."

## Development

```bash
npm install    # also runs `lms dev --install`
npm run build  # tsc
```

## Status

| Item | State |
|---|---|
| Compiles | verified with `tsc --noEmit` against the current toolchain |
| Tests | none — no smoke harness in this repo yet |
| Verified against | LM Studio 0.4.28 |
| Known gaps | no behavioural tests; docs written from source review |

## License

MIT
