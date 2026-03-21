<script lang="ts">
	import { downloadImage } from '$lib/canvasUtils';
	import IconCrop from '$lib/components/icons/IconCrop.svelte';
	import IconUpload from '$lib/components/icons/IconUpload.svelte';
	import IconDownload from '$lib/components/icons/IconDownload.svelte';
	import IconFullscreen from '$lib/components/icons/IconFullscreen.svelte';
	import IconMinimize from '$lib/components/icons/IconMinimize.svelte';
	import IconCompare from '$lib/components/icons/IconCompare.svelte';
	import ButtonGroup from './buttons/ButtonGroup.svelte';
	import IconButton from './buttons/IconButton.svelte';

	let {
		imageName = $bindable(),
		isCropMode,
		showOriginal = $bindable(),
		isFullscreen,
		canvas,
		onenterCropMode,
		onresetFilters,
		ontoggleFullscreen,
		onfileChange
	}: {
		imageName: string;
		isCropMode: boolean;
		showOriginal: boolean;
		isFullscreen: boolean;
		canvas: HTMLCanvasElement | null;
		onenterCropMode: () => void;
		onresetFilters: () => void;
		ontoggleFullscreen: () => void;
		onfileChange: (e: Event) => void;
	} = $props();

	let isEditingTitle = $state(false);
	let titleInputEl = $state<HTMLInputElement | null>(null);

	$effect(() => {
		if (isEditingTitle && titleInputEl) {
			titleInputEl.focus();
			titleInputEl.select();
		}
	});
</script>

<div class="flex items-center gap-2 border-b border-studio-border bg-studio-panel px-4 py-2">
	<!-- Title (click-to-edit) -->
	{#if isEditingTitle}
		<input
			bind:this={titleInputEl}
			bind:value={imageName}
			onblur={() => (isEditingTitle = false)}
			onkeydown={(e) => {
				if (e.key === 'Enter' || e.key === 'Escape') isEditingTitle = false;
			}}
			class="w-40 rounded-md border border-studio-border bg-studio-elevated px-2 py-1 text-sm text-studio-text-primary outline-none focus:border-studio-amber"
		/>
	{:else}
		<button
			onclick={() => (isEditingTitle = true)}
			title="Click to rename"
			class="max-w-40 truncate rounded-md px-2 py-1 text-sm font-medium text-studio-text-primary hover:bg-studio-elevated"
		>
			{imageName || 'Untitled'}
		</button>
	{/if}

	<!-- Visual divider -->
	<div class="h-6 w-px bg-studio-border" aria-hidden="true"></div>

	<!-- Edit actions -->
	<ButtonGroup>
		<IconButton title="Crop" onclick={onenterCropMode} active={isCropMode}>
			<IconCrop class="h-4 w-4" />
			Crop
		</IconButton>
		<IconButton
			title="Hold to see original"
			onmousedown={() => (showOriginal = true)}
			onmouseup={() => (showOriginal = false)}
			onmouseleave={() => (showOriginal = false)}
			active={showOriginal}
			disabled={isCropMode}
		>
			<IconCompare class="h-4 w-4" />
			Compare <span class="text-muted text-xs">(hold)</span>
		</IconButton>
		<IconButton title="Reset filters" onclick={onresetFilters}>Reset</IconButton>
	</ButtonGroup>

	<!-- Visual divider -->
	<div class="h-6 w-px bg-studio-border" aria-hidden="true"></div>

	<!-- File / View actions -->
	<ButtonGroup>
		<label
			class="flex cursor-pointer items-center gap-2 rounded-md border border-transparent px-3 py-1.5 text-sm font-medium text-studio-text-secondary transition-colors hover:border-studio-border hover:bg-studio-elevated hover:text-studio-text-primary"
		>
			<IconUpload class="h-4 w-4" />
			Replace
			<input type="file" accept="image/*" onchange={onfileChange} class="hidden" />
		</label>
		<IconButton
			title="Download PNG"
			onclick={() => {
				if (canvas) downloadImage(canvas, imageName || 'painting');
			}}
		>
			<IconDownload class="h-4 w-4" />
			Download
		</IconButton>
		<IconButton onclick={ontoggleFullscreen} title="Fullscreen (Esc to exit)">
			{#if isFullscreen}
				<IconMinimize class="h-4 w-4" />
				Exit Fullscreen
			{:else}
				<IconFullscreen class="h-4 w-4" />
				Fullscreen
			{/if}
		</IconButton>
	</ButtonGroup>
</div>
