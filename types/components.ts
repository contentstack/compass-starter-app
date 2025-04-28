import { Dispatch, ReactNode, SetStateAction } from 'react'
import { Asset, CTA, InternalLink, LivePreviewTypeMapper } from './common'
import { ArticleListingPage } from './pages'

// ######################### COMPONENTS #########################

// Hero Component Type
export interface Hero {
  id?: string
  $?: LivePreviewTypeMapper<Hero>;
  heading?: string;
  content?: string;
  cta?: CTA[];
  image?: Image[];
  video?: Video;
  styles?: {
    text_align?: string;
  }
  isABEnabled?: boolean;
  _content_type_uid?: string;
  summary?: string;
  title?: string;
  url?: string;
  cover_image?: Image['image'];
  locale?: string;
  className?: string;
}

// Text (HTML RTE) Component
export interface Text {
  id?: string | number;
  content?: string;
  className?: string;
  $? : LivePreviewTypeMapper<Text>;
}

// Text and Image Carousel Item Type
export interface TextAndImage extends Image {
  id?: string;
  heading?: string;
  styles:{
    theme?:string;
  }
  cta: CTA[];
  content?: string;
  icon?:Image['image'];
  $?: LivePreviewTypeMapper<TextAndImage>;
}

// Text and Image Carousel Component Type
export interface TextAndImageCarousel {
  id?: string;
  carousel_items: TextAndImage[] | [];
  styles: {
    image_position?: string;
  }
  $?: LivePreviewTypeMapper<TextAndImageCarousel>;
}

// Teaser Component Type
export interface Teaser {
  id?: string
  $?: LivePreviewTypeMapper<Teaser>;
  heading?: string;
  content?: string;
  cta?: CTA[];
  image?: Image[];
  video?: Video;
  styles?: {
    text_align?: string;
  }
}

// CardCollection Component Type <-----
export interface CardCollection extends CardCollectionBody {
  header?: CardCollectionHeader;
}

export interface CardCollectionHeader {
  $?: LivePreviewTypeMapper<CardCollectionHeader>;
  id?: string;
  heading?:string
  sub_heading?:string
}

export interface CardCollectionBody {
  id?: string;
  cards?: ImageCardItem[] | [];
  count?: number;
  editKey?: string;
  className?: string;
  $?: LivePreviewTypeMapper<CardCollectionBody>;
}
// CardCollection Component Type ENDS ---->


/* The `ImageCardItem` type is used to represent an item, where each item has an image, text content, and associated
actions (CTA). The `ImageCardItem` type is designed to provide a consistent format for displaying
image cards within components like `CardCollection`. */
export interface ImageCardItem extends Image, ImageCardText{
  id?: string | number;
  key?: string | number;
  count?: number;
  index?: any;
  $?: LivePreviewTypeMapper<ImageCardItem>
};

export interface ImageCardText {
  title?: string;
  subtitle?: string;
  content?: string;
  cta?: CTA;
  url?: string; // when reference is passed as a card
  summary?: string;
  $?: LivePreviewTypeMapper<ImageCardText>
}

// FeaturedArticles Component Type
export interface FeaturedArticles {
  $?: LivePreviewTypeMapper<FeaturedArticles>;
  id?: string;
  articles?: ImageCardItem[] | [];
  heading?: string;
  sub_heading?: string;
}

// ArticleCover Component Type
export type ArticleCover = {
  title?: string;
  cover_image?: Image['image'];
  summary?: string;
  _content_type_uid?: string;
  $?: LivePreviewTypeMapper<ArticleCover>
}

// RelatedLink Component Type <----
export type RelatedLinksComponent = {
  relatedLinks?: ArticleListingPage['entry'][] |[]
  relatedLinksLabel?: RelatedLinks
  $?: {
    taxonomies?: {'data-cslp': string}
    related_links?: { 'data-cslp': string }
    [key: string]: {'data-cslp': string} | undefined
  }
}

export interface RelatedLinks {
  text?: string
  $?: LivePreviewTypeMapper<RelatedLinks>
}
// ---->


// RelatedArticles Component Type <----
export type RelatedArticlesComponent = {
  related_articles?: RelatedArticles
  cards?:  ImageCardItem[] | []
}

export interface RelatedArticles {
  heading?:string
  sub_heading?:string
  number_of_articles?:number
  related_article_tags?:string[]
  $?: LivePreviewTypeMapper<RelatedArticles>
}
// ---->

export interface LinkComponent {
  children?: ReactNode;
  className?: string;
  target?: string | undefined;
  'data-title'?: string;
  url?: string | InternalLink[];
  $?: {
    'data-cslp':string
  }
  isABEnabled?: boolean
}

// Image Component
export interface ImageComponent extends Image {
  className?: string;
  addDataCslp?: boolean;
}

export interface Image {
  id?: string | number;
  image?: Asset;
  cover_image?: Asset
  image_alt_text?: string;
  image_position?: string;
  is_thumbnail?: boolean;
  $? : LivePreviewTypeMapper<Image>;
  alt?: string;
}

// Video Component <----
export interface VideoComponent extends Video {
  className?: string;
  addDataCslp?: boolean;
}

export interface Video {
  id?: string | number;
  video?: Asset;
  video_alt_text?: string;
  $? : LivePreviewTypeMapper<Video>;
}
// ---->

export interface Pagination {
  length: number
  dataPerPage: number
  currentPage: number
  setCurrentPage: Dispatch<SetStateAction<number>>
}

export interface Carousel {
  className?: string,
  children? :string|ReactNode
}