// components/RichTextRenderer.tsx
import React from "react";
import { StrapiRichTextBlock, StrapiRichTextTextNode } from "@/types/StrapiRichText";

interface Props {
  content: StrapiRichTextBlock[] | string | null | undefined;
}

function renderTextNode(node: StrapiRichTextTextNode, key: number) {
  let element: React.ReactNode = node.text;

  if (node.code) {
    element = <code key={key}>{element}</code>;
  }
  if (node.bold) {
    element = <strong key={key}>{element}</strong>;
  }
  if (node.italic) {
    element = <em key={key}>{element}</em>;
  }
  if (node.strikethrough) {
    element = <del key={key}>{element}</del>;
  }

  if (node.url) {
    element = (
      <a key={key} href={node.url} className="text-blue-600 underline">
        {element}
      </a>
    );
  }

  return element;
}

const RichTextRenderer: React.FC<Props> = ({ content }) => {
  if (!Array.isArray(content)) {
    if (typeof content === "string") {
      return <p className="prose max-w-none">{content}</p>;
    }

    console.warn("⚠️ RichTextRenderer: contenuto non valido", content);
    return null;
  }

  return (
    <div className="prose max-w-none">
      {content.map((node, i) => {
        switch (node.type) {
          case "paragraph":
            return (
              <p key={i}>
                {node.children.map((c, idx) => renderTextNode(c, idx))}
              </p>
            );

          case "list":
            const ListTag = node.format === "ordered" ? "ol" : "ul";
            return (
              <ListTag key={i} className="pl-6 list-disc list-inside">
                {node.children.map((li, j) => (
                  <li key={j}>
                    {li.children.map((c, idx) => renderTextNode(c, idx))}
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
                className="my-4 max-w-full rounded-md"
              />
            );

          case "code":
            return (
              <pre key={i} className="bg-gray-100 p-3 rounded-md overflow-auto">
                <code className={`language-${node.language || "text"}`}>
                  {node.children.map((c, idx) => c.text).join("")}
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
