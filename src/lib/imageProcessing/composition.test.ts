import { describe, expect, it } from 'vitest';
import {
	applyDiagonalLines,
	applyGoldenRatio,
	applyGoldenSpiral,
	applyRuleOfThirds,
} from './composition';
import { createMockCtx } from './testUtils';

const opts = { color: '#fff', thickness: 1 };
const PHI = (1 + Math.sqrt(5)) / 2;

describe('applyRuleOfThirds', () => {
	it('draws 4 lines (2 vertical + 2 horizontal)', () => {
		const ctx = createMockCtx(100, 100);
		applyRuleOfThirds(ctx, opts);
		const mock = ctx as unknown as { stroke: { mock: { calls: unknown[] } } };
		expect(mock.stroke.mock.calls).toHaveLength(4);
	});

	it('places lines at 1/3 and 2/3 of width and height', () => {
		const ctx = createMockCtx(300, 300);
		applyRuleOfThirds(ctx, opts);
		const mock = ctx as unknown as { moveTo: { mock: { calls: [number, number][] } } };
		const coords = mock.moveTo.mock.calls;
		// moveTo order (interleaved per loop iteration):
		// [0]: vertical frac=1/3 → (100, 0)
		// [1]: horizontal frac=1/3 → (0, 100)
		// [2]: vertical frac=2/3 → (200, 0)
		// [3]: horizontal frac=2/3 → (0, 200)
		expect(coords[0][0]).toBeCloseTo(100, 5); // first vertical x
		expect(coords[2][0]).toBeCloseTo(200, 5); // second vertical x
		expect(coords[1][1]).toBeCloseTo(100, 5); // first horizontal y
		expect(coords[3][1]).toBeCloseTo(200, 5); // second horizontal y
	});
});

describe('applyGoldenRatio', () => {
	it('draws 4 lines', () => {
		const ctx = createMockCtx(100, 100);
		applyGoldenRatio(ctx, opts);
		const mock = ctx as unknown as { stroke: { mock: { calls: unknown[] } } };
		expect(mock.stroke.mock.calls).toHaveLength(4);
	});

	it('places lines at golden ratio positions (~38.2% and ~61.8%)', () => {
		const ctx = createMockCtx(1000, 1000);
		applyGoldenRatio(ctx, opts);
		const mock = ctx as unknown as { moveTo: { mock: { calls: [number, number][] } } };
		const coords = mock.moveTo.mock.calls;
		// moveTo order (interleaved per loop iteration):
		// [0]: vertical frac=(1-1/PHI) → ~381.97
		// [1]: horizontal frac=(1-1/PHI) → (0, ~381.97)
		// [2]: vertical frac=1/PHI → ~618.03
		// [3]: horizontal frac=1/PHI → (0, ~618.03)
		const pos1 = 1000 * (1 - 1 / PHI); // ~381.97
		const pos2 = 1000 / PHI;            // ~618.03
		expect(coords[0][0]).toBeCloseTo(pos1, 2);
		expect(coords[2][0]).toBeCloseTo(pos2, 2);
	});
});

describe('applyGoldenSpiral', () => {
	it('draws a single path with 400 lineTo calls', () => {
		const ctx = createMockCtx(200, 200);
		applyGoldenSpiral(ctx, opts);
		const mock = ctx as unknown as {
			beginPath: { mock: { calls: unknown[] } };
			stroke: { mock: { calls: unknown[] } };
			lineTo: { mock: { calls: unknown[] } };
		};
		expect(mock.beginPath.mock.calls).toHaveLength(1);
		expect(mock.stroke.mock.calls).toHaveLength(1);
		expect(mock.lineTo.mock.calls).toHaveLength(400);
	});
});

describe('applyDiagonalLines', () => {
	it('draws 2 lines', () => {
		const ctx = createMockCtx(100, 100);
		applyDiagonalLines(ctx, opts);
		const mock = ctx as unknown as { stroke: { mock: { calls: unknown[] } } };
		expect(mock.stroke.mock.calls).toHaveLength(2);
	});

	it('first diagonal goes from top-left to bottom-right', () => {
		const ctx = createMockCtx(100, 200);
		applyDiagonalLines(ctx, opts);
		const mock = ctx as unknown as {
			moveTo: { mock: { calls: [number, number][] } };
			lineTo: { mock: { calls: [number, number][] } };
		};
		expect(mock.moveTo.mock.calls[0]).toEqual([0, 0]);
		expect(mock.lineTo.mock.calls[0]).toEqual([100, 200]);
	});

	it('second diagonal goes from top-right to bottom-left', () => {
		const ctx = createMockCtx(100, 200);
		applyDiagonalLines(ctx, opts);
		const mock = ctx as unknown as {
			moveTo: { mock: { calls: [number, number][] } };
			lineTo: { mock: { calls: [number, number][] } };
		};
		expect(mock.moveTo.mock.calls[1]).toEqual([100, 0]);
		expect(mock.lineTo.mock.calls[1]).toEqual([0, 200]);
	});
});
