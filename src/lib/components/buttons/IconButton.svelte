<script lang="ts">
	let {
		active = false,
		disabled = false,
		title,
		onclick = undefined,
		onmousedown = undefined,
		onmouseup = undefined,
		onmouseleave = undefined,
		children
	} = $props();
</script>

<button
	{title}
	{onclick}
	{onmousedown}
	{onmouseup}
	{onmouseleave}
	{disabled}
	class={`flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm font-medium transition-colors
	${disabled ? 'cursor-not-allowed border-transparent text-studio-text-muted opacity-40' : active ? 'cursor-pointer border-studio-amber/50 bg-studio-amber/20 text-studio-amber' : 'cursor-pointer border-transparent text-studio-text-secondary hover:border-studio-border hover:bg-studio-elevated hover:text-studio-text-primary'}`}
>
	{@render children()}
</button>
