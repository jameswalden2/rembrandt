<script lang="ts">
	import { shiftHSL } from '$lib/canvasUtils';
	import ColourSwatch from './ColourSwatch.svelte';

	interface LightShift {
		targetHue: number;
		hueStrength: number;
		lightnessShift: number;
		saturationShift: number;
	}
	interface LightProfile {
		name: string;
		highlight: LightShift;
		shadow: LightShift;
	}
	type LightProfileKey = 'morning' | 'golden' | 'overcast';

	const LIGHT_PROFILES: Record<LightProfileKey, LightProfile> = {
		morning: {
			name: 'Morning',
			highlight: {
				targetHue: 30,
				hueStrength: 0.05,
				lightnessShift: +0.18,
				saturationShift: +0.05
			},
			shadow: { targetHue: 210, hueStrength: 0.01, lightnessShift: -0.22, saturationShift: -0.1 }
		},
		golden: {
			name: 'Golden',
			highlight: { targetHue: 5, hueStrength: 0.1, lightnessShift: +0.15, saturationShift: +0.1 },
			shadow: { targetHue: 30, hueStrength: 0.8, lightnessShift: -0.28, saturationShift: +0.05 }
		},
		overcast: {
			name: 'Overcast',
			highlight: { targetHue: 200, hueStrength: 0, lightnessShift: +0.2, saturationShift: -0.1 },
			shadow: { targetHue: 210, hueStrength: 0, lightnessShift: -0.25, saturationShift: -0.2 }
		}
	};

	const PROFILE_KEYS: LightProfileKey[] = ['morning', 'golden', 'overcast'];

	let activeKey: LightProfileKey = $state('morning');

	let {
		pickedColour = $bindable()
	}: {
		pickedColour: { hex: string; r: number; g: number; b: number } | null;
	} = $props();

	const activeProfile = $derived(LIGHT_PROFILES[activeKey]);

	const highlightColour = $derived(
		pickedColour
			? shiftHSL(
					pickedColour.r,
					pickedColour.g,
					pickedColour.b,
					activeProfile.highlight.targetHue,
					activeProfile.highlight.hueStrength,
					activeProfile.highlight.lightnessShift,
					activeProfile.highlight.saturationShift
				)
			: undefined
	);

	const shadeColour = $derived(
		pickedColour
			? shiftHSL(
					pickedColour.r,
					pickedColour.g,
					pickedColour.b,
					activeProfile.shadow.targetHue,
					activeProfile.shadow.hueStrength,
					activeProfile.shadow.lightnessShift,
					activeProfile.shadow.saturationShift
				)
			: undefined
	);
</script>

<div class="flex flex-col gap-2 p-3">
	<span class="text-[10px] font-medium tracking-widest text-studio-text-muted uppercase">
		Light and Shade
	</span>
	<div class="flex rounded border border-studio-border text-xs font-medium">
		{#each PROFILE_KEYS as key, i (key)}
			<button
				class="flex-1 px-2 py-1 transition-colors
					{i === 0 ? 'rounded-l' : ''}
					{i === PROFILE_KEYS.length - 1 ? 'rounded-r' : ''}
					{activeKey === key
					? 'bg-studio-accent text-white'
					: 'text-studio-text-muted hover:text-studio-text-secondary'}"
				onclick={() => (activeKey = key)}
			>
				{LIGHT_PROFILES[key].name}
			</button>
		{/each}
	</div>
	<div class="flex items-center gap-2">
		<ColourSwatch colour={highlightColour} size="lg" />
		<ColourSwatch colour={pickedColour ?? undefined} size="lg" />
		<ColourSwatch colour={shadeColour} size="lg" />
	</div>
</div>
