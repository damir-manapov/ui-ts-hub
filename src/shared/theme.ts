import { createMuiTheme, Theme } from '@material-ui/core/styles';
import createBreakpoints, {
  Breakpoint,
} from '@material-ui/core/styles/createBreakpoints';

// Custom theme.
export interface ITheme extends Theme {
}

const BREAKPOINTS = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};

const TEXT_COLOR_MAIN = 'rgba(0, 0, 0, 0.65)';

/**
 * Creates custom theme for project.
 */
export const theme = createMuiTheme({
  typography: {
    fontFamily: '\'IBM Plex Sans\', sans-serif',
    fontSize: 16,
    fontWeightMedium: 700,

    body2: {
      color: TEXT_COLOR_MAIN,
    },
  },
  mixins: {},
  breakpoints: createBreakpoints({
    values: BREAKPOINTS,
    width: (key: Breakpoint) => BREAKPOINTS[key] - 32,
  }),
  palette: {
    text: {
      primary: TEXT_COLOR_MAIN,
    },
    primary: {
      main: '#1890FF',
    },
  },
});
