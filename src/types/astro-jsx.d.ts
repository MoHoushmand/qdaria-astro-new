/// <reference types="astro/astro-jsx" />

declare module 'astro/jsx-runtime' {
  export namespace JSX {
    type Element = any;
    interface ElementClass {
      render?: any;
    }
    interface ElementAttributesProperty {
      props: any;
    }
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }

  export function jsx(type: any, props: any, key?: string): any;
  export function jsxs(type: any, props: any, key?: string): any;
  export function jsxDEV(type: any, props: any, key?: string, isStaticChildren?: boolean, source?: any, self?: any): any;
}

declare module 'astro' {
  export * from 'astro/types';
}

declare module '*.astro' {
  const component: (props: any) => any;
  export default component;
}
