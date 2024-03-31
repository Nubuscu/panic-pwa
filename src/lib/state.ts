import { writable } from 'svelte/store';
import { Hero } from './types';
function loadFromHref(): Hero {
	try {
		const href = atob(window.location.hash.substring(1));
		return new Hero(JSON.parse(href));
	} catch (error) {
		console.warn(error);
		return new Hero();
	}
}

export const currentHero = writable(loadFromHref());

let unsubscibe = currentHero.subscribe((hero) => {
	if (typeof window !== 'undefined') {
		window.location.href = `#${btoa(JSON.stringify(hero))}`;
	}
});
