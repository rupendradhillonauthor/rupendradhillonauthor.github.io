import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// const blog = defineCollection({
// 	// Load Markdown and MDX files in the `src/content/blog/` directory.
// 	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
// 	// Type-check frontmatter using a schema
// 	schema: ({ image }) =>
// 		z.object({
// 			title: z.string(),
// 			description: z.string(),
// 			// Transform string to Date object
// 			pubDate: z.coerce.date(),
// 			updatedDate: z.coerce.date().optional(),
// 			heroImage: z.optional(image()),
// 		}),
// });


// 1. First Principles Collection (Physics & Math)
const firstPrinciples = defineCollection({
	loader: glob({ pattern: '**/index.{md,mdx}', base: './src/content/first-principles' }),
	schema: ({ image }) => z.object({
		title: z.string(),
		date: z.coerce.date(), // Matches your real "date" key
		tags: z.array(z.string()).optional(), // Captures your list of tags cleanly
		coverImage: image().optional(), // Matches your real "coverImage" key
		excerpt: z.string().optional(),
	}),
});

// 2. Northern Compass Collection (Geopolitics Essays)
const northernCompass = defineCollection({
	loader: glob({ pattern: '**/index.{md,mdx}', base: './src/content/northern-compass' }),
	schema: ({ image }) => z.object({
		title: z.string(),
		date: z.coerce.date(), // Matches your real "date" key
		tags: z.array(z.string()).optional(), // Captures your list of tags cleanly
		coverImage: image().optional(), // Matches your real "coverImage" key
		excerpt: z.string().optional(),
	}),
});

// 3. Held in Silence Collection (Poetry)
const heldInSilence = defineCollection({
	loader: glob({ pattern: '**/index.{md,mdx}', base: './src/content/held-in-silence' }),
	schema: z.object({
		title: z.string(),
		date: z.coerce.date(),
		tags: z.array(z.string()).optional(),
		coverImage: z.string().optional(),
	}),
});

// export const collections = { blog };

// Export the three true collections to the engine
export const collections = {
	'first-principles': firstPrinciples,
	'northern-compass': northernCompass,
	'held-in-silence': heldInSilence,
};
