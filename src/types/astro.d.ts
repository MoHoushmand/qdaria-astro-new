/// <reference types="astro/client" />

declare module 'astro:content' {
  interface Render {
    '.md': Promise<{
      Content: import('astro').MarkdownInstance<{}>['Content'];
      headings: import('astro').MarkdownHeading[];
      remarkPluginFrontmatter: Record<string, any>;
    }>;
  }
}

declare module 'astro/jsx-runtime' {
  export { Fragment } from 'astro/runtime/server';
  export { jsx, jsxs, jsxDEV } from 'astro/runtime/server/jsx';
}

declare module 'astro/runtime/server/jsx' {
  export function jsx(type: any, props: any, key?: string): any;
  export function jsxs(type: any, props: any, key?: string): any;
  export function jsxDEV(type: any, props: any, key?: string, isStaticChildren?: boolean, source?: any, self?: any): any;
}

declare module '*.astro' {
  const component: (props: any) => any;
  export default component;
}

declare module 'astro' {
  export * from 'astro/types';
}
