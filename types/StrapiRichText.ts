// types/StrapiRichText.ts

export type StrapiTextNode = {
  type: "text";
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
  url?: string;
};

export type StrapiParagraph = {
  type: "paragraph";
  children: StrapiTextNode[];
};

export type StrapiListItem = {
  type: "list-item";
  children: StrapiTextNode[];
};

export type StrapiList = {
  type: "list";
  format: "unordered" | "ordered";
  children: StrapiListItem[];
};

export type StrapiImage = {
  type: "image";
  url: string;
  alt?: string;
};

export type StrapiVideo = {
  type: "video";
  url: string;
};

export type StrapiCodeBlock = {
  type: "code";
  language?: string;
  children: StrapiTextNode[];
};

// Tipo unificato
export type StrapiRichTextBlock =
  | StrapiParagraph
  | StrapiList
  | StrapiImage
  | StrapiVideo
  | StrapiCodeBlock;

// Alias compatibile per import coerente
export type StrapiRichTextTextNode = StrapiTextNode;
