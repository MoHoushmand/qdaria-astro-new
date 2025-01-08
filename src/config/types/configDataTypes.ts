// site data types
export interface SiteDataProps {
  name: String;
  title: string;
  description: string;
  contact: {
    // used for contact page and footer
    address1: string; // contact address (line 1)
    address2: string; // contact address (line 2)
    phone: string; // contact phone number
    email: string; // contact email address
  };
  author: {
    // used for blog post purposes
    name: string;
    email: string;
    twitter: string; // used for twitter cards when sharing a blog post on twitter
  };
  defaultImage: {
    src: string;
    alt: string;
  };
}

// --------------------------------------------------------
// nav data types
export interface BaseNavItem {
  text: string;
  description?: string;
}

export interface navLinkItem extends BaseNavItem {
  link: string;
  newTab?: boolean;
  icon?: string;
}

export interface navDropdownItem extends BaseNavItem {
  link?: string;
  dropdown: (navLinkItem | navDropdownItem)[];
}

export type navItem = navLinkItem | navDropdownItem;

export function isNavDropdownItem(item: navItem): item is navDropdownItem {
  return 'dropdown' in item;
}

// --------------------------------------------------------
// faq data types
export interface FaqItem {
  question: string; // this is the question of the accordion
  answer: string; // these are the details seen after expanding the accordion
}

// --------------------------------------------------------
// testimonial data types
export interface TestimonialItem {
  avatar: ImageMetadata; // an imported image
  name: string;
  title: string;
  testimonial: string;
}

// --------------------------------------------------------
// team data types
export interface teamMember {
  image: ImageMetadata; // an imported image
  name: string;
  title: string;
  bio: string;
}

// --------------------------------------------------------
// site settings types
export interface SiteSettingsProps {
  useViewTransitions?: boolean;
  useAnimations?: boolean;
}
