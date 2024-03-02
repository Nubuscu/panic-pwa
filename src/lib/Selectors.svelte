<script lang="ts">
	import type { Writable } from 'svelte/store';
	import { archetypes, builds, forms, styles } from './textContent';
	import { HeroType, type Hero } from './types';
	import { currentHero } from './state';

	// let unsubscribe = currentHero.subscribe((val) => {
	// 	console.log(val);
	// });
</script>

<div class="selectors">
	<form>
		<select bind:value={$currentHero.type}>
			{#each Object.keys(HeroType) as type}
				<option>{type}</option>
			{/each}
		</select>
		<div class="archetypes">
			<select bind:value={$currentHero.archetype1}>
				{#each archetypes as arch}
					<option value={arch}>{arch.name}</option>
				{/each}
			</select>
			<select
				bind:value={$currentHero.archetype2}
				disabled={[HeroType.Focused].includes($currentHero.type)}
			>
				{#each archetypes as arch}
					<option value={arch}>{arch.name}</option>
				{/each}
			</select>
			<select
				bind:value={$currentHero.archetype3}
				disabled={[HeroType.Focused, HeroType.Fused].includes($currentHero.type)}
			>
				{#each archetypes as arch}
					<option value={arch}>{arch.name}</option>
				{/each}
			</select>
		</div>
		<div class="builds">
			<select class="build" bind:value={$currentHero.build}>
				{#each builds as build}
					<option value={build}>{build.name}</option>
				{/each}
			</select>
		</div>
		<div class="forms">
			<select class="form1" bind:value={$currentHero.form1}>
				{#each forms as form}
					<option value={form}>{form.name}</option>
				{/each}
			</select>
			<select class="form2" bind:value={$currentHero.form2}>
				{#each forms as form}
					<option value={form}>{form.name}</option>
				{/each}
			</select>
			<select class="form3" bind:value={$currentHero.form3}>
				{#each forms as form}
					<option value={form}>{form.name}</option>
				{/each}
			</select>
		</div>
		<div class="styles">
			<select class="style1" bind:value={$currentHero.style1}>
				{#each styles as style}
					<option value={style}>{style.name}</option>
				{/each}
			</select>
			<select class="style2" bind:value={$currentHero.style2}>
				{#each styles as style}
					<option value={style}>{style.name}</option>
				{/each}
			</select>
			<select class="style3" bind:value={$currentHero.style3}>
				{#each styles as style}
					<option value={style}>{style.name}</option>
				{/each}
			</select>
		</div>
	</form>
</div>
