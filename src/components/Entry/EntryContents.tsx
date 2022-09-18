import React, { PropsWithChildren } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import { xonokai } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import * as entryStyle from "./entry.module.scss";
import { visit } from "unist-util-visit";
import { Handlers } from "mdast-util-to-hast";

type Props = {};

const remarkSecretSymbolPlugin = () => {
  return (tree: any) => visit(tree, "paragraph", (node: any) => {
    node.children.map((childNode: any) => {
      if (childNode.type !== 'text') {
        return;
      }
      const matched = childNode.value.match(/(.*?)\[\[([^\]]+?)\]\](.*)/);
      if (!matched) {
        return;
      }

      // secret value.
      childNode.value = matched[1] + '█'.repeat(matched[2].length) + matched[3];
    })
    return;
  });
}

const EntryContents: React.FC<PropsWithChildren<Props> & { children: string }> = ({ children }) => {
  return <div className={entryStyle.entryMarkdown}>
    <ReactMarkdown
      remarkPlugins={[remarkSecretSymbolPlugin, remarkGfm]}
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
