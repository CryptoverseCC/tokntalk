import React from "react";

export const chunkBy = (items, keySelector) => {
  let chunks = [];
  for (const item of items) {
    const lastChunk = chunks[chunks.length - 1];
    if (lastChunk && lastChunk.key === keySelector(item)) {
      lastChunk.items.push(item);
    } else {
      chunks.push({ key: keySelector(item), items: [item] });
    }
  }
  return chunks;
};

export const transformPurrsToPurrGroups = purrs =>
  chunkBy(purrs, ({ token_id }) => token_id).map(({ key, items }) => ({ catId: key, purrs: items }));

export const SplitString = ({ children: string }) =>
  string.split('').map((letter, index) => (letter === ' ' ? ' ' : <span key={index}>{letter}</span>));
