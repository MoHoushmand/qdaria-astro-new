import rss from "@astrojs/rss";
import { getRelativeLocaleUrl } from "astro:i18n";
import { getCollection, type CollectionEntry } from "astro:content";

// utils
import { defaultLocale } from "@config/siteSettings.json";
import { getTranslatedData } from "@js/translationUtils";

// data
const siteData = getTranslatedData("siteData", defaultLocale);

// utils
import { getAllPosts } from "@js/blogUtils";

// you can switch the RSS locale here to something else if desired
const rssLocale = defaultLocale;

// this is needed for getAuthorName() and getAuthorEmail() below
const authors: CollectionEntry<"authors">[] = await getCollection("authors");

export async function GET(context) {
  const posts = await getAllPosts(rssLocale);

  // TODO: (maybe?) handle multiple authors instead of just putting the first author's data
  return rss({
    // ex. you can use a stylesheet from "public/rss/styles.xsl"
    // stylesheet: "/rss/styles.xsl",
    // `<title>` field in output xml
    title: siteData.title,
    // `<description>` field in output xml
    description: siteData.description,
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#contextsite
    site: context.site,
    // media is needed for blog posts. recommended to add atom support
    xmlns: {
      media: "http://search.yahoo.com/mrss/",
      atom: "http://www.w3.org/2005/Atom",
    },
    // add atom:link to be compatible with atom
    customData: `<atom:link href="${context.site}rss.xml" rel="self" type="application/rss+xml" />`,
    // items (each post)
    items: posts.map((post) => {
      // Generate link
      const link = getRelativeLocaleUrl(rssLocale, `/blog/${post.slug}/`);
      
      // Safely get author info if available
      let authorInfo = "";
      try {
        if (post.data.authors && post.data.authors.length > 0 && post.data.authors[0].slug) {
          const authorSlug = post.data.authors[0].slug;
          authorInfo = `${getAuthorEmail(authorSlug)} (${getAuthorName(authorSlug)})`;
        }
      } catch (e) {
        console.error(`Error getting author for post ${post.slug}:`, e);
      }
      
      // Try to get image info if available
      let mediaContent = "";
      try {
        const imageUrl = getImageUrl(post);
        if (imageUrl) {
          mediaContent = `<media:content medium="image" url="${imageUrl}" />`;
        }
      } catch (e) {
        console.error(`Error creating media content for post ${post.slug}:`, e);
      }
      
      return {
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.pubDate,
        author: authorInfo,
        customData: mediaContent,
        link: link,
      };
    }),
  });
}

// --------------------------------------------------------
// map the post author slug to the author name
const getAuthorName = (authorSlug: string) => {
  let authorName = "unk";
  authors.map((author) => {
    if (author.slug === authorSlug) {
      authorName = author.data.name;
    }
  });

  return authorName;
};

// --------------------------------------------------------
// map the post author slug to the author email
const getAuthorEmail = (authorSlug: string) => {
  let authorEmail = "";
  authors.map((author) => {
    if (author.slug === authorSlug) {
      authorEmail = author.data.email || "";
    }
  });

  return authorEmail;
};

// --------------------------------------------------------
// get image url from frontmatter
const getImageUrl = (post: CollectionEntry<"blog">) => {
  let imageUrl = "";
  let imageUrlEnd = "";

  // Handle different heroImage formats
  if (!post.data.heroImage) {
    return "";
  }

  if (typeof post.data.heroImage === "string") {
    // Direct string path
    imageUrlEnd = post.data.heroImage;
  } else if (post.data.heroImage.src) {
    // Object with src property
    imageUrlEnd = post.data.heroImage.src.toString();
  } else {
    // Unknown format
    return "";
  }

  // in dev mode, url is /@fs/full/path/to/project/public/assets/images/image-name.jpg
  if (imageUrlEnd.startsWith("/@fs")) {
    imageUrl = imageUrlEnd;
  }
  // in deployment, imageUrlEnd is correct. Something like "_astro/img-name.hash.jpg"
  else {
    imageUrl = import.meta.env.SITE + imageUrlEnd;
  }

  return imageUrl;
};