import { CSSObject } from 'styled-components';
import Typography from 'typography';
import usWebDesignStandardsTheme from 'typography-theme-us-web-design-standards';

usWebDesignStandardsTheme.overrideThemeStyles = ({ rhythm: r }) => {
  return {
    'a.gatsby-resp-image-link': {
      boxShadow: `none`,
    },
    code: {
      fontFamily: ['Inconsolata', 'monospace'].join(','),
    },
    'code.vscode-highlight-code': {
      lineHeight: 'normal',
    },
    'code:not(.vscode-highlight-code)': {
      backgroundColor: 'rgba(27,31,35,.05)',
      borderRadius: '3px',
      margin: '0',
      padding: `${r(1 / 16)} ${r(1 / 8)}`,
    },
  };
};

// delete fonts to prevent font fetching (they are included as dependency and loaded in gatsby-browser.js)
delete usWebDesignStandardsTheme.googleFonts;

const typography = new Typography(usWebDesignStandardsTheme);

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles();
}

export default typography;
export const rhythm = typography.rhythm;
export const scale = typography.scale;

type StyledScale = (values: number) => CSSObject;
export const styledScale = scale as StyledScale;
