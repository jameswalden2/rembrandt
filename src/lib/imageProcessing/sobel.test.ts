import { describe, expect, it } from 'vitest';
import { applySobel } from './sobel';
import { createMockCtx, getCapturedPixels, makePixels } from './testUtils';

const defaultOpts = { threshold: 0, invert: false, blurRadius: 0 };

describe('applySobel', () => {
	it('uniform image produces no edges (all magnitude 0)', () => {
		const pixels: [number, number, number, number][] = Array(25).fill([128, 128, 128, 255]);
		const ctx = createMockCtx(5, 5, makePixels(pixels));
		applySobel(ctx, defaultOpts);
		const out = getCapturedPixels(ctx);
		for (let i = 0; i < 25; i++) {
			expect(out[i * 4]).toBe(0);
		}
	});

	it('border pixels always output 0 magnitude', () => {
		// 3x3 with bright center pixel — only center is interior; all 8 borders → 0
		const pixels: [number, number, number, number][] = Array(9).fill([0, 0, 0, 255]);
		pixels[4] = [255, 255, 255, 255]; // center
		const ctx = createMockCtx(3, 3, makePixels(pixels));
		applySobel(ctx, defaultOpts);
		const out = getCapturedPixels(ctx);
		// All border indices: 0,1,2,3,5,6,7,8
		const borderIndices = [0, 1, 2, 3, 5, 6, 7, 8];
		for (const i of borderIndices) {
			expect(out[i * 4]).toBe(0);
		}
	});

	it('detects vertical edge on a left-white right-black image', () => {
		// 5x5: left 2 cols white, right 2 cols black, col 2 is boundary
		const pixels: [number, number, number, number][] = Array(25)
			.fill(null)
			.map((_, i) => {
				const col = i % 5;
				return col < 2 ? [255, 255, 255, 255] : [0, 0, 0, 255];
			}) as [number, number, number, number][];
		const ctx = createMockCtx(5, 5, makePixels(pixels));
		applySobel(ctx, defaultOpts);
		const out = getCapturedPixels(ctx);
		// Interior pixel at (2,2) = index 12 — on the edge boundary
		// Should have non-zero magnitude (high Gx)
		expect(out[12 * 4]).toBeGreaterThan(0);
	});

	it('threshold zeroes out low-magnitude pixels', () => {
		// Use a high threshold that no pixel can reach
		const pixels: [number, number, number, number][] = Array(25)
			.fill(null)
			.map((_, i) => {
				const col = i % 5;
				return col < 2 ? [255, 255, 255, 255] : [0, 0, 0, 255];
			}) as [number, number, number, number][];
		const ctx = createMockCtx(5, 5, makePixels(pixels));
		applySobel(ctx, { threshold: 300, invert: false, blurRadius: 0 });
		const out = getCapturedPixels(ctx);
		for (let i = 0; i < 25; i++) {
			expect(out[i * 4]).toBe(0);
		}
	});

	it('invert=true maps 0→255 for non-edge pixels', () => {
		// Uniform image: all magnitudes are 0. With invert: 255 - 0 = 255
		const pixels: [number, number, number, number][] = Array(25).fill([128, 128, 128, 255]);
		const ctx = createMockCtx(5, 5, makePixels(pixels));
		applySobel(ctx, { threshold: 0, invert: true, blurRadius: 0 });
		const out = getCapturedPixels(ctx);
		// Interior pixels were magnitude 0 before invert → now 255
		// pixel (2,2) = index 12, interior of 5x5
		expect(out[12 * 4]).toBe(255);
	});

	it('does not write alpha channel', () => {
		const pixels: [number, number, number, number][] = Array(25).fill([128, 128, 128, 200]);
		const ctx = createMockCtx(5, 5, makePixels(pixels));
		applySobel(ctx, defaultOpts);
		const out = getCapturedPixels(ctx);
		// Check that alpha was not overwritten
		expect(out[3]).toBe(200);
		expect(out[7]).toBe(200);
	});

	it('blurRadius smooths the gradient (peak magnitude <= unblurred)', () => {
		const pixels: [number, number, number, number][] = Array(49)
			.fill(null)
			.map((_, i) => {
				const col = i % 7;
				return col < 3 ? [255, 255, 255, 255] : [0, 0, 0, 255];
			}) as [number, number, number, number][];
		const ctxSharp = createMockCtx(7, 7, makePixels(pixels));
		const ctxBlur = createMockCtx(7, 7, makePixels(pixels));
		applySobel(ctxSharp, { threshold: 0, invert: false, blurRadius: 0 });
		applySobel(ctxBlur, { threshold: 0, invert: false, blurRadius: 2 });
		const sharpOut = getCapturedPixels(ctxSharp);
		const blurOut = getCapturedPixels(ctxBlur);
		// Center pixel of 7x7 = index 24
		// Blurred edge should have lower or equal peak magnitude
		expect(blurOut[24 * 4]).toBeLessThanOrEqual(sharpOut[24 * 4]);
	});
});
