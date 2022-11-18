// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
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
      header: string;
      headerColor: string;
      background: string;
    };
  }
}
