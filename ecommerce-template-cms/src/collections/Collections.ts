import type { CollectionConfig } from 'payload'

export const Collections: CollectionConfig = {
  slug: 'collections',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'medusa_id',
      type: 'text',
      label: 'Medusa Collection ID',
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
        description: 'The collection title',
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
        description: 'Collection description',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Whether this collection is featured',
      },
      validate: async (value: any, { req, data }) => {
        if (value) {
          // Check if there's already a featured collection
          const existingFeatured = await req.payload.find({
            collection: 'collections',
            where: {
              featured: {
                equals: true,
              },
            },
            limit: 1,
          })
          
          // If there's already a featured collection, prevent setting another one as featured
          if (existingFeatured.docs.length > 0) {
            const currentFeatured = existingFeatured.docs[0]
            if (currentFeatured.id === (data as any).id) {
              return true
            }

            return `Only one collection can be featured at a time. The current featured collection is ${currentFeatured.title}`
          }
        }

        return true
      },
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media' as any,
      label: 'Thumbnail',
      required: false,
      admin: {
        description: 'Collection thumbnail image',
      },
    },
    {
      name: 'images',
      type: 'array',
      label: 'Collection Images',
      required: false,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media' as any,
          required: true,
        },
      ],
      admin: {
        description: 'Gallery of collection images',
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
        description: 'Custom metadata for the collection',
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
