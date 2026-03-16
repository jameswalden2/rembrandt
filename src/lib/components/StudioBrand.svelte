<script lang="ts">
	import { resolve } from '$app/paths';
	import IconEasel from '$lib/components/icons/IconEasel.svelte';
</script>

<a
	href={resolve('/')}
	class="flex items-center gap-2.5 border-b border-studio-border px-4 py-5 transition-opacity hover:opacity-75"
>
	<IconEasel class="h-5 w-5 text-studio-amber" />
	<p class="font-mono text-[10px] tracking-[0.4em] text-studio-amber uppercase">Rembrandt Studio</p>
</a>
