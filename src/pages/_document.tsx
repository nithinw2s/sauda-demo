// pages/_document.tsx
import * as React from "react";
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from "next/document";
import createEmotionServer from "@emotion/server/create-instance";
import theme from "../theme";
import createEmotionCache from "../createEmotionCache";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* PWA primary color */}
          <meta name="theme-color" content={theme.palette.primary.main} />
          {(this.props as any).emotionStyleTags}
          {/* google translate script */}
          <script
            type="text/javascript"
            src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
            async
            defer
          />
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `
            window.googleTranslateElementInit = function() {
              new google.translate.TranslateElement({
                pageLanguage: 'en',
                includedLanguages: 'en,ar',
                layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
                autoDisplay: false,
              }, 'google_translate_element');
            }
            `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (
  ctx: DocumentContext
): Promise<
  DocumentInitialProps & { emotionStyleTags: React.JSX.Element[] }
> => {
  const originalRenderPage = ctx.renderPage;

  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: any) => (props) =>
        <App emotionCache={cache} {...props} />,
    });

  const initialProps = await Document.getInitialProps(ctx);

  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style: any) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(" ")}`}
      key={style.key}
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    emotionStyleTags,
  };
};
