import { createConfigSchematics } from "@lmstudio/sdk";

export function buildConfigSchematics() {
  return createConfigSchematics()
    .field("defaultType", "select", {
      options: [
        { displayName: "Flowchart", value: "flowchart" },
        { displayName: "Sequence diagram", value: "sequence" },
        { displayName: "Class diagram", value: "class" },
        { displayName: "State diagram", value: "state" },
        { displayName: "ER diagram", value: "er" },
        { displayName: "Mindmap", value: "mindmap" },
        { displayName: "Git graph", value: "git" },
      ],
    }, "flowchart")
    .field(
      "direction",
      "select",
      {
        options: [
          { displayName: "Top-down", value: "TD" },
          { displayName: "Left-right", value: "LR" },
        ],
      },
      "TD",
    )
    .build();
}
