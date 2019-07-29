import * as React from 'react';

import { Store } from 'redux';
import { IReduxState } from '../shared/redux';
import { IConfigReducerState } from '../shared/redux/config';
import { INextPageContext, INextAppContext } from '../shared/types';

import { getOrCreateStore } from '../shared/utils/store';

import { theme } from '../shared/theme';

import App, { Container } from 'next/app';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import ThemeProvider from '@material-ui/styles/ThemeProvider';

import 'antd/dist/antd.less';

interface IProps {
  pageProps: any;
  initialReduxState: IReduxState;
}

export class ThemedApp extends App<IProps> {
  public static async getInitialProps(
    appContext: INextAppContext,
  ): Promise<IProps> {
    const { Component: Page, ctx } = appContext;

    // ctx.res doesn't exist on client side. But we don't care if
    // some field will be {} or something like this, because getOrCreateStore
    // will return already created store, ignoring applicationState.

    // So, App.getInitialProps will be called firstly when user joins our site.
    // From this point, redux store is created and getOrCreateStore will
    // always return the same store. App.getInitialProps will be called more
    // times while joining the other pages through internal Next
    // routing (via next/link component).
    const applicationState: IReduxState = {
      config: ctx.res ? ctx.res.locals.config : ({} as IConfigReducerState),
    };
    const reduxStore = getOrCreateStore(applicationState);
    const initialReduxState = reduxStore.getState();
    const pageProps = Page.getInitialProps
      ? await Page.getInitialProps({
        ...ctx,
        store: reduxStore,
      } as INextPageContext)
      : {};

    return {
      pageProps,
      initialReduxState,
    };
  }

  private readonly reduxStore: Store<IReduxState>;

  public constructor(props) {
    super(props);
    this.reduxStore = getOrCreateStore(props.initialReduxState);
  }

  public componentDidMount(): void {
    const jssServerSide = document.querySelector('#jss-server-side');

    if (jssServerSide) {
      jssServerSide.remove();
    }
  }

  public render() {
    const { Component: Page, pageProps } = this.props;

    return (
      <Container>
        <Provider store={this.reduxStore}>
          <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Page {...pageProps} />
          </ThemeProvider>
        </Provider>
      </Container>
    );
  }
}

export default ThemedApp;
