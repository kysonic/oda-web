import React from 'react';
import Document, {Html, Head, Main, NextScript, DocumentContext} from 'next/document';
import theme from '@themes/default';
import { ServerStyleSheets } from '@material-ui/core/styles';

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const sheets = new ServerStyleSheets();
        const originalRenderPage = ctx.renderPage;
        // Collect all stylesheets from app
        ctx.renderPage = () =>
            originalRenderPage({
                enhanceApp: App => props => sheets.collect(<App {...props} />),
            });
        // Initialize props
        const initialProps = await Document.getInitialProps(ctx);

        return {
            ...initialProps,
            styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
        }
    }

    render() {
        return (
            <Html>
                <Head>
                    <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no" />
                    <meta name="theme-color" content={theme.palette.primary.main} />
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument;
