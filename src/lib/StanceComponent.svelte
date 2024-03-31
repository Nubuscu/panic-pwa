<script lang="ts">
	import type { Action, ActionLevel, Stance } from './types';

	export let stance: Stance;

	$: defaultStanceName = `${stance.style?.name} ${stance.form?.name}`;
	$: displayName =
		!!stance.name && stance.name !== defaultStanceName
			? `${stance.name} (${defaultStanceName})`
			: defaultStanceName;

	function actionsForStance(s: Stance): Action[] {
		let retVal: Action[] = [];
		s.form?.actions.forEach((formAction) => retVal.push(formAction));
		s.style?.actions.forEach((styleAction) => retVal.push(styleAction));
		return retVal;
	}
	function actionLevelCostString(a: ActionLevel): string {
		if (!!a.diceCost) {
			return `${a.diceCost}+`;
		} else if (!!a.tokenCost) {
			return a.tokenCost
				.map((cost) => `${cost.number} ${cost.tokenType}`)
				.reduce((acc, curr) => acc.concat(curr), '');
		}
		return '';
	}
</script>

<div class="stance">
	<span class="stanceNameLabel">{displayName}</span>
	<div class="header">
		<div class="numbers">
			<span class="diceLabel">
				Dice: {stance.form?.actionDice}
			</span>
			<span class="rangeLabel">
				Range: {stance.style?.minRange} - {stance.style?.maxRange}
			</span>
		</div>
		<span class="stylePassive">
			Style Ability: {stance.style?.ability.description}
		</span>
		<span class="formPassive">
			Form Ability: {stance.form?.ability.description}
		</span>
	</div>
	<div class="actions">
		{#each actionsForStance(stance) as action}
			<span class="actionNameLabel">{action.name}</span>
			{#each action.levels as level}
				<div class="actionLevel">
					<div class="action-cost">
						<strong>{actionLevelCostString(level)}</strong>
					</div>
					<div class="action-description">
						{level.description}
					</div>
				</div>
			{/each}
		{/each}
	</div>
</div>

<style>
	.stance {
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		width: 33%;
		border: 2px;
		margin: 2px;
		border-color: black;
		border-style: solid;
	}
	.header {
		display: flex;
		flex-direction: column;
	}
	.numbers {
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
	}
	.diceLabel,
	.formPassive {
		width: 100%;
		background-color: var(--formLight);
	}
	.rangeLabel,
	.stylePassive {
		width: 100%;
		background-color: var(--styleLight);
	}

	.actions {
		display: flex;
		flex-direction: column;
		background-color: var(--actionDark);
	}
	.actionLevel {
		background-color: var(--actionLight);
		display: flex;
		flex-direction: row;
	}
</style>
