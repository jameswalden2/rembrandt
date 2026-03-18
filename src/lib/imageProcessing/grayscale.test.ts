import { describe, expect, it } from 'vitest';
import { ARTIST_WEIGHTS, STANDARD_WEIGHTS, applyGrayscale } from './grayscale';
import { createMockCtx, getCapturedPixels, makePixels } from './testUtils';

describe('constants', () => {
	it('STANDARD_WEIGHTS sums to ~1', () => {
		const sum = STANDARD_WEIGHTS.reduce((a, b) => a + b, 0);
		expect(Math.abs(sum - 1)).toBeLessThan(1e-9);
	});

	it('ARTIST_WEIGHTS sums to ~1', () => {
		const sum = ARTIST_WEIGHTS.reduce((a, b) => a + b, 0);
		expect(Math.abs(sum - 1)).toBeLessThan(1e-9);
	});
});

describe('applyGrayscale', () => {
	it('converts red to standard weighted gray', () => {
		const ctx = createMockCtx(1, 1, makePixels([[255, 0, 0, 255]]));
		applyGrayscale(ctx);
		const out = getCapturedPixels(ctx);
		// gray = 255 * 0.299 = 76.245 → Uint8ClampedArray truncates to 76
		expect(out[0]).toBe(76);
		expect(out[1]).toBe(76);
		expect(out[2]).toBe(76);
		expect(out[3]).toBe(255); // alpha unchanged
	});

	it('converts green to standard weighted gray', () => {
		const ctx = createMockCtx(1, 1, makePixels([[0, 255, 0, 255]]));
		applyGrayscale(ctx);
		const out = getCapturedPixels(ctx);
		// gray = 255 * 0.587 = 149.685 → 150 (Uint8ClampedArray rounds to nearest)
		expect(out[0]).toBe(150);
	});

	it('converts blue to standard weighted gray', () => {
		const ctx = createMockCtx(1, 1, makePixels([[0, 0, 255, 255]]));
		applyGrayscale(ctx);
		const out = getCapturedPixels(ctx);
		// gray = 255 * 0.114 = 29.07 → 29
		expect(out[0]).toBe(29);
	});

	it('respects custom weights', () => {
		const ctx = createMockCtx(1, 1, makePixels([[255, 0, 0, 255]]));
		applyGrayscale(ctx, [1, 0, 0]);
		const out = getCapturedPixels(ctx);
		expect(out[0]).toBe(255);
	});

	it('preserves alpha channel', () => {
		const ctx = createMockCtx(1, 1, makePixels([[100, 100, 100, 128]]));
		applyGrayscale(ctx);
		const out = getCapturedPixels(ctx);
		expect(out[3]).toBe(128);
	});

	it('processes multiple pixels independently', () => {
		const ctx = createMockCtx(
			2,
			1,
			makePixels([
				[255, 0, 0, 255],
				[0, 0, 0, 255]
			])
		);
		applyGrayscale(ctx);
		const out = getCapturedPixels(ctx);
		expect(out[0]).toBe(76); // red pixel
		expect(out[4]).toBe(0); // black pixel stays black
	});

	it('quantises with numShades=2', () => {
		// step = 255/1 = 255; any gray rounds to 0 or 255
		// gray = 128*1 = 128; round(128/255)=1; round(1*255)=255
		const ctx = createMockCtx(1, 1, makePixels([[128, 128, 128, 255]]));
		applyGrayscale(ctx, [1, 0, 0], 2);
		const out = getCapturedPixels(ctx);
		expect(out[0]).toBe(255);
	});

	it('quantises to 4 shades (steps of 85)', () => {
		// step = 255/3 = 85; gray=100; round(100/85)=round(1.18)=1; round(1*85)=85
		const ctx = createMockCtx(1, 1, makePixels([[100, 0, 0, 255]]));
		applyGrayscale(ctx, [1, 0, 0], 4);
		const out = getCapturedPixels(ctx);
		expect(out[0]).toBe(85);
	});

	it('calls getImageData and putImageData once', () => {
		const ctx = createMockCtx(1, 1);
		applyGrayscale(ctx);
		const mock = ctx as unknown as {
			getImageData: { mock: { calls: unknown[] } };
			putImageData: { mock: { calls: unknown[] } };
		};
		expect(mock.getImageData.mock.calls).toHaveLength(1);
		expect(mock.putImageData.mock.calls).toHaveLength(1);
	});
});
