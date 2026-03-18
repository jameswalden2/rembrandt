import { describe, expect, it } from 'vitest';
import { applyNotan } from './notan';
import { createMockCtx, getCapturedPixels, makePixels } from './testUtils';

describe('applyNotan', () => {
	it('bright pixel above threshold → white', () => {
		const ctx = createMockCtx(1, 1, makePixels([[200, 200, 200, 255]]));
		applyNotan(ctx, 128);
		const out = getCapturedPixels(ctx);
		expect(out[0]).toBe(255);
		expect(out[1]).toBe(255);
		expect(out[2]).toBe(255);
	});

	it('dark pixel below threshold → black', () => {
		const ctx = createMockCtx(1, 1, makePixels([[50, 50, 50, 255]]));
		applyNotan(ctx, 128);
		const out = getCapturedPixels(ctx);
		expect(out[0]).toBe(0);
	});

	it('pixel at exact threshold → white (>= comparison)', () => {
		// [129,129,129] → lum≈129; threshold=128 → 129>=128 → white
		// (Using 129 to avoid floating-point precision issues)
		const ctx = createMockCtx(1, 1, makePixels([[129, 129, 129, 255]]));
		applyNotan(ctx, 128);
		const out = getCapturedPixels(ctx);
		expect(out[0]).toBe(255);
	});

	it('pixel just below threshold → black', () => {
		const ctx = createMockCtx(1, 1, makePixels([[128, 128, 128, 255]]));
		applyNotan(ctx, 129);
		const out = getCapturedPixels(ctx);
		expect(out[0]).toBe(0);
	});

	it('preserves alpha channel', () => {
		const ctx = createMockCtx(1, 1, makePixels([[200, 200, 200, 128]]));
		applyNotan(ctx, 50);
		const out = getCapturedPixels(ctx);
		expect(out[3]).toBe(128);
	});

	it('uses luminosity weighting (not channel average)', () => {
		// [255,0,0,255]: lum = 0.299*255 ≈ 76; avg = 85
		// With threshold=77: lum < 77 → black; avg > 77 → would be white
		const ctx = createMockCtx(1, 1, makePixels([[255, 0, 0, 255]]));
		applyNotan(ctx, 77);
		const out = getCapturedPixels(ctx);
		expect(out[0]).toBe(0); // black (luminosity formula)
	});

	it('handles two pixels independently', () => {
		const ctx = createMockCtx(
			2,
			1,
			makePixels([
				[255, 255, 255, 255],
				[0, 0, 0, 255]
			])
		);
		applyNotan(ctx, 128);
		const out = getCapturedPixels(ctx);
		expect(out[0]).toBe(255); // white
		expect(out[4]).toBe(0); // black
	});
});
