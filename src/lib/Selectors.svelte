<script lang="ts">
	import { archetypes, builds, forms, styles } from './textContent';
	import { HeroType } from './types';
	import { currentHero } from './state';

	$: availableArchetypes = archetypes.filter(
		(arch) => !$currentHero.selectedArchetypes().includes(arch)
	);
	$: availableForms = forms.filter((form) => !$currentHero.selectedForms().includes(form));
	$: availableStyles = styles.filter(
		(style) =>
			!$currentHero.selectedStyles().includes(style) &&
			$currentHero
				.selectedArchetypes()
				.map((arch) => arch.name)
				.includes(style.parentArchetypeName)
	);
</script>

<div class="selectors">
	<form>
		Name: <input bind:value={$currentHero.name} />
		<br />
		Type:
		<select bind:value={$currentHero.type}>
			{#each Object.keys(HeroType) as type}
				<option>{type}</option>
			{/each}
		</select>
		<div class="archetypes">
			<select bind:value={$currentHero.archetype1}>
				{#each availableArchetypes as arch}
					<option value={arch}>{arch.name}</option>
				{/each}
			</select>
			<select
				bind:value={$currentHero.archetype2}
				disabled={[HeroType.Focused].includes($currentHero.type)}
			>
				{#each availableArchetypes as arch}
					<option value={arch}>{arch.name}</option>
				{/each}
			</select>
			<select
				bind:value={$currentHero.archetype3}
				disabled={[HeroType.Focused, HeroType.Fused].includes($currentHero.type)}
			>
				{#each availableArchetypes as arch}
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
				{#each availableForms as form}
					<option value={form}>{form.name}</option>
				{/each}
			</select>
			<select class="form2" bind:value={$currentHero.form2}>
				{#each availableForms as form}
					<option value={form}>{form.name}</option>
				{/each}
			</select>
			<select class="form3" bind:value={$currentHero.form3}>
				{#each availableForms as form}
					<option value={form}>{form.name}</option>
				{/each}
			</select>
		</div>
		<div class="styles">
			<select class="style1" bind:value={$currentHero.style1}>
				{#each availableStyles as style}
					<option value={style}>{style.name}</option>
				{/each}
			</select>
			<select class="style2" bind:value={$currentHero.style2}>
				{#each availableStyles as style}
					<option value={style}>{style.name}</option>
				{/each}
			</select>
			<select class="style3" bind:value={$currentHero.style3}>
				{#each availableStyles as style}
					<option value={style}>{style.name}</option>
				{/each}
			</select>
		</div>
	</form>
</div>

<style>
</style>
