import { describe, expect, it } from 'vitest';
import { applyReduceColours } from './reduceColours';
import { createMockCtx, getCapturedPixels, makePixels } from './testUtils';

describe('applyReduceColours', () => {
	it('maps uniform image to same colour with k=1', () => {
		const pixels: [number, number, number, number][] = Array(16).fill([200, 100, 50, 255]);
		const ctx = createMockCtx(4, 4, makePixels(pixels));
		applyReduceColours(ctx, 1);
		const out = getCapturedPixels(ctx);
		// centroid should be very close to [200, 100, 50]
		expect(out[0]).toBeGreaterThanOrEqual(199);
		expect(out[0]).toBeLessThanOrEqual(201);
	});

	it('separates two distinct colours with k=2', () => {
		// 16x1: first 8 red, last 8 blue
		const pixels: [number, number, number, number][] = [
			...Array(8).fill([255, 0, 0, 255]),
			...Array(8).fill([0, 0, 255, 255])
		];
		const ctx = createMockCtx(16, 1, makePixels(pixels));
		applyReduceColours(ctx, 2);
		const out = getCapturedPixels(ctx);
		// First pixel should map to red centroid (r high, b low)
		// Last pixel should map to blue centroid (r low, b high)
		// No pixel should have both r > 200 and b > 200
		for (let i = 0; i < 16; i++) {
			const r = out[i * 4];
			const b = out[i * 4 + 2];
			expect(r > 200 && b > 200).toBe(false);
		}
	});

	it('calls putImageData once with modified data', () => {
		const ctx = createMockCtx(4, 4, makePixels(Array(16).fill([100, 150, 200, 255])));
		applyReduceColours(ctx, 1);
		const mock = ctx as unknown as { putImageData: { mock: { calls: unknown[] } } };
		expect(mock.putImageData.mock.calls).toHaveLength(1);
	});

	it('handles numColours larger than sample count without throwing', () => {
		// 1x1 canvas → 1 sample; numColours=10 is clamped
		const ctx = createMockCtx(1, 1, makePixels([[255, 128, 0, 255]]));
		expect(() => applyReduceColours(ctx, 10)).not.toThrow();
	});
});
