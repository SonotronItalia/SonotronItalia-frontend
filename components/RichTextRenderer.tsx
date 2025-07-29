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
  content: Node[];
}

export const RichTextRenderer: React.FC<Props> = ({ content }) => {
  return (
    <div className="prose max-w-none">
      {content.map((node, i) => {
        switch (node.type) {
          case "paragraph":
            return <p key={i}>{node.children.map((c) => c.text).join("")}</p>;

          case "list":
            if (node.format === "unordered") {
              return (
                <ul key={i}>
                  {node.children.map((li, j) => (
                    <li key={j}>{li.children.map((c) => c.text).join("")}</li>
                  ))}
                </ul>
              );
            } else {
              return (
                <ol key={i}>
                  {node.children.map((li, j) => (
                    <li key={j}>{li.children.map((c) => c.text).join("")}</li>
                  ))}
                </ol>
              );
            }

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
                  {node.children.map((c) => c.text).join("")}
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
