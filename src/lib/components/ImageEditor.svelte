<script lang="ts">
	import { applyGrayscale, ARTIST_WEIGHTS, STANDARD_WEIGHTS } from '$lib/imageProcessing/grayscale';
	import { applyGrid } from '$lib/imageProcessing/grid';
	import {
		applyRuleOfThirds,
		applyGoldenRatio,
		applyGoldenSpiral,
		applyDiagonalLines
	} from '$lib/imageProcessing/composition';
	import { applyReduceColours } from '$lib/imageProcessing/reduceColours';
	import { applyNotan } from '$lib/imageProcessing/notan';
	import { applySobel } from '$lib/imageProcessing/sobel';
	import { applyGaussianBlur } from '$lib/imageProcessing/gaussianBlur';
	import { applyTemperatureMap } from '$lib/imageProcessing/temperatureMap';
	import {
		extractDominantColours,
		type DominantColour
	} from '$lib/imageProcessing/dominantColours';
	import { computeCropRect, drawCropOverlay } from '$lib/imageProcessing/crop';
	import { getCanvasPos, downloadImage, rgbToHex } from '$lib/canvasUtils';
	import IconCrop from '$lib/components/icons/IconCrop.svelte';
	import IconUpload from '$lib/components/icons/IconUpload.svelte';
	import IconDownload from '$lib/components/icons/IconDownload.svelte';
	import IconFullscreen from '$lib/components/icons/IconFullscreen.svelte';
	import IconMinimize from '$lib/components/icons/IconMinimize.svelte';
	import IconPaintbrush from '$lib/components/icons/IconPaintbrush.svelte';
	import IconCompare from '$lib/components/icons/IconCompare.svelte';
	import CanvasControls from './controls/CanvasControls.svelte';
	import RangeControl from './controls/RangeControl.svelte';
	import ToggleControl from './controls/ToggleControl.svelte';
	import ButtonGroup from './buttons/ButtonGroup.svelte';
	import IconButton from './buttons/IconButton.svelte';
	import { onMount } from 'svelte';
	import ColourAside from './colours/ColourAside.svelte';

	let originalImage = $state<HTMLImageElement | null>();
	let viewMode = $state<
		| 'normal'
		| 'grayscale'
		| 'artistGrayscale'
		| 'lowPoly'
		| 'reduceColours'
		| 'grayscaleReduceColours'
		| 'notan'
		| 'sobel'
		| 'gaussianBlur'
		| 'temperatureMap'
	>('normal');
	let grayscaleShades = $state(5);
	let notanThreshold = $state(128);
	let sobelThreshold = $state(30);
	let sobelInvert = $state(false);
	let sobelBlurRadius = $state(0);
	let blurRadius = $state(10);
	let canvas = $state<HTMLCanvasElement | null>(null);
	let isDragging = $state(false);
	let showGrid = $state(false);
	let flipHorizontal = $state(false);
	let grid = $state({ rows: 4, cols: 4, color: '#ffffff', thickness: 1 });
	let showRuleOfThirds = $state(false);
	let showGoldenRatio = $state(false);
	let showGoldenSpiral = $state(false);
	let showDiagonalLines = $state(false);
	let composition = $state({ color: '#ffffff', thickness: 1 });
	let colourCount = $state(8);
	let isFullscreen = $state(false);
	let canvasContainer = $state<HTMLDivElement | null>(null);
	let dominantColours = $state<DominantColour[]>([]);
	let pickedColour = $state<{ hex: string; r: number; g: number; b: number } | null>(null);

	// Crop state
	let isCropMode = $state(false);
	let cropRatioKey = $state('original');
	let cropX = $state(0);
	let cropY = $state(0);
	let cropW = $state(0);
	let cropH = $state(0);
	let appliedCrop = $state<{ x: number; y: number; w: number; h: number } | null>(null);
	let cropDragStart = $state<{ mx: number; my: number; cx: number; cy: number } | null>(null);
	const isCropDragging = $derived(cropDragStart !== null);

	// Compare state
	let showOriginal = $state(false);

	const defaultSrc = '/den_gamle_by_painting_ref.jpg';
	onMount(() => {
		const img = new Image();
		img.src = defaultSrc;
		img.onload = () => {
			originalImage = img;
			console.log('Default image loaded', img.naturalWidth, img.naturalHeight);
		};
	});

	const cropRatios: { value: string; label: string }[] = [
		{ value: 'original', label: 'Original' },
		{ value: '1:1', label: '1:1' },
		{ value: '2:3', label: '2:3' },
		{ value: '3:2', label: '3:2' },
		{ value: '4:5', label: '4:5' },
		{ value: '5:4', label: '5:4' },
		{ value: '4:3', label: '4:3' },
		{ value: '3:4', label: '3:4' },
		{ value: '16:9', label: '16:9' },
		{ value: '9:16', label: '9:16' }
	];

	function setCropRect(rect: { x: number; y: number; w: number; h: number }) {
		cropX = rect.x;
		cropY = rect.y;
		cropW = rect.w;
		cropH = rect.h;
	}

	function enterCropMode() {
		if (!originalImage) return;
		isCropMode = true;
		showOriginal = false;
		const imgW = originalImage.naturalWidth;
		const imgH = originalImage.naturalHeight;
		const base = appliedCrop ?? { x: 0, y: 0, w: imgW, h: imgH };
		const centerX = base.x + base.w / 2;
		const centerY = base.y + base.h / 2;
		setCropRect(computeCropRect(imgW, imgH, cropRatioKey, centerX, centerY));
	}

	function updateCropForRatio(key: string) {
		if (!originalImage) return;
		cropRatioKey = key;
		const imgW = originalImage.naturalWidth;
		const imgH = originalImage.naturalHeight;
		const centerX = cropX + cropW / 2;
		const centerY = cropY + cropH / 2;
		setCropRect(computeCropRect(imgW, imgH, key, centerX, centerY));
	}

	function applyCrop() {
		appliedCrop = { x: cropX, y: cropY, w: cropW, h: cropH };
		isCropMode = false;
	}

	function revertCrop() {
		appliedCrop = null;
		cropRatioKey = 'original';
		isCropMode = false;
	}

	function onCropMouseDown(e: MouseEvent) {
		e.preventDefault();
		const pos = getCanvasPos(e, canvas!);
		cropDragStart = { mx: pos.x, my: pos.y, cx: cropX, cy: cropY };
	}

	function onCropMouseMove(e: MouseEvent) {
		if (!cropDragStart || !originalImage) return;
		const pos = getCanvasPos(e, canvas!);
		const dx = pos.x - cropDragStart.mx;
		const dy = pos.y - cropDragStart.my;
		const imgW = originalImage.naturalWidth;
		const imgH = originalImage.naturalHeight;
		cropX = Math.max(0, Math.min(imgW - cropW, Math.round(cropDragStart.cx + dx)));
		cropY = Math.max(0, Math.min(imgH - cropH, Math.round(cropDragStart.cy + dy)));
	}

	function onCropMouseUp() {
		cropDragStart = null;
	}

	function onCanvasClick(e: MouseEvent) {
		if (isCropMode || !canvas) return;
		const pos = getCanvasPos(e, canvas);
		const ctx = canvas.getContext('2d', { willReadFrequently: true });
		if (!ctx) return;
		const [r, g, b] = ctx.getImageData(Math.floor(pos.x), Math.floor(pos.y), 1, 1).data;
		pickedColour = { hex: rgbToHex(r, g, b), r, g, b };
	}

	function onCanvasMouseDown(e: MouseEvent) {
		if (isCropMode) return onCropMouseDown(e);
	}

	function onCanvasMouseMove(e: MouseEvent) {
		if (isCropMode) return onCropMouseMove(e);
	}

	function onCanvasMouseUp() {
		if (isCropMode) return onCropMouseUp();
	}

	function applyViewModeFilters(ctx: CanvasRenderingContext2D) {
		if (viewMode === 'grayscale') {
			applyGrayscale(ctx);
		} else if (viewMode === 'artistGrayscale') {
			applyGrayscale(ctx, ARTIST_WEIGHTS);
		} else if (viewMode === 'reduceColours') {
			applyReduceColours(ctx, colourCount);
		} else if (viewMode === 'grayscaleReduceColours') {
			applyGrayscale(ctx, STANDARD_WEIGHTS, grayscaleShades);
		} else if (viewMode === 'notan') {
			applyNotan(ctx, notanThreshold);
		} else if (viewMode === 'sobel') {
			applySobel(ctx, {
				threshold: sobelThreshold,
				invert: sobelInvert,
				blurRadius: sobelBlurRadius
			});
		} else if (viewMode === 'gaussianBlur') {
			applyGaussianBlur(ctx, blurRadius);
		} else if (viewMode === 'temperatureMap') {
			applyTemperatureMap(ctx);
		}
		if (showGrid) {
			applyGrid(ctx, grid);
		}
		if (showRuleOfThirds) applyRuleOfThirds(ctx, composition);
		if (showGoldenRatio) applyGoldenRatio(ctx, composition);
		if (showGoldenSpiral) applyGoldenSpiral(ctx, composition);
		if (showDiagonalLines) applyDiagonalLines(ctx, composition);
	}

	function resetFilters() {
		viewMode = 'normal';
		showGrid = false;
	}

	function toggleFullscreen() {
		if (!canvasContainer) return;
		if (!document.fullscreenElement) {
			canvasContainer.requestFullscreen();
		} else {
			document.exitFullscreen();
		}
	}

	$effect(() => {
		function onFullscreenChange() {
			isFullscreen = !!document.fullscreenElement;
		}
		document.addEventListener('fullscreenchange', onFullscreenChange);
		return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
	});

	$effect(() => {
		if (!originalImage) {
			dominantColours = [];
			return;
		}
		const offscreen = document.createElement('canvas');
		offscreen.width = originalImage.naturalWidth;
		offscreen.height = originalImage.naturalHeight;
		const ctx = offscreen.getContext('2d', { willReadFrequently: true });
		if (!ctx) return;
		ctx.drawImage(originalImage, 0, 0);
		const imageData = ctx.getImageData(0, 0, offscreen.width, offscreen.height);
		dominantColours = extractDominantColours(imageData, 5);
	});

	const viewModeGroups: {
		label: string;
		modes: { id: typeof viewMode; label: string; description: string }[];
	}[] = [
		{
			label: 'Tone & Value',
			modes: [
				{ id: 'normal', label: 'Normal', description: 'Unmodified reference' },
				{ id: 'grayscale', label: 'Grayscale', description: 'Standard luminance' },
				{
					id: 'artistGrayscale',
					label: 'Artist Grayscale',
					description: 'Warm-biased for painting'
				},
				{
					id: 'grayscaleReduceColours',
					label: 'Value Steps',
					description: 'Quantised tonal zones'
				},
				{ id: 'notan', label: 'Notan', description: 'Light/dark masses' }
			]
		},
		{
			label: 'Colour',
			modes: [
				{
					id: 'reduceColours',
					label: 'Reduce Colours',
					description: 'K-means colour simplification'
				},
				{ id: 'temperatureMap', label: 'Temperature Map', description: 'Warm/cool hue analysis' }
			]
		},
		{
			label: 'Edge & Form',
			modes: [
				{ id: 'sobel', label: 'Sobel Edges', description: 'Edge detection' },
				{ id: 'gaussianBlur', label: 'Gaussian Blur', description: 'Soften to read masses' }
			]
		}
	];

	$effect(() => {
		if (!canvas || !originalImage) return;
		const ctx = canvas.getContext('2d', { willReadFrequently: true });
		if (!ctx) return;

		if (isCropMode) {
			canvas.width = originalImage.naturalWidth;
			canvas.height = originalImage.naturalHeight;
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.drawImage(originalImage, 0, 0, canvas.width, canvas.height);
			drawCropOverlay(ctx, cropX, cropY, cropW, cropH);
		} else if (appliedCrop) {
			canvas.width = appliedCrop.w;
			canvas.height = appliedCrop.h;
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			if (flipHorizontal) {
				ctx.save();
				ctx.scale(-1, 1);
				ctx.translate(-canvas.width, 0);
			}
			ctx.drawImage(
				originalImage,
				appliedCrop.x,
				appliedCrop.y,
				appliedCrop.w,
				appliedCrop.h,
				0,
				0,
				appliedCrop.w,
				appliedCrop.h
			);
			if (flipHorizontal) ctx.restore();
			if (!showOriginal) {
				applyViewModeFilters(ctx);
			}
		} else {
			canvas.width = originalImage.naturalWidth;
			canvas.height = originalImage.naturalHeight;
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			if (flipHorizontal) {
				ctx.save();
				ctx.scale(-1, 1);
				ctx.translate(-canvas.width, 0);
			}
			ctx.drawImage(originalImage, 0, 0, canvas.width, canvas.height);
			if (flipHorizontal) ctx.restore();
			if (!showOriginal) {
				applyViewModeFilters(ctx);
			}
		}
	});

	function handleFileChange(e: Event) {
		const input = e.currentTarget as HTMLInputElement;
		const file = input.files?.[0];
		if (!file) return;
		loadFile(file);
	}

	function loadFile(file: File) {
		const reader = new FileReader();
		reader.onload = (event) => {
			const img = new Image();
			img.onload = () => {
				originalImage = img;
				appliedCrop = null;
				cropRatioKey = 'original';
				isCropMode = false;
				pickedColour = null;
			};
			img.src = event.target?.result as string;
		};
		reader.readAsDataURL(file);
	}

	function ondrop(e: DragEvent) {
		e.preventDefault();
		isDragging = false;
		const file = e.dataTransfer?.files?.[0];
		if (file && file.type.startsWith('image/')) {
			loadFile(file);
		}
	}

	function ondragover(e: DragEvent) {
		e.preventDefault();
		isDragging = true;
	}

	function ondragleave() {
		isDragging = false;
	}
