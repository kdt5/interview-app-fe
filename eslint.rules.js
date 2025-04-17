export const namingConvention = [
  {
    selector: "variable",
    format: ["strictCamelCase", "UPPER_CASE", "PascalCase"],
  },
  {
    selector: "parameter",
    format: ["strictCamelCase"],
    leadingUnderscore: "allow",
  },
  {
    selector: "typeLike",
    format: ["PascalCase"],
  },
  {
    selector: "enumMember",
    format: ["UPPER_CASE"],
  },
  {
    selector: "function",
    format: ["strictCamelCase", "PascalCase"],
  },
  {
    selector: "objectLiteralProperty",
    format: ["strictCamelCase", "PascalCase", "UPPER_CASE"],
    filter: {
      regex: "[-]",
      match: false,
    },
    leadingUnderscore: "allow",
  },
  {
    selector: "import",
    format: ["strictCamelCase", "PascalCase"],
  },
];
