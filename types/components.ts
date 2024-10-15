import { Dispatch, ReactNode, SetStateAction } from 'react'
import { Asset, MappedPreview } from './common'
import { ArticleListingPage } from './pages'

export type Link = {
  title?: string;
  href?: string;
  $?: MappedPreview<Link>;
};

export interface InternalLink {
  $?: MappedPreview<InternalLink>;
  uid?: string;
  _content_type_uid?: string;
  url?: string;
}
export interface pageLink {
  $?: {
    'data-cslp':string
  }
  url?: string | InternalLink[];
}

export type CallToAction = {
  text: string
  icon?: Asset
  internal_link?: InternalLink[]
  external_link?: string
  $?: MappedPreview<CallToAction>
}

// ######################### COMPONENTS #########################
export interface LinkComponent extends pageLink {
  children?: ReactNode;
  className?: string;
  target?: string | undefined;
  'data-title'?:string;
  isABEnabled?: boolean
}

export interface CtaCollection {
  ctas?: Cta[];
}
export type Cta = {
  text?: string;
  external_url?: string;
  link?: InternalLink[];
};

export interface Image {
  id?: string | number;
  image?: Asset;
  cover_image?: Asset
  image_alt_text?: string;
  image_position?: string;
  is_thumbnail?: boolean;
  $? : MappedPreview<Image>;
}
export interface ImageComponent extends Image {
  className?: string;
  addDataCslp?: boolean;
}

export interface Video {
  id?: string | number;
  video?: Asset;
  video_alt_text?: string;
  $? : MappedPreview<Video>;
}

export interface VideoComponent extends Video {
  className?: string;
  addDataCslp?: boolean;
}

export interface Text {
  id?: string | number;
  content?: string;
  styles?: {
    background_color?: string;
  }
  $? : MappedPreview<Text>;
}

export interface TextAndImage extends Image {
  id?: string;
  heading?: string;
  styles:{
    image_position?: string;
    theme?:string;
  }
  cta: Cta[];
  content?: string;
  icon?:Image['image'];
  $?: MappedPreview<TextAndImage>;
}

export interface Teaser {
  id?: string
  $?: MappedPreview<Teaser>;
  heading?: string;
  content?: string;
  cta?: Cta[];
  image?: Image[];
  video?: Video;
  styles?: {
    text_align?: string;
  }
  isABEnabled?: boolean;
}

export interface FeaturedArticles {
  $?: MappedPreview<FeaturedArticles>;
  id?: string;
  articles?: ImageCardItem[] | [];
  heading?: string;
  sub_heading?: string;
}

export interface FeaturedArticlesHeader {
  $?: MappedPreview<FeaturedArticlesHeader>;
  id?: string;
  heading?:string
  sub_heading?:string
}

export type ArticleCardItem = ImageCardGraphics &
  ImageCardText & {
    id?: string | number;
    key?: string | number;
    totalCount?: number;
    $: MappedPreview<ImageCardGraphics & ImageCardText>;
};

export interface CardCollectionHeader {
  $?: MappedPreview<CardCollectionHeader>;
  id?: string;
  heading?:string
  sub_heading?:string
  
}
export interface CardCollection {
  $?: MappedPreview<CardCollection>;
  id?: string;
  cards?: ImageCardItem[] | [];
  header?: CardCollectionHeader;
  totalCount?: number;
}

export type ImageCardItem = ImageCardGraphics &
  ImageCardText & {
    id?: string | number;
    key?: string | number;
    totalCount?: number;
    $: MappedPreview<ImageCardGraphics & ImageCardText>;
};

export interface ImageCardGraphics extends Image {
  count?: number;
}
export interface ImageCardText {
  title?: string;
  subtitle?: string;
  content?: string;
  cta?: Cta;
  url?: Cta | string;
  summary?: string;
  subtitleExists?: boolean
}

export type CardImage = Asset & {
  count?: number;
};

export type ArticleCover = {
  title?: string
  summary?: string
  cover_image?: Image['image']
  $?: MappedPreview<ArticleCover>
}

export type RelatedLinks = {
  relatedLinks?: ArticleListingPage['entry'][] |[]
  relatedLinksLabel?: related_links
  $?: {
    taxonomies?: {'data-cslp': string}
    related_links?: { 'data-cslp': string }
  }
}

export type RelatedArticles = {
  related_articles?: related_articles
  cards?:  ImageCardItem[] | []
}

export interface related_articles {
  heading?:string
  sub_heading?:string
  number_of_articles?:number
  related_article_tags?:string[]
  $?: MappedPreview<related_articles>
}

export interface related_links {
  text?: string
  $?: MappedPreview<related_links>
}

export interface pagination {
  length: number
  dataPerPage: number
  currentPage: number
  setCurrentPage: Dispatch<SetStateAction<number>>
}

export interface Carousel {
  className?: string,
  children? :string|ReactNode
}

// ######################### COMPONENTS END #########################


// ######################### StatusIndicator  #########################
// export interface ComponentValidator {
//   status?: ValidityStatus;
//   validators: boolean[];
//   validationInfo: string[];
//   children?: ReactNode;
// }
// ######################### StatusIndicator END #########################

// export interface HeroLanguageSelector {
//   markets: Market[];
//   backgroundImage?: Asset;
// }