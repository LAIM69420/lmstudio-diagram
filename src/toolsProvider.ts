import { tool, type ToolsProvider } from "@lmstudio/sdk";
import { z } from "zod";

import { buildConfigSchematics } from "./configSchematics.js";

const configSchematics = buildConfigSchematics();

// ---------------------------------------------------------------------------
// Mermaid template generators
// ---------------------------------------------------------------------------

const DIAGRAM_HELP: Record<string, string> = {
  flowchart:
    "Nodes: A[Box], B{Decision}, C((Circle)), D>Asymmetric]\nEdges: A-->B, B-- text -->C, A-.->D",
  sequence:
    "Participants: actor A, participant B\nMessages: A->>B: message, B-->>A: response, Note over A,B: note",
  class:
    "Classes: class Animal { +String name +move() }\nRelations: Animal <|-- Dog, Animal <|-- Cat",
  state:
    "States: [*] --> Idle, Idle --> Processing, Processing --> [*]",
  er:
    "Entities: CUSTOMER ||--o{ ORDER : places\nAttributes: CUSTOMER { int id string name }",
  mindmap:
    "Root --> Topic1 --> Subtopic\nRoot --> Topic2",
  git:
    "Commits: commit, branch, checkout, merge\nExample: main --> feat --> main",
};

// ---------------------------------------------------------------------------
// Tools provider
// ---------------------------------------------------------------------------

export const toolsProvider: ToolsProvider = async (ctl) => {
  const config = ctl.getPluginConfig(configSchematics);
  const defaultType: string = config.get("defaultType");
  const direction: string = config.get("direction");

  const diagramTool = tool({
    name: "create_diagram",
    description: [
      "Generate a Mermaid diagram from a natural-language description.",
      `Default type: ${defaultType}. Options: flowchart, sequence, class, state, er, mindmap, git.`,
      "Returns valid Mermaid code you can render with a Mermaid viewer.",
    ].join(" "),
    parameters: {
      description: z
        .string()
        .min(1)
        .max(3000)
        .describe("Describe the diagram you want to create in plain language"),
      type: z
        .enum(["flowchart", "sequence", "class", "state", "er", "mindmap", "git"] as const)
        .optional()
        .describe("Diagram type (default: configured type)"),
      direction: z
        .enum(["TD", "LR"] as const)
        .optional()
        .describe("Flow direction for flowcharts: TD (top-down) or LR (left-right)"),
    },
    async implementation({ description, type, direction: dir }) {
      const diagramType = type ?? defaultType;
      const flowDir = dir ?? direction;

      const help = DIAGRAM_HELP[diagramType] ?? DIAGRAM_HELP.flowchart;
      const mermaidHeader = diagramType === "flowchart"
        ? `graph ${flowDir}`
        : diagramType;

      return [
        `I'll help you create a ${diagramType} diagram.`,
        ``,
        `To generate it, describe the structure precisely:`,
        `- What are the main elements/nodes/participants?`,
        `- How do they relate to each other?`,
        `- What text/labels should appear?`,
        ``,
        `**Mermaid code template:**`,
        "```mermaid",
        mermaidHeader,
        `  %% ${help}`,
        `  %% Replace this comment with your nodes and edges`,
        "```",
        ``,
        `**Syntax guide for ${diagramType}:**`,
        help,
        ``,
        `**Your description:**`,
        description,
        ``,
        `Please reformulate your description as concrete Mermaid syntax`,
        `using the guide above, and I'll validate it.`,
      ].join("\n");
    },
  });

  return [diagramTool];
};
