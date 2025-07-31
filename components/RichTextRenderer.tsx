// components/RichTextRenderer.tsx
import React from "react";

type TextNode = {
  type: "text";
  text: string;
};

type ParagraphNode = {
  type: "paragraph";
  children: TextNode[];
};

type ListItemNode = {
  type: "list-item";
  children: TextNode[];
};

type ListNode = {
  type: "list";
  format: "unordered" | "ordered";
  children: ListItemNode[];
};

type ImageNode = {
  type: "image";
  url: string;
  alt?: string;
};

type VideoNode = {
  type: "video";
  url: string;
};

type CodeBlockNode = {
  type: "code";
  language?: string;
  children: TextNode[];
};

type Node =
  | ParagraphNode
  | ListNode
  | ImageNode
  | VideoNode
  | CodeBlockNode;

interface Props {
  content: Node[] | any; // fallback per garantire compatibilità anche con oggetti errati
}

export const RichTextRenderer: React.FC<Props> = ({ content }) => {
  if (!Array.isArray(content)) {
    console.warn("RichTextRenderer: contenuto non valido", content);
    return null;
  }

  return (
    <div className="prose max-w-none">
      {content.map((node: Node, i: number) => {
        switch (node.type) {
          case "paragraph":
            return (
              <p key={i}>
                {node.children.map((c, idx) => (
                  <React.Fragment key={idx}>{c.text}</React.Fragment>
                ))}
              </p>
            );

          case "list":
            const ListTag = node.format === "ordered" ? "ol" : "ul";
            return (
              <ListTag key={i}>
                {node.children.map((li, j) => (
                  <li key={j}>
                    {li.children.map((c, idx) => (
                      <React.Fragment key={idx}>{c.text}</React.Fragment>
                    ))}
                  </li>
                ))}
              </ListTag>
            );

          case "image":
            return (
              <img
                key={i}
                src={node.url}
                alt={node.alt || ""}
                className="rounded-md my-4 max-w-full h-auto"
              />
            );

          case "video":
            return (
              <video
                key={i}
                src={node.url}
                controls
                className="my-4 max-w-full"
              />
            );

          case "code":
            return (
              <pre key={i} className="bg-gray-100 p-3 rounded-md overflow-auto">
                <code className={`language-${node.language || "text"}`}>
                  {node.children.map((c, idx) => (
                    <React.Fragment key={idx}>{c.text}</React.Fragment>
                  ))}
                </code>
              </pre>
            );

          default:
            return null;
        }
      })}
    </div>
  );
};

export default RichTextRenderer;
