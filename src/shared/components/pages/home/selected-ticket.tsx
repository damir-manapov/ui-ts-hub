import * as React from 'react';

import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

import { Container } from '../../container';
import { Input } from '../../input';
import { Button } from '../../button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ArrowRight from '@material-ui/icons/ArrowForward';

import { IFoundTicket } from '../../../../lib/browser/clients/agent-client';
import { ITheme } from '../../../theme';

import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ru';

interface IProps extends WithStyles<typeof styles>, IFoundTicket {
  from: string;
  fromAbbr: string;
  to: string;
  toAbbr: string;

  handleCancelClick(): void;
}

interface IState {
  firstName: string;
  lastName: string;
  passportId: string;
  birthDate: Dayjs;
}

const styles = (theme: ITheme) => createStyles({
  container: {
    maxWidth: 736,
  },
  wrap: {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    padding: 30,

    [theme.breakpoints.up('xs')]: {
      position: 'static',
      padding: 50,
    },

    [theme.breakpoints.down('xs')]: {
      borderRadius: 0,
    },
  },
  title: {
    fontSize: 24,
    fontWeight: theme.typography.fontWeightMedium,
    marginBottom: 15,

    [theme.breakpoints.up('xs')]: {
      fontSize: 30,
      marginBottom: 30,
    },
  },
  arrow: {
    margin: '0 10px',
    height: 25,
    width: 25,
    verticalAlign: 'sub',

    [theme.breakpoints.up('xs')]: {
      height: 32,
      width: 32,
    },
  },
  label: {
    fontSize: 14,
    color: theme.palette.grey[400],
  },
  input: {
    marginTop: 5,
  },
  text: {
    fontSize: 16,

    [theme.breakpoints.up('xs')]: {
      fontSize: 18,
    },
  },
  personal: {
    marginTop: 8,
  },
  buttons: {
    marginTop: 16,
  },
  button: {
    minWidth: 60,
  },
});

class SelectedTicketComponent extends React.PureComponent<IProps, IState> {
  public state = {
    firstName: '',
    lastName: '',
    passportId: '',
    birthDate: null,
  };

  public render() {
    const {
      classes,
      departureDate,
      fromAbbr,
      toAbbr,
    } = this.props;
    const departureDateText = dayjs(departureDate.toUTCString())
      .locale('ru')
      .format('D MMMM YYYY, в HH:MM');

    return (
      <Container className={classes.container}>
        <Paper className={classes.wrap}>
          <Typography className={classes.title}>
            {fromAbbr}
            <ArrowRight className={classes.arrow}/>
            {toAbbr}{' '}
            {departureDateText}
          </Typography>
          {this.renderDetails()}
          {this.renderPersonalData()}
        </Paper>
      </Container>
    );
  }

  private renderDetails = () => {
    const {
      classes,
      airline,
      price,
      from,
      fromAbbr,
      to,
      toAbbr,
    } = this.props;

    return (
      <Grid spacing={2} container>
        <Grid xs={12} sm={6} item>
          <Typography className={classes.label}>
            Departure
          </Typography>
          <Typography className={classes.text}>
            {from} ({fromAbbr})
          </Typography>
        </Grid>
        <Grid xs={12} sm={6} item>
          <Typography className={classes.label}>
            Arrival
          </Typography>
          <Typography className={classes.text}>
            {to} ({toAbbr})
          </Typography>
        </Grid>
        <Grid xs={12} sm={6} item>
          <Typography className={classes.label}>
            Airline
          </Typography>
          <Typography className={classes.text}>
            {airline.name}
          </Typography>
        </Grid>
        <Grid xs={12} sm={6} item>
          <Typography className={classes.label}>
            Price
          </Typography>
          <Typography className={classes.text}>
            ${price}
          </Typography>
        </Grid>
        <Grid xs={12} sm={6} item>
          <Typography className={classes.label}>
            Flight
          </Typography>
          <Typography className={classes.text}>
            n / a
          </Typography>
        </Grid>
      </Grid>
    );
  };

  private renderPersonalData = () => {
    const { classes, handleCancelClick } = this.props;
    const { firstName, lastName, passportId } = this.state;

    return (
      <>
        <Grid spacing={2} className={classes.personal} container>
          <Grid xs={12} sm={3} item>
            <Typography className={classes.label}>
              First name
            </Typography>
            <Input
              fullWidth={true}
              className={classes.input}
              value={firstName}
              placeholder={'Frank'}
              onChange={this.onChange('firstName')}
            />
          </Grid>
          <Grid xs={12} sm={3} item>
            <Typography className={classes.label}>
              Last name
            </Typography>
            <Input
              fullWidth={true}
              className={classes.input}
              value={lastName}
              placeholder={'Miles'}
              onChange={this.onChange('lastName')}
            />
          </Grid>
          <Grid xs={12} sm={3} item>
            <Typography className={classes.label}>
              Passport ID
            </Typography>
            <Input
              fullWidth={true}
              className={classes.input}
              value={passportId}
              placeholder={'C0002185'}
              onChange={this.onChange('passportId')}
            />
          </Grid>
          <Grid xs={12} sm={3} item>
            <Typography className={classes.label}>
              Date of Birth
            </Typography>
          </Grid>
        </Grid>
        <Grid className={classes.buttons} spacing={2} container>
          <Grid xs={12} sm={'auto'} item>
            <Button
              color={'primary'}
              variant={'contained'}
              fullWidth={true}
              className={classes.button}
            >
              Pay
            </Button>
          </Grid>
          <Grid xs={12} sm={'auto'} item>
            <Button
              color={'secondary'}
              variant={'contained'}
              fullWidth={true}
              className={classes.button}
              onClick={handleCancelClick}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </>
    );
  };

  private onChange = (key: keyof IState) => {
    return (e: React.ChangeEvent) => this.setState({
      [key]: e.target.value,
    });
  };
}

export const SelectedTicket = withStyles(styles)(SelectedTicketComponent);
