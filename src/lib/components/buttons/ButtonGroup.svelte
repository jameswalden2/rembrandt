<script lang="ts">
	let { children, vertical = false } = $props();
</script>

<div
	class={`inline-flex ${vertical ? 'flex-col' : 'flex-row'} gap-1 rounded-lg border border-studio-border bg-studio-elevated p-1`}
>
	{@render children()}
</div>
