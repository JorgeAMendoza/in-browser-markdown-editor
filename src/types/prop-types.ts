import React from 'react';

export interface DocumentEditProps {
  markdownText: string;
  setMarkdownText: React.Dispatch<string>;
}

export interface MarkdownTextAreaProps {
  markdownText: DocumentEditProps['markdownText'];
  setMarkdownText: DocumentEditProps['setMarkdownText'];
}

export interface PreviewTextAreaProps {
  markdownText: DocumentEditProps['markdownText'];
}
