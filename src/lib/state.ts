import { writable } from 'svelte/store';
import { emptyHero } from './types';
import { pushState } from '$app/navigation';

export const currentHero = writable(emptyHero);

// let unsubscibe = currentHero.subscribe((hero) => {
// 	pushState(btoa(JSON.stringify(hero)), hero);
// });
