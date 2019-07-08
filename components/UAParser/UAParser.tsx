import React from 'react';
import { UAParser } from 'ua-parser-js';
import { NextComponentType } from 'next';

type UA = string;

interface UAProviderProps {
  ua: string;
}

type Type = 'ios' | 'android' | 'mobile' | 'tablet' | 'desktop';

const UAParserContext = React.createContext<UA | undefined>(undefined);

export const UAProvider: React.FC<UAProviderProps> = ({ ua, ...rest }) => {
  return <UAParserContext.Provider value={ua} {...rest} />;
};

interface Result {
  ios: boolean;
  android: boolean;
  mobile: boolean;
  tablet: boolean;
  desktop: boolean;
}

let results: Result = {
  ios: false,
  android: false,
  mobile: false,
  tablet: false,
  desktop: false,
};

let parser: UAParser | null = null;

export function useUA(type: Type): boolean {
  const context = React.useContext(UAParserContext);

  if (!parser && context) {
    parser = new UAParser();
    parser.setUA(context);
    results = {
      ...results,
      ios: parser.getOS().name === 'iOS',
      android: parser.getOS().name === 'Android',
      mobile: parser.getDevice().type === 'mobile',
      tablet: parser.getDevice().type === 'tablet',
    };
    results.desktop = !results.mobile && !results.tablet;
  }

  return results[type];
}

interface UANextComponentProps {
  ua: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export const UADisplay: React.FC<{
  type: Type;
  children: React.ReactElement;
}> = ({ type, children }) => {
  const display = useUA(type);

  if (display) {
    return children;
  }

  return null;
};

export function UANextWrapper<T>(PageComponent: NextComponentType<T>) {
  return class UAWrapper extends React.Component<UANextComponentProps> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public static async getInitialProps(ctx: any) {
      let pageProps = {};
      let ua = '';

      if (PageComponent.getInitialProps) {
        pageProps = await PageComponent.getInitialProps(ctx);
      }
      if (ctx.req && ctx.req.headers) {
        ua = ctx.req.headers['user-agent'];
      } else if (typeof navigator !== 'undefined') {
        ua = navigator.userAgent;
      }

      return { pageProps, userAgent: ua };
    }

    public render() {
      const { userAgent, pageProps } = this.props;

      return (
        <UAParserContext.Provider value={userAgent}>
          <PageComponent {...pageProps} />
        </UAParserContext.Provider>
      );
    }
  };
}
