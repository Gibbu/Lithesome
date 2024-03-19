import { defineMDSveXConfig as defineConfig, escapeSvelte } from 'mdsvex';
import slug from 'rehype-slug';
import externalLinks from 'remark-external-links';
import { getHighlighter } from 'shiki';

const config = defineConfig({
	extensions: ['.md'],

	highlight: {
		highlighter: async (code, lang = 'text') => {
			const highlighter = await getHighlighter({
				themes: ['github-dark', 'github-light'],
				langs: ['javascript', 'typescript', 'svelte', 'css', 'text']
			});
			await highlighter.loadLanguage('javascript', 'typescript');
			const html = escapeSvelte(
				highlighter.codeToHtml(code, { lang, themes: { light: 'github-light', dark: 'github-dark' } })
			);
			return `{@html \`${html}\` }`;
		}
	},

	smartypants: {
		dashes: 'oldschool'
	},

	remarkPlugins: [[externalLinks, { target: '_blank', rel: 'noopener noreferrer' }]],
	rehypePlugins: [slug]
});

export default config;
