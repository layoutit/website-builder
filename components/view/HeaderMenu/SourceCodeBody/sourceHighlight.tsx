import React from "react";
import styles from "./SourceCodeBody.module.scss";

function highlightTag(token: string) {
  const openingMatch = token.match(/^<(\/?)([^\s/>]+)/);
  if (!openingMatch) return <span className={styles.syntaxTag}>{token}</span>;

  const nodes: React.ReactNode[] = [
    <span className={styles.syntaxPunctuation} key="open">
      {"<"}
      {openingMatch[1]}
    </span>,
    <span className={styles.syntaxTag} key="tag">
      {openingMatch[2]}
    </span>,
  ];
  const attrPattern = /(\s+)([^\s=/>]+)(?:(=)("[^"]*"|'[^']*'|[^\s>]+))?/g;
  let cursor = openingMatch[0].length;
  let match: RegExpExecArray | null;

  attrPattern.lastIndex = cursor;
  while ((match = attrPattern.exec(token))) {
    if (match.index > cursor) {
      nodes.push(
        <span className={styles.syntaxPunctuation} key={`punct-${cursor}`}>
          {token.slice(cursor, match.index)}
        </span>
      );
    }

    nodes.push(match[1]);
    nodes.push(
      <span className={styles.syntaxAttribute} key={`attr-${match.index}`}>
        {match[2]}
      </span>
    );

    if (match[3] && match[4]) {
      nodes.push(
        <span className={styles.syntaxPunctuation} key={`eq-${match.index}`}>
          {match[3]}
        </span>
      );
      nodes.push(
        <span className={styles.syntaxValue} key={`value-${match.index}`}>
          {match[4]}
        </span>
      );
    }

    cursor = match.index + match[0].length;
  }

  if (cursor < token.length) {
    nodes.push(
      <span className={styles.syntaxPunctuation} key="close">
        {token.slice(cursor)}
      </span>
    );
  }

  return nodes;
}

function highlightLine(line: string) {
  const tokenPattern = /(<!--[\s\S]*?-->|<!doctype[^>]*>|<\/?[a-zA-Z][^>]*?>)/gi;
  const nodes: React.ReactNode[] = [];
  let cursor = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenPattern.exec(line))) {
    if (match.index > cursor) {
      nodes.push(line.slice(cursor, match.index));
    }

    const token = match[0];
    if (token.startsWith("<!--")) {
      nodes.push(
        <span className={styles.syntaxComment} key={match.index}>
          {token}
        </span>
      );
    } else if (token.toLowerCase().startsWith("<!doctype")) {
      nodes.push(
        <span className={styles.syntaxDoctype} key={match.index}>
          {token}
        </span>
      );
    } else {
      nodes.push(
        <React.Fragment key={match.index}>{highlightTag(token)}</React.Fragment>
      );
    }

    cursor = match.index + token.length;
  }

  if (cursor < line.length) {
    nodes.push(line.slice(cursor));
  }

  return nodes;
}

export function highlightSourceCode(sourceCode: string) {
  const lines = sourceCode.split("\n");
  return lines.map((line, index) => (
    <React.Fragment key={index}>
      {highlightLine(line)}
      {index < lines.length - 1 && "\n"}
    </React.Fragment>
  ));
}
