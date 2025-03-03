import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";


const MarkDown = ({ content }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              customStyle={{ fontSize: "14px", borderRadius: "6px" }}
              style={coldarkDark}
              language={match[1]}
              PreTag="div"
              {...props}
            >
              {String(children).trim()}
            </SyntaxHighlighter>
          ) : (
            <code className={`${className || ""} text-sm`} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkDown;