import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'medusa_id',
      type: 'text',
      label: 'Medusa Category ID',
      required: true,
      unique: true,
      admin: {
        description: 'The unique identifier from Medusa',
        hidden: true, // Hide this field in the admin UI
      },
      access: {
        update: ({ req }) => !!req.query.is_from_medusa,
      },
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
      admin: {
        description: 'The category title',
      },
    },
    {
      name: 'handle',
      type: 'text',
      label: 'Handle',
      required: true,
      admin: {
        description: 'URL-friendly unique identifier',
      },
      validate: (value: any) => {
        // validate URL-friendly handle
        if (typeof value !== 'string') {
          return 'Handle must be a string'
        }
        if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) {
          return 'Handle must be URL-friendly (lowercase letters, numbers, and hyphens only)'
        }
        return true
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      required: false,
      admin: {
        description: 'Category description',
      },
    },
    {
      name: 'is_active',
      type: 'checkbox',
      label: 'Active',
      defaultValue: true,
      admin: {
        description: 'Whether this category is active and visible',
      },
    },
    {
      name: 'is_internal',
      type: 'checkbox',
      label: 'Internal',
      defaultValue: false,
      admin: {
        description: 'Whether this category is internal (only visible to admins)',
      },
    },
    {
      name: 'rank',
      type: 'number',
      label: 'Rank',
      required: false,
      admin: {
        description: 'The ranking of the category among sibling categories',
      },
      access: {
        update: ({ req }) => !!req.query.is_from_medusa,
      }
    },
    {
      name: 'mpath',
      type: 'text',
      label: 'Materialized Path',
      required: false,
      admin: {
        description: 'Materialized path for efficient hierarchical queries',
        hidden: true, // Hide this field as it's typically auto-generated
      },
      access: {
        update: ({ req }) => !!req.query.is_from_medusa,
      },
    },
    {
      name: 'images',
      type: 'array',
      label: 'Category Images',
      required: false,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
      admin: {
        description: 'Gallery of category images',
      },
    },
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      fields: [
        {
          name: 'meta_title',
          type: 'text',
          label: 'Meta Title',
          required: false,
        },
        {
          name: 'meta_description',
          type: 'textarea',
          label: 'Meta Description',
          required: false,
        },
        {
          name: 'meta_keywords',
          type: 'text',
          label: 'Meta Keywords',
          required: false,
        },
      ],
      admin: {
        description: 'SEO-related fields for better search visibility',
      },
    },
    {
      name: 'metadata',
      type: 'json',
      label: 'Metadata',
      required: false,
      admin: {
        description: 'Custom metadata for the category',
        hidden: true, // Hide this field in the admin UI as it's managed by Medusa
      },
      access: {
        update: ({ req }) => !!req.query.is_from_medusa,
      },
    },
  ],
  access: {
    read: () => true,
    update: () => true,
    create: ({ req }) => !!req.query.is_from_medusa,
    delete: ({ req }) => !!req.query.is_from_medusa,
  },
}
