<script lang="ts">
	let {
		label,
		value = $bindable(),
		min = 0,
		max = 100,
		sidebar = false
	}: {
		label: string;
		value: number;
		min?: number;
		max?: number;
		sidebar?: boolean;
	} = $props();
</script>

{#if sidebar}
	<label class="flex flex-col gap-1.5">
		<span class="text-xs font-medium text-studio-text-muted">
			{label} <span class="opacity-70">({value})</span>
		</span>
		<input type="range" {min} {max} bind:value class="w-full accent-studio-amber" />
	</label>
{:else}
	<div class="rounded-xl border border-studio-border bg-studio-panel p-4">
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
			<label class="flex flex-col gap-1.5">
				<span class="text-xs font-medium text-studio-text-muted">
					{label} <span class="opacity-70">({value})</span>
				</span>
				<input type="range" {min} {max} bind:value class="accent-studio-amber" />
			</label>
		</div>
	</div>
{/if}
