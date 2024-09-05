import { createHighlighter, type BundledLanguage } from 'shiki/bundle-web.mjs';

const getHighlighter = await createHighlighter({
	langs: ['html', 'svelte', 'js', 'ts', 'css'],
	themes: ['github-dark', 'github-light']
});

export const highlighter = (code: string, lang: BundledLanguage = 'svelte') =>
	getHighlighter.codeToHtml(code, {
		lang,
		themes: { light: 'github-light', dark: 'github-dark' }
	});
