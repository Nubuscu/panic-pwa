import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit'

export default defineConfig({
	plugins: [sveltekit(), SvelteKitPWA({
		srcDir: './src',
		mode: 'development',
		manifest: {
			short_name: 'Panic PWA',
			name: "Panic at the Dojo PWA",
			start_url: "/",
			scope: "/",
			display: "standalone",
			theme_color: "#ffffff",
			background_color: "#ffffff",
			icons: [
				{
					src: '/pwa-192x192.png',
					sizes: '192x192',
					type: 'image/png',
				},
				{
					src: '/pwa-512x512.png',
					sizes: '512x512',
					type: 'image/png',
				},
				{
					src: '/pwa-512x512.png',
					sizes: '512x512',
					type: 'image/png',
					purpose: 'any maskable',
				},
			],
		},
		injectManifest: {
			globPatterns: ['client/**/*.{js,css,ico,png,svg,webp,woff,woff2}']
		},
		workbox: {
			globPatterns: ['client/**/*.{js,css,ico,png,svg,webp,woff,woff2}']
		},
		devOptions: {
			enabled: true,
			suppressWarnings: process.env.SUPPRESS_WARNING === 'true',
			type: 'module',
			navigateFallback: '/',
		},
		// if you have shared info in svelte config file put in a separate module and use it also here
		kit: {
			includeVersionFile: true,
		}
	})]
});
