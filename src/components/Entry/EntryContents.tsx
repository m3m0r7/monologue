import React, { PropsWithChildren } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import { xonokai } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import * as entryStyle from "./entry.module.scss";

type Props = {};

const EntryContents: React.FC<PropsWithChildren<Props> & { children: string }> = ({ children }) => {
  return <div className={entryStyle.entryMarkdown}>
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code({node, inline, className, children, ...props}) {
          const match = /language-(\w+)/.exec(className || '')
          return !inline && match ? (
            <SyntaxHighlighter
              children={String(children).replace(/\n$/, '')}
              style={xonokai}
              language={match[1]}
            />
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          )
        }
      }}>
      {children}
    </ReactMarkdown>
  </div>
}

export default EntryContents;
