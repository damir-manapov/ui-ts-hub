import * as React from 'react';
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as c from 'classnames';

const styles = (theme: Theme) =>
  createStyles({
    container: {
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '100%',
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),

      [theme.breakpoints.up('xs')]: {
        width: theme.breakpoints.width('xs'),
      },

      [theme.breakpoints.up('sm')]: {
        width: theme.breakpoints.width('sm'),
      },

      [theme.breakpoints.up('md')]: {
        width: theme.breakpoints.width('md'),
      },

      [theme.breakpoints.up('lg')]: {
        width: theme.breakpoints.width('lg'),
      },

      [theme.breakpoints.up('xl')]: {
        width: theme.breakpoints.width('xl'),
      },
    },
  });

interface IContainerProps
  extends WithStyles<typeof styles>, React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const Container = withStyles(styles)((props: IContainerProps) => {
  const { classes, className, ...rest } = props;

  return <div className={c(classes.container, className)} {...rest} />;
});
