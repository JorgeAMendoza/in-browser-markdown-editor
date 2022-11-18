interface ThemeObject {
  background: string;
  previewArea: {
    color: string;
    header: string;
    background: string;
    codeBlock: {
      color: string;
      background: string;
    };
  };
  markdownArea: {
    color: string;
    header: string;
    background: string;
  };
}

export const lightTheme: ThemeObject = {
  background: '#FFF',
  previewArea: {
    color: '#7C8187',
    header: '#35393F',
    background: '#FFF',
    codeBlock: {
      color: '#35393F',
      background: '#F5F5F5',
    },
  },
  markdownArea: {
    color: '#35393F',
    header: '#35393F',
    background: '#FFF',
  },
};
export const darkTheme: ThemeObject = {
  background: '#151619',
  previewArea: {
    color: '#C1C4CB',
    header: '#FFF',
    background: '#FFF',
    codeBlock: {
      color: '#FFF',
      background: '#2B2D31',
    },
  },
  markdownArea: {
    color: '#C1C4CB',
    background: '#151619',
    header: '#1D1F22',
  },
};
