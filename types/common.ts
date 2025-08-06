import { EntryEmbedable } from '@contentstack/utils'
import { Taxonomy } from './pages/common'


/**
 * LivePreviewTypeMapper<T> is a generic type that transforms each property of a given type `T` 
 * into an object containing a `data-cslp` property of type `string`.
 *
 * This type mapping ensures that every key in `T` is retained, but its value is replaced 
 * with an object structured as `{ data-cslp: string }`.
 *
 * @template T - The original type whose properties will be transformed.
 */
export type LivePreviewTypeMapper<T> = {
  [K in keyof T]: { 'data-cslp': string }
}
// live preview mode type
export type LivePreviewMode = 'builder' | 'preview' | undefined;


/* The `CommonSystemInfo` interface defines the common system information of Contentstack's Entry and Asset */
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
  updated_at?: Date
  updated_by?: string
}

// Contentstack Entry Type
export type Entry = CommonSystemInfo & {
  $?: LivePreviewTypeMapper<Entry & CommonSystemInfo>
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
  _version?: number
}

// Contentstack Asset Type
export type Asset = CommonSystemInfo & {
  $?: LivePreviewTypeMapper<CommonSystemInfo & Asset>
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

// Represents a page entry that extends EmbedEntry with additional properties
export type PageEntry = EmbedEntry & {
  url: string
  taxonomies: Taxonomy[]
}
export interface EmbedEntry extends Entry, EntryEmbedable {
  embedableArray?: EntryEmbedable[]
}

// Locales Type <----
export type Locale = {
  code: string;
  fallback_locale: string | null;
  name: string;
}

export type localeItems = Locale[]
// ---->

// PersonalizeConfig Type <----
export type PersonalizeConfig = Entry & {
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
// ---->

export interface InternalLink {
  $?: LivePreviewTypeMapper<InternalLink>;
  uid?: string;
  _content_type_uid?: string;
  url?: string;
}

export interface ExternalLink {
  $?: LivePreviewTypeMapper<ExternalLink>;
  title?: string
  href?:string
}

export type CTA = {
  $?: LivePreviewTypeMapper<CTA>;
  text?: string;
  external_url?: string;
  link?: InternalLink[];
};

export type UserFormModal = {
    $?: LivePreviewTypeMapper<UserFormModal>;
    icon?: Asset;
    heading?: string;
    form?: UserForm;
    display_button?: boolean;
    cookies_consent?: {
        $?: LivePreviewTypeMapper<UserFormModal['cookies_consent']>;
        icon?: Asset;
        heading?: string;
        message?: string;
    }
}

export type UserForm = {
    $?: LivePreviewTypeMapper<UserForm>;
    fields?: FormField[];
    user_consent_text?: string;
    submit: {
        $?: LivePreviewTypeMapper<UserForm['submit']>;
        submit_button_text?: string;
        submitting_button_text?: string;
        submitted_heading?: string;
        submitted_message?: string;
    };
}

export type FormField = {
    $?: LivePreviewTypeMapper<FormField>;
    label?: string;
    name?: string;
    type?: string;
    placeholder?: string;
    required?: boolean;
    pattern?: string;
    message?: string;
}
export type ConsentAction = {
        label: string
        action: string
        $?: LivePreviewTypeMapper<ConsentAction>
}

export type ConsentFormProps = {
    heading?: string
    content?: string
    consent_actions?: ConsentAction[]
    icon?: Asset
    $?: LivePreviewTypeMapper<ConsentFormProps> & {
        consent_modal?: {[key:string]: string}
    }
}
