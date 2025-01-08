/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
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
  const Astro: any;
  export { Astro };
  const Fragment: any;
  export { Fragment };
  const getStaticPaths: any;
  export { getStaticPaths };
  export default any;
}

declare module 'astro:content' {
  export { z } from 'zod';
  
  export type CollectionEntry<C extends keyof AnyEntryMap> = {
    id: string;
    slug: string;
    body: string;
    collection: C;
    data: any;
    render: () => Promise<{
      Content: import('astro').MarkdownInstance<{}>['Content'];
      headings: import('astro').MarkdownHeading[];
      remarkPluginFrontmatter: Record<string, any>;
    }>;
  };

  export function defineCollection(config: any): any;
  export function getCollection<C extends keyof AnyEntryMap>(
    collection: C,
    filter?: (entry: CollectionEntry<C>) => boolean
  ): Promise<CollectionEntry<C>[]>;

  type AnyEntryMap = {
    [key: string]: CollectionEntry<string>;
  };
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
