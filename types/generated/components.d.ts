import type { Schema, Attribute } from '@strapi/strapi';

export interface SectionActivity extends Schema.Component {
  collectionName: 'components_section_activities';
  info: {
    displayName: 'Activity';
    icon: 'chartBubble';
    description: '';
  };
  attributes: {
    thumbnail: Attribute.Media & Attribute.Required;
    date: Attribute.DateTime;
    title: Attribute.String;
    hyperlink: Attribute.String;
  };
}

export interface SectionFaq extends Schema.Component {
  collectionName: 'components_section_faqs';
  info: {
    displayName: 'faq';
  };
  attributes: {
    question: Attribute.String & Attribute.Required;
    answer: Attribute.Text & Attribute.Required;
  };
}

export interface SectionImage extends Schema.Component {
  collectionName: 'components_section_images';
  info: {
    displayName: 'Image';
  };
  attributes: {
    image: Attribute.Media & Attribute.Required;
    hyperlink: Attribute.String;
  };
}

export interface SectionListText extends Schema.Component {
  collectionName: 'components_section_list_texts';
  info: {
    displayName: 'listText';
  };
  attributes: {
    title: Attribute.String;
  };
}

export interface SectionLogo extends Schema.Component {
  collectionName: 'components_section_logos';
  info: {
    displayName: 'Logo';
    description: '';
  };
  attributes: {
    logo: Attribute.Media & Attribute.Required;
    hyperlink: Attribute.String;
    brandName: Attribute.String;
  };
}

export interface SectionPartner extends Schema.Component {
  collectionName: 'components_section_partners';
  info: {
    displayName: 'Partner';
    icon: 'briefcase';
  };
  attributes: {
    logo: Attribute.Media & Attribute.Required;
    hyperlink: Attribute.String;
    name: Attribute.String;
  };
}

export interface SectionPerson extends Schema.Component {
  collectionName: 'components_section_people';
  info: {
    displayName: 'Person';
    icon: 'user';
  };
  attributes: {
    avatar: Attribute.Media & Attribute.Required;
    name: Attribute.String & Attribute.Required;
    introduction: Attribute.Text;
  };
}

export interface SectionSection extends Schema.Component {
  collectionName: 'components_section_sections';
  info: {
    displayName: 'Section';
    icon: 'file';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    photo: Attribute.Media;
    hyperlink: Attribute.String;
    description: Attribute.Text;
  };
}

export interface SectionSinglePage extends Schema.Component {
  collectionName: 'components_section_single_pages';
  info: {
    displayName: 'Single Page';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    content: Attribute.RichText;
  };
}

export interface SharedMetaSocial extends Schema.Component {
  collectionName: 'components_shared_meta_socials';
  info: {
    displayName: 'metaSocial';
    icon: 'project-diagram';
  };
  attributes: {
    socialNetwork: Attribute.Enumeration<['Facebook', 'Twitter']> &
      Attribute.Required;
    title: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    description: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 65;
      }>;
    image: Attribute.Media;
  };
}

export interface SharedSeo extends Schema.Component {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'seo';
    icon: 'search';
  };
  attributes: {
    metaTitle: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    metaDescription: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 50;
        maxLength: 160;
      }>;
    metaImage: Attribute.Media;
    metaSocial: Attribute.Component<'shared.meta-social', true>;
    keywords: Attribute.Text;
    metaRobots: Attribute.String;
    structuredData: Attribute.JSON;
    metaViewport: Attribute.String;
    canonicalURL: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'section.activity': SectionActivity;
      'section.faq': SectionFaq;
      'section.image': SectionImage;
      'section.list-text': SectionListText;
      'section.logo': SectionLogo;
      'section.partner': SectionPartner;
      'section.person': SectionPerson;
      'section.section': SectionSection;
      'section.single-page': SectionSinglePage;
      'shared.meta-social': SharedMetaSocial;
      'shared.seo': SharedSeo;
    }
  }
}
