import * as React from 'react';
import c from 'classnames';
import * as dayjs from 'dayjs';
import 'dayjs/locale/ru';

import { ITheme } from '../../../theme';
import { createStyles, withStyles, WithStyles } from '@material-ui/core';

import { IHomePageProps } from './types';

import Head from 'next/head';
import Select from 'antd/lib/select';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Paper } from '../../paper';
import { Button } from '../../button';
import ArrowRight from '@material-ui/icons/ArrowForward';
import Loader from '@material-ui/core/CircularProgress';
import { Container } from '../../container';
import Modal from '@material-ui/core/Modal';
import { SelectedTicket } from './selected-ticket';
import Airplane from '@material-ui/icons/AirplanemodeActive';

import { AgentClient } from '../../../../lib/browser/clients/agent-client';
import {
  ETicketType,
  ICity,
  IFoundTicket,
  IUser,
} from '../../../../lib/shared/types';

import * as wnumb from 'wnumb';

interface IProps extends WithStyles<typeof styles>, IHomePageProps {
}

interface IState {
  cityFrom: ICity;
  cityTo: ICity;
  isSearching: boolean;
  tickets: IFoundTicket[];
  selectedTicket: IFoundTicket;
  selectedUser: IUser;
}

const { Option } = Select;
const CURRENT_DATE = dayjs()
  .set('minute', 0)
  .set('hour', 0)
  .set('second', 0)
  .set('millisecond', 0);
const numberFormat = wnumb({
  thousands: ' ',
});

const styles = (theme: ITheme) => createStyles({
  header: {
    position: 'fixed',
    zIndex: 100,
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    boxShadow: `0 5px 10px ${theme.palette.grey[100]}`,
    padding: '13px 0',
  },
  headerContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    maxWidth: 960,
  },
  headerBlock: {
    '& + &': {
      marginLeft: 25,
    },
  },
  headerLabel: {
    fontSize: 12,
    opacity: .8,
    marginBottom: 3,
  },
  headerTokens: {
    marginTop: 5,
    fontWeight: theme.typography.fontWeightMedium,
  },
  headerTokensPostfix: {
    color: theme.palette.primary.main,
    marginLeft: 5,
  },
  body: {
    paddingTop: 100,
    maxWidth: 960,
  },
  selector: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  selectorLabel: {
    marginBottom: 5,
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.45)',
  },
  selectorPanel: {
    padding: '8px 10px',

    [theme.breakpoints.up('xs')]: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  },
  selectorPanelText: {
    fontSize: 14,

    [theme.breakpoints.up('xs')]: {
      fontSize: 16,
    },
  },
  selectorPanelTextMuted: {
    fontSize: 14,
    fontWeight: theme.typography.fontWeightMedium,
    color: 'rgba(0, 0, 0, 0.25)',

    [theme.breakpoints.up('xs')]: {
      marginLeft: 16,
    },
  },
  selectorButton: {
    fontSize: 14,
    minHeight: 40,

    '&:hover': {
      '& $selectorButtonIcon': {
        transform: 'rotate(45deg) translateY(-5px)',
      },
    },

    [theme.breakpoints.up('xs')]: {
      fontSize: 16,
    },
  },
  selectorButtonIcon: {
    transform: 'rotate(45deg)',
    transition: theme.transitions.create('all'),
  },
  flightArrow: {
    transition: theme.transitions.create('all'),
    transform: 'rotate(90deg)',
    margin: '0 10px',
  },
  flightArrowCell: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  flightArrowContainer: {
    '&:before, &:after': {
      content: '""',
      display: 'block',
      borderTop: `2px solid ${theme.palette.primary.main}`,
      flex: '1 0 auto',
      opacity: .5,
      marginTop: -1,
    },

    [theme.breakpoints.up('sm')]: {
      marginBottom: 8,
    },
  },
  loader: {
    display: 'block',
    margin: '50px auto 0',
  },
  tickets: {
    marginTop: 30,
    maxWidth: 960,

    [theme.breakpoints.down('xs')]: {
      paddingRight: 0,
      paddingLeft: 0,
    },
  },
  ticket: {
    padding: '15px 20px',

    '& + &': {
      marginTop: 15,
    },

    [theme.breakpoints.down('xs')]: {
      borderRadius: 0,
    },
  },
  ticketMetas: {
    marginBottom: 10,
  },
  ticketMeta: {
    display: 'inline-block',
    marginRight: 10,
    marginBottom: 3,
    color: theme.palette.grey[500],
    fontSize: 12,
    lineHeight: '22px',
  },
  ticketMetaBordered: {
    padding: '0 10px',
    borderRadius: 5,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[100],
  },
  ticketMetaColored: {
    borderColor: '#FFA39E',
    color: '#F63E4C',
    backgroundColor: '#FFF1F0',
  },
  ticketLabel: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.45)',

    [theme.breakpoints.up('xs')]: {
      fontSize: 16,
    },
  },
  ticketDate: {
    fontSize: 16,
    fontWeight: theme.typography.fontWeightMedium,

    [theme.breakpoints.up('xs')]: {
      fontSize: 18,
    },
  },
  ticketArrow: {
    marginBottom: 8,
  },
  ticketPriceWrap: {
    display: 'none',

    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  },
  ticketPrice: {
    fontSize: 35,
    lineHeight: '40px',
    fontWeight: theme.typography.fontWeightMedium,
  },
  ticketPriceAdaptive: {
    marginLeft: 5,
    textAlign: 'center',

    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  ticketOldPrice: {
    fontSize: 15,
    fontWeight: theme.typography.fontWeightMedium,
    textDecoration: 'line-through',
    opacity: .6,
  },
  ticketOldPriceAdaptive: {
    textDecoration: 'line-through',
    opacity: .8,
  },
  ticketBuyButton: {
    fontSize: 14,

    [theme.breakpoints.up('xs')]: {
      fontSize: 16,
    },
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
  },
});

