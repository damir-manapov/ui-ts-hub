import withStyles from '@material-ui/core/styles/withStyles';
import createStyles from '@material-ui/core/styles/createStyles';

import MUIPaper from '@material-ui/core/Paper';

const styles = () => createStyles({
  root: {
    boxShadow: '7px 7px 20px rgba(0, 0, 0, 0.07)',
    borderRadius: 5,
  },
});

export const Paper = withStyles(styles)(MUIPaper);
