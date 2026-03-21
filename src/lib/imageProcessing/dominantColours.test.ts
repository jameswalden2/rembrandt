import { describe, expect, it } from 'vitest';
import { extractDominantColours } from './dominantColours';
import { makePixels } from './testUtils';

function makeImageData(pixels: [number, number, number, number][], width: number): ImageData {
	return { data: makePixels(pixels), width, height: pixels.length / width } as ImageData;
}

describe('extractDominantColours', () => {
	it('returns k=1 result for a uniform red image', () => {
		// 4x4 = 16 pixels; stride samples every 4th pixel = 4 samples
		const pixels: [number, number, number, number][] = Array(16).fill([255, 0, 0, 255]);
		const imageData = makeImageData(pixels, 4);
		const result = extractDominantColours(imageData, 1);
		expect(result).toHaveLength(1);
		expect(result[0].r).toBe(255);
		expect(result[0].g).toBe(0);
		expect(result[0].b).toBe(0);
		expect(result[0].hex).toBe('#ff0000');
	});

	it('hex is zero-padded correctly for blue', () => {
		const pixels: [number, number, number, number][] = Array(16).fill([0, 0, 255, 255]);
		const imageData = makeImageData(pixels, 4);
		const [colour] = extractDominantColours(imageData, 1);
		expect(colour.hex).toBe('#0000ff');
	});

	it('result length equals k', () => {
		// 16x1 pixels with two colours; sample every 4th = 4 samples at pixels 0,4,8,12
		const pixels: [number, number, number, number][] = [
			...Array(8).fill([255, 0, 0, 255]),
			...Array(8).fill([0, 0, 255, 255])
		];
		const imageData = makeImageData(pixels, 16);
		const result = extractDominantColours(imageData, 2);
		expect(result).toHaveLength(2);
	});

	it('sorts results by count descending (most dominant first)', () => {
		// 16x1: pixels 0,4,8 → red (sampled); pixel 12 → blue (sampled)
		// red count = 3, blue count = 1; red should come first
		const pixels: [number, number, number, number][] = [
			[255, 0, 0, 255], // pixel 0 — sampled
			[255, 0, 0, 255], // pixel 1
			[255, 0, 0, 255], // pixel 2
			[255, 0, 0, 255], // pixel 3
			[255, 0, 0, 255], // pixel 4 — sampled
			[255, 0, 0, 255],
			[255, 0, 0, 255],
			[255, 0, 0, 255],
			[255, 0, 0, 255], // pixel 8 — sampled
			[255, 0, 0, 255],
			[255, 0, 0, 255],
			[255, 0, 0, 255],
			[0, 0, 255, 255], // pixel 12 — sampled
			[0, 0, 255, 255],
			[0, 0, 255, 255],
			[0, 0, 255, 255]
		];
		const imageData = makeImageData(pixels, 16);
		const result = extractDominantColours(imageData, 2);
		expect(result[0].r).toBeGreaterThan(200); // red first
		expect(result[0].count).toBeGreaterThan(result[1].count);
	});
});
