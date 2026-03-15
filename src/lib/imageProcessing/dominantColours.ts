import { rgbToHex } from '$lib/canvasUtils';
import { runKMeans } from './kMeans';

export interface Colour {
	r: number;
	g: number;
	b: number;
	hex: string;
}

export interface DominantColour extends Colour {
	count: number;
}

export function extractDominantColours(imageData: ImageData, k: number): DominantColour[] {
	const data = imageData.data;
	const stride = 4 * 4; // sample every 4th pixel
	const samples: [number, number, number][] = [];
	for (let i = 0; i < data.length; i += stride) {
		samples.push([data[i], data[i + 1], data[i + 2]]);
	}

	const { centroids, counts } = runKMeans(samples, Math.min(k, samples.length), true);

	return centroids
		.map((c, i) => ({
			r: c[0],
			g: c[1],
			b: c[2],
			hex: rgbToHex(c[0], c[1], c[2]),
			count: counts[i]
		}))
		.sort((a, b) => b.count - a.count);
}