class HomePageComponent extends React.PureComponent<IProps, IState> {
  public static async getInitialProps(): Promise<IHomePageProps> {
    const client = new AgentClient();
    const [cities, users] = await Promise.all([
      client.cities.getList(),
      client.users.getList(),
    ]);

    return { cities, users };
  }

  private client = new AgentClient();

  public constructor(props: IProps) {
    super(props);

    const {
      cities: [cityFrom, cityTo],
      users: [selectedUser],
    } = props;

    this.state = {
      cityFrom,
      cityTo,
      isSearching: false,
      tickets: [] as IFoundTicket[],
      selectedTicket: null,
      selectedUser,
    };
  }

  public componentDidMount() {
    this.setState({ isSearching: true }, this.handleFlyClick);
  }

  public render() {
    const { isSearching } = this.state;

    return (
      <>
        <Head>
          <title>Buy tickets - Sweetcase</title>
        </Head>
        {this.renderHeader()}
        {this.renderSelector()}

        {isSearching
          ? this.renderLoader()
          : this.renderResults()}

        {this.renderModal()}
      </>
    );
  }

  private renderLoader = () => {
    const { classes } = this.props;

    return (
      <Loader
        color={'primary'}
        thickness={5}
        disableShrink={true}
        className={classes.loader}
      />
    );
  };

