import { Case, Menu } from '../models';

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.json' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const value: any;
  export default value;
}

declare module 'case.json' {
  const value: Case[];
  export default value;
}

declare module 'menu.json' {
  const value: Menu;
  export default value;
}

declare global {
  interface Window {
    GA_INITIALIZED: boolean;
  }

  namespace NodeJS {
    interface ProcessEnv {
      CONTENTFUL_SPACE: string | undefined;
      CONTENTFUL_TOKEN: string | undefined;
      GA: string | undefined;
      NODE_ENV: 'development' | 'production';
    }
  }
}
