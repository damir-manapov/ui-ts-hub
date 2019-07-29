import * as React from 'react';
import Document, {
  Head,
  Main,
  NextDocumentContext,
  NextScript,
} from 'next/document';
import flush from 'styled-jsx/server';
import { ServerStyleSheets } from '@material-ui/styles';

export default class SSRThemedDocument extends Document {
  public static async getInitialProps(ctx: NextDocumentContext) {
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () => originalRenderPage({
      enhanceApp: App => props => sheets.collect(<App {...props} />),
    });

    return {
      ...(await Document.getInitialProps(ctx)),
      styles: [
        <React.Fragment key='core'>
          {sheets.getStyleElement()}
          {flush() || null}
        </React.Fragment>,
      ],
    };
  }

  public render() {
    const viewportMetaValue =
      'user-scalable=0, initial-scale=1, ' +
      'minimum-scale=1, width=device-width, height=device-height';

    return (
      <html lang='en' dir='ltr'>
      <Head>
        <meta name='viewport' content={viewportMetaValue}/>
        <meta charSet='utf-8'/>

        <link
          href='https://fonts.googleapis.com/css?family=IBM+Plex+Sans:300
            ,400,500,600&amp;subset=cyrillic'
          rel='stylesheet'
        />
        {/*You can use some meta things, fonts, assets and other things here*/}
      </Head>

      {/*
       Do not touch this block until real need. If you want some things
       in every page, use _app.tsx file.
       */}
      <body>
      <Main/>
      <NextScript/>
      </body>
      </html>
    );
  }
}
