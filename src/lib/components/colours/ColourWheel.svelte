<script lang="ts">
	import { rgbToHsl } from '$lib/canvasUtils';

	let {
		pickedColour
	}: {
		pickedColour: { hex: string; r: number; g: number; b: number } | null;
	} = $props();

	const SIZE = 160;

	const hsl = $derived(
		pickedColour ? rgbToHsl(pickedColour.r, pickedColour.g, pickedColour.b) : null
	);
	const pickedHue = $derived(hsl ? hsl.h : null);

	let canvasEl = $state<HTMLCanvasElement | null>(null);

	$effect(() => {
		if (!canvasEl) return;

		const dpr = window.devicePixelRatio || 1;
		canvasEl.width = SIZE * dpr;
		canvasEl.height = SIZE * dpr;

		const ctx = canvasEl.getContext('2d');
		if (!ctx) return;

		ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);

		const cx = (SIZE * dpr) / 2;
		const cy = (SIZE * dpr) / 2;
		const outerR = cx * 0.8;
		const innerR = cx * 0.55;
		const midR = (outerR + innerR) / 2;

		// Draw hue ring — one arc segment per degree
		for (let deg = 0; deg < 360; deg++) {
			const startAngle = ((deg - 90) * Math.PI) / 180;
			const endAngle = ((deg - 90 + 1.5) * Math.PI) / 180;

			ctx.beginPath();
			ctx.moveTo(cx + Math.cos(startAngle) * innerR, cy + Math.sin(startAngle) * innerR);
			ctx.arc(cx, cy, outerR, startAngle, endAngle);
			ctx.arc(cx, cy, innerR, endAngle, startAngle, true);
			ctx.closePath();

			ctx.fillStyle = `hsl(${deg}, 100%, 50%)`;
			ctx.fill();
		}

		// Punch donut hole
		ctx.globalCompositeOperation = 'destination-out';
		ctx.beginPath();
		ctx.arc(cx, cy, innerR, 0, Math.PI * 2);
		ctx.fill();
		ctx.globalCompositeOperation = 'source-over';

		// Draw marker at picked hue
		if (pickedHue !== null) {
			const angle = ((pickedHue - 90) * Math.PI) / 180;
			const mx = cx + Math.cos(angle) * midR;
			const my = cy + Math.sin(angle) * midR;

			ctx.beginPath();
			ctx.arc(mx, my, 5 * dpr, 0, Math.PI * 2);
			ctx.fillStyle = 'white';
			ctx.fill();
			ctx.strokeStyle = 'rgba(0,0,0,0.6)';
			ctx.lineWidth = 1.5 * dpr;
			ctx.stroke();
		}
	});
</script>

<div class="flex flex-col gap-2 p-3">
	<span class="text-[10px] font-medium tracking-widest text-studio-text-muted uppercase">
		Colour Wheel
	</span>
	<div class="flex justify-center {pickedColour ? '' : 'opacity-50'}">
		<canvas bind:this={canvasEl} style="width: {SIZE}px; height: {SIZE}px;" class="rounded-full"
		></canvas>
	</div>
</div>