</script>

<div class="flex h-screen overflow-hidden font-sans">
	<!-- Sidebar -->
	<aside
		class="flex w-72 shrink-0 flex-col overflow-y-auto border-r border-studio-border bg-studio-panel"
	>
		<!-- Brand -->
		<div class="flex items-center gap-2.5 border-b border-studio-border px-4 py-5">
			<IconPaintbrush class="h-5 w-5 text-studio-amber" />
			<span class="font-heading text-lg font-medium tracking-wide text-studio-text-primary"
				>Rembrandt</span
			>
		</div>

		{#if originalImage}
			<!-- View modes — grouped accordion -->
			<div class="border-b border-studio-border p-4">
				<div class="flex flex-col gap-3">
					{#each viewModeGroups as group (group.label)}
						<div>
							<p
								class="mb-1 text-[10px] font-medium tracking-widest text-studio-text-muted uppercase"
							>
								{group.label}
							</p>
							<div class="flex flex-col gap-0.5">
								{#each group.modes as mode (mode.id)}
									<button
										onclick={() => (viewMode = mode.id)}
										class="flex flex-col rounded-sm border-l-4 px-3 py-2 text-left transition-colors {viewMode ===
										mode.id
											? 'border-studio-amber bg-studio-elevated'
											: 'border-transparent hover:bg-studio-elevated hover:text-studio-text-primary'}"
									>
										<span
											class="text-sm font-medium {viewMode === mode.id
												? 'text-studio-text-primary'
												: 'text-studio-text-secondary'}">{mode.label}</span
										>
										<span class="text-[11px] text-studio-text-muted">{mode.description}</span>
									</button>

									<!-- Inline controls for active mode -->
									{#if viewMode === mode.id}
										{#if mode.id === 'reduceColours'}
											<div class="mt-1 mb-1 px-3">
												<RangeControl
													label="Colours"
													min={2}
													max={32}
													bind:value={colourCount}
													sidebar={true}
												/>
											</div>
										{/if}
										{#if mode.id === 'grayscaleReduceColours'}
											<div class="mt-1 mb-1 px-3">
												<RangeControl
													label="Shades"
													min={2}
													max={10}
													bind:value={grayscaleShades}
													sidebar={true}
												/>
											</div>
										{/if}
										{#if mode.id === 'notan'}
											<div class="mt-1 mb-1 px-3">
												<RangeControl
													label="Threshold"
													min={0}
													max={255}
													bind:value={notanThreshold}
													sidebar={true}
												/>
											</div>
										{/if}
										{#if mode.id === 'sobel'}
											<div class="mt-1 mb-1 flex flex-col gap-3 px-3">
												<RangeControl
													label="Threshold"
													min={0}
													max={255}
													bind:value={sobelThreshold}
													sidebar={true}
												/>
												<RangeControl
													label="Pre-blur"
													min={0}
													max={5}
													bind:value={sobelBlurRadius}
													sidebar={true}
												/>
												<ToggleControl bind:checked={sobelInvert} label="Invert" />
											</div>
										{/if}
										{#if mode.id === 'gaussianBlur'}
											<div class="mt-1 mb-1 px-3">
												<RangeControl
													label="Blur Radius"
													min={0}
													max={40}
													bind:value={blurRadius}
													sidebar={true}
												/>
											</div>
										{/if}
									{/if}
								{/each}
							</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- Canvas tools -->
			<CanvasControls
				bind:showGrid
				bind:flipHorizontal
				bind:grid
				bind:showRuleOfThirds
				bind:showGoldenRatio
				bind:showGoldenSpiral
				bind:showDiagonalLines
				bind:composition
			/>
		{:else}
			<!-- No image hint -->
			<div class="flex flex-1 items-center justify-center p-8">
				<p class="text-center font-heading text-xl leading-relaxed text-studio-text-muted">
					Load a reference<br />to begin
				</p>
			</div>
		{/if}
	</aside>

	<!-- Main area -->
	<main class="flex min-w-0 flex-1 flex-col">
		<!-- Top toolbar (only when image loaded) -->
		{#if originalImage}
			<div class="flex items-center gap-2 border-b border-studio-border bg-studio-panel px-4 py-2">
				<!-- Edit actions -->
				<ButtonGroup>
					<IconButton title="Crop" onclick={enterCropMode} active={isCropMode}>
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
					<IconButton title="Reset filters" onclick={resetFilters}>Reset</IconButton>
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
						<input type="file" accept="image/*" onchange={handleFileChange} class="hidden" />
					</label>
					<IconButton
						title="Download PNG"
						onclick={() => {
							if (canvas) downloadImage(canvas);
						}}
					>
						<IconDownload class="h-4 w-4" />
						Download
					</IconButton>
					<IconButton onclick={toggleFullscreen} title="Fullscreen (Esc to exit)">
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
		{/if}

		<!-- Canvas zone -->
		<div
			bind:this={canvasContainer}
			class="relative flex min-h-0 flex-1 items-center justify-center bg-studio-deepest transition-colors duration-200 {isDragging
				? 'ring-2 ring-studio-amber ring-inset'
				: ''}"
			{ondrop}
			{ondragover}
			{ondragleave}
			role="img"
			aria-roledescription="filedrop"
		>
			{#if !originalImage}
				<!-- Background layers (absolutely fill the canvas zone) -->
				<svg
					class="pointer-events-none absolute inset-0 h-full w-full {isDragging
						? 'opacity-70'
						: 'opacity-30'} transition-opacity duration-300"
					xmlns="http://www.w3.org/2000/svg"
					aria-hidden="true"
				>
					<defs>
						<pattern id="rembrandt-grid-sub" width="32" height="32" patternUnits="userSpaceOnUse">
							<path
								d="M 32 0 L 0 0 0 32"
								fill="none"
								stroke="#4a4240"
								stroke-width="0.5"
								opacity="0.45"
							/>
						</pattern>
						<pattern id="rembrandt-grid" width="64" height="64" patternUnits="userSpaceOnUse">
							<path
								d="M 64 0 L 0 0 0 64"
								fill="none"
								stroke="#4a4240"
								stroke-width="0.5"
								opacity="0.9"
							/>
						</pattern>
					</defs>
					<rect width="100%" height="100%" fill="url(#rembrandt-grid-sub)" />
					<rect width="100%" height="100%" fill="url(#rembrandt-grid)" />
				</svg>
				<div
					class="pointer-events-none absolute inset-0 transition-all duration-500"
					style="background: radial-gradient(ellipse 55% 45% at 50% 42%, {isDragging
						? 'rgba(232,166,74,0.11)'
						: 'rgba(232,166,74,0.055)'} 0%, transparent 70%)"
					aria-hidden="true"
				></div>

				<!-- Centered content -->
				<label
					class="relative z-10 flex cursor-pointer flex-col items-center gap-8 px-8 text-center"
				>
					<!-- Easel illustration -->
					<div
						class="easel-float transition-all duration-500 {isDragging
							? 'text-studio-amber opacity-65'
							: 'text-studio-text-muted opacity-35'}"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 120 140"
							fill="none"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="h-auto w-28"
							aria-hidden="true"
						>
							<rect x="22" y="8" width="76" height="62" rx="1.5" />
							<line x1="22" y1="20" x2="98" y2="20" />
							<line x1="22" y1="58" x2="98" y2="58" />
							<line x1="34" y1="8" x2="34" y2="70" />
							<line x1="86" y1="8" x2="86" y2="70" />
							<line x1="30" y1="70" x2="14" y2="132" />
							<line x1="90" y1="70" x2="106" y2="132" />
							<line x1="60" y1="70" x2="60" y2="132" />
							<line x1="18" y1="108" x2="102" y2="108" />
							<line x1="10" y1="132" x2="110" y2="132" />
						</svg>
					</div>

					<!-- Text -->
					<div class="flex flex-col gap-3">
						<h1
							class="font-heading text-5xl leading-none font-light tracking-wide transition-colors duration-300 {isDragging
								? 'text-studio-text-primary'
								: 'text-studio-text-secondary'}"
						>
							Drop your reference<br />image here
						</h1>
						<p class="text-sm text-studio-text-muted">
							or <span
								class="text-studio-amber underline underline-offset-2 hover:text-studio-amber-hover"
								>browse files</span
							>
						</p>
						<p class="text-[11px] tracking-widest text-studio-text-muted uppercase opacity-40">
							PNG &nbsp;·&nbsp; JPG &nbsp;·&nbsp; WEBP &nbsp;·&nbsp; GIF
						</p>
					</div>

					<input type="file" accept="image/*" onchange={handleFileChange} class="hidden" />
				</label>
			{:else}
				<!-- Canvas -->
				<div
					class={isFullscreen
						? 'flex h-full w-full items-center justify-center'
						: 'flex h-full w-full items-center justify-center p-4'}
				>
					<canvas
						bind:this={canvas}
						class="block shadow-[0_8px_32px_rgba(0,0,0,0.6)] {isFullscreen
							? 'max-h-screen max-w-full object-contain'
							: 'max-h-full max-w-full'} {isCropMode
							? isCropDragging
								? 'cursor-grabbing'
								: 'cursor-crosshair'
							: originalImage
								? 'cursor-crosshair'
								: ''}"
						onclick={originalImage ? onCanvasClick : undefined}
						onmousedown={isCropMode ? onCanvasMouseDown : undefined}
						onmousemove={isCropMode ? onCanvasMouseMove : undefined}
						onmouseup={isCropMode ? onCanvasMouseUp : undefined}
						onmouseleave={isCropMode ? onCanvasMouseUp : undefined}
					></canvas>
				</div>
			{/if}
		</div>

		<!-- Crop panel (bottom) -->
		{#if originalImage && (isCropMode || appliedCrop)}
			<div class="flex items-center gap-3 border-t border-studio-border bg-studio-panel px-4 py-3">
				<select
					value={cropRatioKey}
					onchange={(e) => updateCropForRatio((e.currentTarget as HTMLSelectElement).value)}
					disabled={!isCropMode}
					class="rounded-md border border-studio-border bg-studio-elevated px-3 py-1.5 text-sm text-studio-text-secondary disabled:opacity-50"
				>
					{#each cropRatios as ratio (ratio.label)}
						<option value={ratio.value}>{ratio.label}</option>
					{/each}
				</select>

				{#if isCropMode}
					<button
						onclick={applyCrop}
						class="rounded-md border border-studio-amber/50 bg-studio-amber/20 px-3 py-1.5 text-sm font-medium text-studio-amber transition-colors hover:bg-studio-amber/30"
					>
						Apply Crop
					</button>
				{/if}

				{#if appliedCrop}
					<button
						onclick={revertCrop}
						class="rounded-md border border-studio-border bg-studio-elevated px-3 py-1.5 text-sm font-medium text-studio-text-secondary transition-colors hover:text-studio-text-primary"
					>
						Revert to Original
					</button>
				{/if}
			</div>
		{/if}
	</main>

	<!-- Colour aside section -->
	{#if originalImage}
		<ColourAside bind:pickedColour {dominantColours} />
	{/if}
</div>
