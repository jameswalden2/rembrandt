import { runKMeans, nearestCentroid } from './kMeans';

export function applyReduceColours(ctx: CanvasRenderingContext2D, numColours: number): void {
	const { width, height } = ctx.canvas;
	const imageData = ctx.getImageData(0, 0, width, height);
	const data = imageData.data;

	// Sample every 4th pixel
	const stride = 4 * 4;
	const samples: [number, number, number][] = [];
	for (let i = 0; i < data.length; i += stride) {
		samples.push([data[i], data[i + 1], data[i + 2]]);
	}

	const { centroids: palette } = runKMeans(samples, Math.min(numColours, samples.length));

	// Map all pixels to nearest centroid
	for (let i = 0; i < data.length; i += 4) {
		const idx = nearestCentroid(data[i], data[i + 1], data[i + 2], palette);
		data[i] = palette[idx][0];
		data[i + 1] = palette[idx][1];
		data[i + 2] = palette[idx][2];
	}

	ctx.putImageData(imageData, 0, 0);
}
