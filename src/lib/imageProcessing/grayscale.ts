export const STANDARD_WEIGHTS: [number, number, number] = [0.299, 0.587, 0.114];
export const ARTIST_WEIGHTS: [number, number, number] = [0.45, 0.45, 0.1];

export function applyGrayscale(
	ctx: CanvasRenderingContext2D,
	weights: [number, number, number] = STANDARD_WEIGHTS,
	numShades?: number
) {
	const w = ctx.canvas.width;
	const h = ctx.canvas.height;
	const imageData = ctx.getImageData(0, 0, w, h);
	const data = imageData.data;
	const step = numShades !== undefined ? 255 / (numShades - 1) : undefined;
	for (let i = 0; i < data.length; i += 4) {
		let gray = data[i] * weights[0] + data[i + 1] * weights[1] + data[i + 2] * weights[2];
		if (step !== undefined) {
			gray = Math.round(Math.round(gray / step) * step);
		}
		data[i] = gray;
		data[i + 1] = gray;
		data[i + 2] = gray;
	}
	ctx.putImageData(imageData, 0, 0);
}
