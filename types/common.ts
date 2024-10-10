import { EntryEmbedable } from '@contentstack/utils'
import { related_articles, related_links } from './components'
import { Taxonomy } from './pages/common'

export type MappedPreview<T> = {
  [K in keyof T]: { 'data-cslp': string }
}

export interface CommonSystemInfo {
  ACL?: {
    roles: [],
    others: {
      read: false,
      create: false,
      update: false,
      delete: false,
      sub_acl: {
        read: false,
        create: false,
        update: false,
        delete: false,
        publish: false
      }
    }
  }
  created_at?: string
  created_by?: string
  publish_details?: {
    environment: string
    locale: string
    time: Date
    user: string
  }
  tags?: string[]
  title?: string
  uid:string
  show_related_links?: boolean
  region?:string[]
  topics?:string[]
  show_related_articles?: boolean
  related_articles?: related_articles
  related_links?: related_links
  updated_at?: Date
  updated_by?: string
}

export type PageEntry = EmbedEntry & {
  // $?: MappedPreview<PageEntry>
  url: string
  taxonomies: Taxonomy[]
}

export interface EmbedEntry extends Entry, EntryEmbedable {
  embedableArray?: EntryEmbedable[]
}

export type Entry = CommonSystemInfo & {
  $?: MappedPreview<Entry & CommonSystemInfo>
  locale?: string
  _in_progress?: boolean
  _owner?: {
    active: boolean
    authy_id?: string
    company: string
    country_code: string
    created_at: Date
    email: string
    failed_attempts: number
    first_name: string
    last_login_at: Date
    last_name: string
    // metadata: {}
    mobile_number: string
    org_uid: string[]
    profile_type: string
    settings: {
      global: any[]
      preferences: any
    },
    shared_org_uid: string[]
    tfa_status: string
    updated_at: string
    username: string
  }
  featured_articles?: any;
  _version?: number
}

export type Asset = CommonSystemInfo & {
  $?: MappedPreview<CommonSystemInfo & Asset>
  content_type?: string
  dimension?: {
    height: number
    width: number
  }
  file_size?: string
  filename?: string
  is_dir?: boolean,
  url: string
  _version?: number
}

export type Locale = {
  code: string;
  fallback_locale: string | null;
  name: string;
}

export type localeItems = Locale[]

export type PersonalizeConfig = EmbedEntry & {
  audiences: Audiences
  taxonomy_path: string
}

export type Audiences = {
  group?: Group[]
}

export type Group = {
  name?: string
  attributes?: Attributes[]
}

export type Attributes = {
  key?: string
  value?: string
}
