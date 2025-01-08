/// <reference types="astro/client" />

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: {
      class?: string;
      className?: string;
      children?: any;
      [key: string]: any;
    };
  }
}

declare module 'astro:content' {
  interface Render {
    '.md': Promise<{
      Content: import('astro').MarkdownInstance<{}>['Content'];
      headings: import('astro').MarkdownHeading[];
      remarkPluginFrontmatter: Record<string, any>;
    }>;
  }
}

declare module '*.astro' {
  const component: (props: any) => any;
  export default component;
}

declare module 'astro:jsx' {
  export * from 'astro/types';
}

declare module 'astro/jsx-runtime' {
  export * from 'astro/types';
}

declare module '@astrojs/react' {
  export * from '@astrojs/react';
}

interface Props {
  class?: string;
  className?: string;
  children?: any;
  [key: string]: any;
}
