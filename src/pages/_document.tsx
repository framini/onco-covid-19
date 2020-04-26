import Document, { Head, Main, NextScript } from 'next/document';
import { extractCritical } from 'emotion-server';

export default class OncoCovid19Document extends Document<any> {
  static getInitialProps({ renderPage }: any) {
    const page = renderPage();
    const styles = extractCritical(page.html);
    return { ...page, ...styles };
  }

  render() {
    return (
      <html lang="es">
        <Head>
          <style
            data-emotion-css={this.props.ids.join(' ')}
            dangerouslySetInnerHTML={{ __html: this.props.css }}
          />
          <link
            rel="preload"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
            href="/fonts/open-sans-v17-latin-600.woff2"
          />
          <link
            rel="preload"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
            href="/fonts/open-sans-v17-latin-regular.woff2"
          />
          <link
            rel="preload"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
            href="/fonts/pt-serif-v11-latin-700.woff2"
          ></link>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              try{new FontFace('Open Sans__subset',"url(/fonts/open-sans-v17-latin-600.woff2) format('woff2'), url(/subfont/Open_Sans-600-2af9648f10.woff) format('woff')",{'font-weight':600}).load(),new FontFace('Open Sans__subset',"url(/fonts/open-sans-v17-latin-regular.woff2) format('woff2'), url(/subfont/Open_Sans-400-abaefcd05c.woff) format('woff')",{}).load(),new FontFace('PT Serif__subset',"url(/fonts/pt-serif-v11-latin-700.woff2) format('woff2'), url(/subfont/PT_Serif-700-c2db6364b1.woff) format('woff')",{'font-weight':700}).load()}catch(e){}
            `,
            }}
          ></script>
          <style
            dangerouslySetInnerHTML={{
              __html: `
              @font-face{font-display:swap;font-family:'Open Sans';font-style:normal;font-weight:400;src:local('Open Sans Regular'),local('OpenSans-Regular'),url(/fonts/open-sans-v17-latin-regular.woff2) format('woff2'),url(/fonts/open-sans-v17-latin-regular.woff) format('woff')}@font-face{font-display:swap;font-family:'Open Sans';font-style:normal;font-weight:600;src:local('Open Sans SemiBold'),local('OpenSans-SemiBold'),url(/fonts/open-sans-v17-latin-600.woff2) format('woff2'),url(/fonts/open-sans-v17-latin-600.woff) format('woff')}@font-face{font-display:swap;font-family:'PT Serif';font-style:normal;font-weight:700;src:local('PT Serif Bold'),local('PTSerif-Bold'),url(/fonts/pt-serif-v11-latin-700.woff2) format('woff2'),url(/fonts/pt-serif-v11-latin-700.woff) format('woff')}
              `,
            }}
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#00aba9" />
          <meta name="theme-color" content="#ffffff"></meta>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
