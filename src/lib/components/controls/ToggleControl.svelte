<script lang="ts">
	let {
		checked = $bindable(),
		label
	}: {
		checked: boolean;
		label: string;
	} = $props();
</script>

<label class="flex cursor-pointer items-center gap-3">
	<div class="relative">
		<input type="checkbox" bind:checked class="peer sr-only" />
		<div
			class="h-5 w-9 rounded-full bg-studio-elevated transition-colors peer-checked:bg-studio-amber"
		></div>
		<div
			class="absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white transition-transform peer-checked:translate-x-4"
		></div>
	</div>
	<span class="text-sm font-medium text-studio-text-secondary">{label}</span>
</label>