  private renderHeader = () => {
    const { classes, users } = this.props;
    const { selectedUser } = this.state;

    return (
      <header className={classes.header}>
        <Container className={classes.headerContainer}>
          <div className={classes.headerBlock}>
            <Typography className={classes.headerLabel}>
              Пользователь
            </Typography>
            <Select
              defaultValue={selectedUser.id}
              onChange={this.handleUserChange}
            >
              {users.map(item => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </div>
          <div className={classes.headerBlock}>
            <Typography className={classes.headerLabel}>
              Накопленные SWC баллы
            </Typography>
            <Typography className={classes.headerTokens}>
              {numberFormat.to(selectedUser.tokens)}
              <span className={classes.headerTokensPostfix}>
                SWC
              </span>
            </Typography>
          </div>
        </Container>
      </header>
    );
  };

  private renderSelector = () => {
    const { classes } = this.props;
    const { isSearching, cityFrom, cityTo } = this.state;

    return (
      <Container className={classes.body}>
        <Grid alignItems={'flex-end'} spacing={2} container>
          <Grid xs={12} sm={5} md={3} item>
            <Typography className={classes.selectorLabel}>
              Город отправления
            </Typography>
            <Paper elevation={0} className={classes.selectorPanel}>
              <Typography className={classes.selectorPanelText}>
                {cityFrom.name}
              </Typography>
              <Typography className={classes.selectorPanelTextMuted}>
                {cityFrom.abbreviation}
              </Typography>
            </Paper>
          </Grid>

          <Grid xs={12} sm={2} md={1} item className={classes.flightArrowCell}>
            <Grid
              alignItems={'center'}
              justify={'center'}
              container
              className={classes.flightArrowContainer}
            >
              <Airplane
                className={classes.flightArrow}
                color={'primary'}
                fontSize={'small'}
              />
            </Grid>
          </Grid>

          <Grid xs={12} sm={5} md={3} item>
            <Typography className={classes.selectorLabel}>
              Город назначения
            </Typography>
            <Paper elevation={0} className={classes.selectorPanel}>
              <Typography className={classes.selectorPanelText}>
                {cityTo.name}
              </Typography>
              <Typography className={classes.selectorPanelTextMuted}>
                {cityTo.abbreviation}
              </Typography>
            </Paper>
          </Grid>

          <Grid xs={12} sm={6} md={3} item>
            <Typography className={classes.selectorLabel}>
              Дата отправления
            </Typography>
            <Paper elevation={0} className={classes.selectorPanel}>
              <Typography className={classes.selectorPanelText}>
                {CURRENT_DATE.locale('ru').format('D MMMM YYYY')}
              </Typography>
            </Paper>
          </Grid>

          <Grid xs={12} sm={6} md={2} item>
            <Button
              color={'primary'}
              variant={'contained'}
              className={classes.selectorButton}
              onClick={this.handleFlyClick}
              disabled={isSearching}
              fullWidth={true}
            >
              <Airplane
                fontSize={'small'}
                className={classes.selectorButtonIcon}
              />
            </Button>
          </Grid>
        </Grid>
      </Container>
    );
  };

  private renderResults = () => {
    const { classes } = this.props;
    const { tickets, cityFrom, cityTo } = this.state;

    return (
      <Container className={classes.tickets}>
        {tickets.map((item, idx) => {
          const typeMetaClassName = c(
            classes.ticketMeta,
            classes.ticketMetaBordered,
            {
              [classes.ticketMetaColored]: item.type === ETicketType.Sweet,
            },
          );
          const classMetaClassName = c(
            classes.ticketMeta,
            classes.ticketMetaBordered,
          );

          return (
            <Paper className={classes.ticket} elevation={0} key={idx}>
              <div className={classes.ticketMetas}>
                <Typography className={typeMetaClassName}>
                  {item.type}
                </Typography>
                <Typography className={classMetaClassName}>
                  {item.class.id}
                </Typography>
                <Typography className={classes.ticketMeta}>
                  {item.fareBase.id}
                </Typography>
                <Typography className={classes.ticketMeta}>
                  {item.airline.name}
                </Typography>
              </div>

              <Grid alignItems={'flex-end'} spacing={2} container>
                <Grid xs={5} md={3} item>
                  <Typography className={classes.ticketLabel}>
                    {/* TODO: Необходимо отображать город исходя из билетов,
                    а не исходя из того, по каким городам мы искали. Для этого
                    надо расширить реализацию searchTickets */}
                    {cityFrom.name}
                  </Typography>
                  <Typography className={classes.ticketDate}>
                    {dayjs(item.departureDate)
                      .locale('ru')
                      .format('D MMMM YYYY, в HH:MM')}
                  </Typography>
                </Grid>

                <Grid xs={2} md={2} item>
                  <Grid alignItems={'flex-start'} justify={'center'} container>
                    <ArrowRight
                      className={classes.ticketArrow}
                      color={'primary'}
                    />
                  </Grid>
                </Grid>

                <Grid xs={5} md={3} item>
                  <Typography className={classes.ticketLabel}>
                    {cityTo.name}
                  </Typography>
                  <Typography className={classes.ticketDate}>
                    {dayjs(item.destinationDate)
                      .locale('ru')
                      .format('D MMMM YYYY, в HH:MM')}
                  </Typography>
                </Grid>

                <Grid className={classes.ticketPriceWrap} md={2} item>
                  {item.oldPrice && item.oldPrice !== item.price &&
                  <Typography
                    color={'primary'}
                    className={classes.ticketOldPrice}
                  >
                    ${item.oldPrice}
                  </Typography>}
                  <Typography color={'primary'} className={classes.ticketPrice}>
                    ${item.price}
                  </Typography>
                </Grid>

                <Grid xs={12} md={2} item>
                  <Button
                    color={'primary'}
                    variant={'contained'}
                    fullWidth={true}
                    onClick={() => this.handleBuyClick(item)}
                    className={classes.ticketBuyButton}
                  >
                    Купить
                    <span className={classes.ticketPriceAdaptive}>
                      за{' '}
                      {item.oldPrice &&
                      <span className={classes.ticketOldPriceAdaptive}>
                        ${item.oldPrice}
                      </span>}
                      {' '}${item.price}
                    </span>
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          );
        })}
      </Container>
    );
  };

  private renderModal = () => {
    const { selectedTicket, cityTo, cityFrom } = this.state;
    const { classes } = this.props;

    return (
      <Modal
        className={classes.modal}
        open={!!selectedTicket}
        closeAfterTransition={true}
        onBackdropClick={this.handleBackdropClick}
      >
        <>
          <SelectedTicket
            {...selectedTicket}
            from={cityFrom.name}
            fromAbbr={cityFrom.abbreviation}
            to={cityTo.name}
            toAbbr={cityTo.abbreviation}
            handleCancelClick={this.handleBackdropClick}
          />
        </>
      </Modal>
    );
  };

  private handleBackdropClick = () =>
    this.setState({ selectedTicket: null });

  private handleUserChange = async (id: string) => {
    this.setState({
      selectedUser: this.props.users.find(user => user.id === id),
    }, this.handleFlyClick);
  };

  private handleFlyClick = () => {
    this.setState({ isSearching: true }, async () => {
      const {
        cityFrom,
        cityTo,
      } = this.state;
      const tickets = await this.client.searchTickets({
        departureCityId: cityFrom.id,
        destinationCityId: cityTo.id,
        departureDate: CURRENT_DATE.toDate().toUTCString(),
      });

      this.setState({
        tickets,
        isSearching: false,
      });
    });
  };

  private handleBuyClick = (ticket: IFoundTicket) => this.setState({
    selectedTicket: ticket,
  });
}

export const HomePage = withStyles(styles)(HomePageComponent);
