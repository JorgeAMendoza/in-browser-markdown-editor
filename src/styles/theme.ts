import { DefaultTheme } from 'styled-components';

export const lightTheme: DefaultTheme = {
  background: '#FFF',
  seperatorOutline: '#E4E4E4',
  previewArea: {
    color: '#7C8187',
    header: '#F5F5F5',
    previewMarkdown: {
      header: '#35393F',
      text: '#7C8187',
      codeBlock: {
        color: '#35393F',
        background: '#F5F5F5',
      },
      blockquote: {
        color: '#35393F',
        background: '#F5F5F5',
      },
    },
  },
  markdownArea: {
    color: '#35393F',
    header: '#F5F5F5',
    headerColor: '#7C8187',
    background: '#FFF',
  },
};
export const darkTheme: DefaultTheme = {
  background: '#151619',
  seperatorOutline: '#5A6069',
  previewArea: {
    color: '#C1C4CB',
    header: '#1D1F22',
    previewMarkdown: {
      header: '#FFF',
      text: '#C1C4CB',
      codeBlock: {
        color: '#FFF',
        background: '#2B2D31',
      },
      blockquote: {
        color: '#FFFFFF',
        background: '#2B2D31',
      },
    },
  },
  markdownArea: {
    color: '#C1C4CB',
    background: '#151619',
    header: '#1D1F22',
    headerColor: '#C1C4CB',
  },
};
