interface Heading {
  depth: number;
  slug: string;
  text: string;
}

export function getTableOfContents(content: string): Heading[] {
  const headingRegex = /^#{1,6}\s+(.+)$/gm;
  const headings: Heading[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const text = match[1];
    const depth = match[0].split('#').length - 1;
    const slug = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    headings.push({ depth, slug, text });
  }

  return headings;
}
