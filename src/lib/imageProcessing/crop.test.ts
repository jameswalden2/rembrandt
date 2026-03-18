import { describe, expect, it } from 'vitest';
import { CROP_RATIOS, computeCropRect } from './crop';

describe('CROP_RATIOS', () => {
	it('has 10 keys', () => {
		expect(Object.keys(CROP_RATIOS)).toHaveLength(10);
	});

	it('original maps to null', () => {
		expect(CROP_RATIOS['original']).toBeNull();
	});

	it('1:1 maps to [1,1]', () => {
		expect(CROP_RATIOS['1:1']).toEqual([1, 1]);
	});

	it('16:9 maps to [16,9]', () => {
		expect(CROP_RATIOS['16:9']).toEqual([16, 9]);
	});
});

describe('computeCropRect', () => {
	it('returns full image for original ratio', () => {
		expect(computeCropRect(300, 200, 'original', 150, 100)).toEqual({ x: 0, y: 0, w: 300, h: 200 });
	});

	it('uses full landscape image for square crop when width > height', () => {
		// 300x200 with 1:1: square side = 200 (height-constrained), centered
		const rect = computeCropRect(300, 200, '1:1', 150, 100);
		expect(rect.w).toBe(rect.h); // square
		expect(rect.w).toBe(200);
	});

	it('fits 16:9 crop within a landscape image', () => {
		// 300x200 with 16:9: scale = min(300/16, 200/9) = min(18.75, 22.2) = 18.75
		// w = 300, h = round(300 * 9/16) = round(168.75) = 169
		const rect = computeCropRect(300, 200, '16:9', 150, 100);
		expect(rect.w).toBe(300);
		expect(rect.h).toBe(169);
		expect(rect.x).toBe(0);
	});

	it('clamps crop to image bounds when center is near top-left', () => {
		// 300x200, 1:1, square=200, center at (10,10)
		// x = round(10-100) = -90 → clamped to 0
		// y = round(10-100) = -90 → clamped to 0
		const rect = computeCropRect(300, 200, '1:1', 10, 10);
		expect(rect.x).toBe(0);
		expect(rect.y).toBe(0);
		expect(rect.w).toBe(200);
		expect(rect.h).toBe(200);
	});

	it('clamps crop to image bounds when center is near bottom-right', () => {
		// 300x200, 1:1, square=200, center at (290,190)
		// x = round(290-100) = 190 → clamped to min(300-200, 190) = 100
		// y = round(190-100) = 90 → clamped to min(200-200, 90) = 0
		const rect = computeCropRect(300, 200, '1:1', 290, 190);
		expect(rect.x).toBe(100);
		expect(rect.y).toBe(0);
	});

	it('returns exact rect for 3:2 ratio on matching image', () => {
		// 300x200 with 3:2: scale = min(300/3, 200/2) = min(100, 100) = 100
		// w=300, h=200 — fills entire image
		const rect = computeCropRect(300, 200, '3:2', 150, 100);
		expect(rect).toEqual({ x: 0, y: 0, w: 300, h: 200 });
	});
});
