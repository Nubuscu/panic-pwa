<script lang="ts">
	import Selectors from '$lib/Selectors.svelte';
	import StanceComponent from '$lib/StanceComponent.svelte';
	import { currentHero } from '$lib/state';
	import { archetypes, builds, forms, styles } from '$lib/textContent';
	import {
		type Hero,
		HeroType,
		type Stance,
		type Action,
		type Form,
		type Style,
		emptyHero
	} from '$lib/types';
	import { derived, writable } from 'svelte/store';

	let stances: Stance[];
	$: stances = [
		{
			form: $currentHero.form1,
			style: $currentHero.style1
		},
		{
			form: $currentHero.form2,
			style: $currentHero.style2
		},

		{
			form: $currentHero.form3,
			style: $currentHero.style3
		}
	];
</script>

<div class="page-container">
	<div class="header">
		<Selectors />
		<div class="archetypes">
			{#if $currentHero.type === HeroType.Focused}
				<div class="archetype">
					<span class="archetypeNameLabel">{$currentHero.archetype1?.name}</span>
					{$currentHero.archetype1?.focusedAbility.description}
				</div>
			{:else if $currentHero.type === HeroType.Fused}
				<div class="archetype">
					<span class="archetypeNameLabel">{$currentHero.archetype1?.name}</span>
					{$currentHero.archetype1?.fusedAbility.description}
				</div>
				<div class="archetype">
					<span class="archetypeNameLabel">{$currentHero.archetype2?.name}</span>
					{$currentHero.archetype2?.fusedAbility.description}
				</div>
			{:else}
				<div class="archetype">
					<span class="archetypeNameLabel">{$currentHero.archetype1?.name}</span>
					{$currentHero.archetype1?.franticAbility.description}
				</div>
				<div class="archetype">
					<span class="archetypeNameLabel">{$currentHero.archetype2?.name}</span>
					{$currentHero.archetype2?.franticAbility.description}
				</div>
				<div class="archetype">
					<span class="archetypeNameLabel">{$currentHero.archetype3?.name}</span>
					{$currentHero.archetype3?.franticAbility.description}
				</div>
			{/if}
		</div>
		<div class="build">
			<span class="buildNameLabel">{$currentHero.build?.name}</span>
			{$currentHero.build?.description}
		</div>
	</div>
	<div class="stances">
		{#if $currentHero.type !== HeroType.Frantic}
			{#each stances as stance}
				<StanceComponent {stance} />
			{/each}
		{/if}
	</div>
</div>

<style>
	.page-container {
		display: flex;
		flex-direction: column;
	}
	.header {
		order: -1;
		align-self: center;
		display: flex;
	}
	.build {
		display: flex;
		flex-direction: column;
		background-color: var(--archetypeLight);
	}
	.buildNameLabel {
		background-color: var(--archetypeDark);
	}
	.archetype {
		display: flex;
		flex-direction: column;
		background-color: var(--archetypeLight);
	}
	.archetypeNameLabel {
		background-color: var(--archetypeDark);
	}
	.stances {
		order: 0;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
</style>
