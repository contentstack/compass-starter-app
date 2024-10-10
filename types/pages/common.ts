import { ArticleCover, CardCollection, Image, related_links, Teaser, Text, TextAndImage } from '../components'
import { localeItems, MappedPreview, PageEntry } from '../common'

export type SeoProps = {
  title?: string
  url?: string
  seo?: {
    title?: string
    description?: string
    canonical_url?: string
    no_follow: boolean
    no_index: boolean
  }
  summary?: string
  locale?: string
  uid?: string
  contentType?: string
  locales?: localeItems | []
}

export interface pageBlocks {
    teaser?:Teaser
    text_and_image?:TextAndImage
    text?: Text
    card_collection?:CardCollection
    image_preset?: Image
    seo?:SeoProps
    featured_articles?: any;
  }
  
export type pageRenderProps = {
    components:pageBlocks[];
    isABEnabled?:boolean;
  }
export interface Article extends PageEntry,ArticleCover {
  content?:string
  related_links?: related_links
  $?: MappedPreview<Article>
}

export type Taxonomy = {
  taxonomy_uid:string,
  term_uid:string
}