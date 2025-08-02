// lib/isRichTextArray.ts

import { StrapiRichTextBlock } from "@/types/StrapiRichText";

export function isRichTextArray(value: unknown): value is StrapiRichTextBlock[] {
  return (
    Array.isArray(value) &&
    value.length > 0 &&
    typeof value[0] === "object" &&
    "type" in value[0]
  );
}
