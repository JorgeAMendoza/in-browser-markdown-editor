// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    background: string;
    seperatorOutline: string;
    previewArea: {
      color: string;
      header: string;
      previewMarkdown: {
        header: string;
        text: string;
        codeBlock: {
          color: string;
          background: string;
        };
        blockquote: {
          background: string;
          color: string;
        };
      };
    };
    markdownArea: {
      color: string;
      header: string;
      headerColor: string;
      background: string;
    };
  }
}
