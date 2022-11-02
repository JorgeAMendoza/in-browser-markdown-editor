interface ThemeObject {
  background: string;
  previewArea: {
    color: string;
    header: string;
    codeBlock: {
      color: string;
      background: string;
    };
  };
  markdownArea: {
    color: string;
  };
}

export const lightTheme: ThemeObject = {
  background: '#FFF',
  previewArea: {
    color: '#7C8187',
    header: '#35393F',
    codeBlock: {
      color: '#35393F',
      background: '#F5F5F5',
    },
  },
  markdownArea: {
    color: '#35393F',
  },
};
export const darkTheme: ThemeObject = {
  background: '#151619',
  previewArea: {
    color: '#C1C4CB',
    header: '#FFF',
    codeBlock: {
      color: '#FFF',
      background: '#2B2D31',
    },
  },
  markdownArea: {
    color: '#C1C4CB',
  },
};
