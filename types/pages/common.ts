import { CardCollection, FeaturedArticles, Hero, Image, RelatedArticles, RelatedLinks, Teaser, Text, TextAndImageCarousel } from '../components'
import { LivePreviewTypeMapper, localeItems, PageEntry } from '../common'

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
  text_and_image_carousel?:TextAndImageCarousel
  text?: Text
  card_collection?:CardCollection
  image_preset?: Image
  seo?:SeoProps
}
  
export type pageRenderProps = {
  components: pageBlocks[];
  isABEnabled?: boolean;
  [key: string]: string | boolean | pageBlocks[] | FeaturedArticles | Hero | LivePreviewTypeMapper<pageRenderProps> | undefined;
  $?: LivePreviewTypeMapper<pageRenderProps>;
  featured_articles?: FeaturedArticles;
  hero?: Hero;
} 

// Article Type <-----
export interface Article extends PageEntry {
  summary?:string
  cover_image?:Image['image']
  content?:string
  show_related_articles?: boolean
  show_related_links?: boolean
  related_links?: RelatedLinks
  related_articles?: RelatedArticles
  $?: LivePreviewTypeMapper<Article>
}
// ----->

export type Taxonomy = {
  taxonomy_uid:string,
  term_uid:string
}