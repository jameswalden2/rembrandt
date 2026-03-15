export function applyNotan(ctx: CanvasRenderingContext2D, threshold: number): void {
	const { width, height } = ctx.canvas;
	const imageData = ctx.getImageData(0, 0, width, height);
	const data = imageData.data;
	for (let i = 0; i < data.length; i += 4) {
		const lum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
		const v = lum >= threshold ? 255 : 0;
		data[i] = data[i + 1] = data[i + 2] = v;
	}
	ctx.putImageData(imageData, 0, 0);
}
