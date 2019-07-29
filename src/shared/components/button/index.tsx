import withStyles from '@material-ui/styles/withStyles';
import createStyles from '@material-ui/styles/createStyles';

import MUIButton from '@material-ui/core/Button';
import { ITheme } from '../../theme';

const styles = (theme: ITheme) => createStyles({
  containedSecondary: {
    backgroundColor: 'white',
    border: `1px solid ${theme.palette.grey[300]}`,
    color: theme.palette.grey[600],
    boxShadow: `7px 7px 20px ${theme.palette.grey[100]}`,

    '&:focus, &:active': {
      backgroundColor: 'white',
      boxShadow: `7px 7px 20px ${theme.palette.grey[100]}`,
    },

    '&:hover': {
      backgroundColor: theme.palette.grey[100],
    },
  },
  containedPrimary: {
    boxShadow: '7px 7px 20px rgba(24, 144, 255, .3)',

    '&:focus, &:active': {
      boxShadow: '7px 7px 20px rgba(24, 144, 255, .3)',
    },
  },
});

export const Button = withStyles(styles)(MUIButton);
