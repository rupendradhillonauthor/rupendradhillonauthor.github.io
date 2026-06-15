// src/pages/rss.xml.js
import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export async function GET(context) {
    // 1. Fetch posts from your distinct blog collections
    // (We use empty arrays as fallbacks in case a collection is currently empty)
    const fpPosts = await getCollection('first-principles').catch(() => []);
    const ncPosts = await getCollection('northern-compass').catch(() => []);
    const hisPosts = await getCollection('held-in-silence').catch(() => []);

    // 2. Combine all posts into a single array and sort them by date (newest first)
    const allPosts = [...fpPosts, ...ncPosts, ...hisPosts].sort(
				(a, b) => new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf() // Updated to .date
		);

    // 3. Generate the RSS XML
    return rss({
				title: SITE_TITLE,
				description: SITE_DESCRIPTION,
				site: context.site,
				items: allPosts.map((post) => ({
						...post.data,
						pubDate: post.data.date, // Map your 'date' to the RSS 'pubDate' requirement
						link: `/${post.collection}/${post.id}/`, // Updated to .id
				})),
		});
}