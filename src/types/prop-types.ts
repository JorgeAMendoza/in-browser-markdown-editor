import React from 'react';

export interface DocumentEditProps {
  markdownText: string;
  setMarkdownText: React.Dispatch<string>;
}

export interface MarkdownTextAreaProps {
  markdownText: DocumentEditProps['markdownText'];
  setMarkdownText: (content: string) => void;
}

export interface PreviewTextAreaProps {
  markdownText: DocumentEditProps['markdownText'];
}

export interface TopBarProps {
  documentTitle: string;
  setDocumentTitle: React.Dispatch<string>;
  saveDocument: () => void;
}
