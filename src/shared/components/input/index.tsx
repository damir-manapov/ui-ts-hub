import InputBase from '@material-ui/core/InputBase';

import { ITheme } from '../../theme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = (theme: ITheme) => createStyles({
  input: {
    fontSize: 16,
    fontWeight: theme.typography.fontWeightRegular,
    padding: '10px 15px',
    border: `1px solid ${theme.palette.grey[200]}`,
    borderRadius: 4,
    transition: theme.transitions.create('all', {
      duration: 200,
    }),

    '&:hover': {
      borderColor: theme.palette.primary.main,
    },

    '&:focus, &:active': {
      borderColor: theme.palette.primary.main,
      boxShadow: '0 0 10px rgba(24, 144, 255, .4)',
    },
  },
});

export const Input = withStyles(styles)(InputBase);
