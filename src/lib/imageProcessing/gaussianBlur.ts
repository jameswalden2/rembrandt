export function applyGaussianBlur(ctx: CanvasRenderingContext2D, radius: number): void {
	if (radius === 0) return;
	const { width, height } = ctx.canvas;
	const offscreen = new OffscreenCanvas(width, height);
	const offCtx = offscreen.getContext('2d')!;
	offCtx.filter = `blur(${radius}px)`;
	offCtx.drawImage(ctx.canvas, 0, 0);
	ctx.clearRect(0, 0, width, height);
	ctx.drawImage(offscreen, 0, 0);
}
