import { describe, expect, it } from 'vitest';
import { applyGrid } from './grid';
import { createMockCtx } from './testUtils';

describe('applyGrid', () => {
	it('draws no lines for a 1x1 grid', () => {
		const ctx = createMockCtx(100, 100);
		applyGrid(ctx, { rows: 1, cols: 1, color: '#fff', thickness: 1 });
		const mock = ctx as unknown as { beginPath: { mock: { calls: unknown[] } } };
		expect(mock.beginPath.mock.calls).toHaveLength(0);
	});

	it('draws cols-1 vertical lines', () => {
		const ctx = createMockCtx(100, 100);
		applyGrid(ctx, { rows: 1, cols: 4, color: '#fff', thickness: 1 });
		const mock = ctx as unknown as { stroke: { mock: { calls: unknown[] } } };
		expect(mock.stroke.mock.calls).toHaveLength(3);
	});

	it('draws rows-1 horizontal lines', () => {
		const ctx = createMockCtx(100, 100);
		applyGrid(ctx, { rows: 3, cols: 1, color: '#fff', thickness: 1 });
		const mock = ctx as unknown as { stroke: { mock: { calls: unknown[] } } };
		expect(mock.stroke.mock.calls).toHaveLength(2);
	});

	it('places vertical lines at evenly spaced x positions', () => {
		const ctx = createMockCtx(100, 100);
		applyGrid(ctx, { rows: 1, cols: 4, color: '#fff', thickness: 1 });
		const mock = ctx as unknown as { moveTo: { mock: { calls: [number, number][] } } };
		const xCoords = mock.moveTo.mock.calls.map((c) => c[0]);
		expect(xCoords).toEqual([25, 50, 75]);
	});

	it('places horizontal lines at evenly spaced y positions', () => {
		const ctx = createMockCtx(100, 200);
		applyGrid(ctx, { rows: 4, cols: 1, color: '#fff', thickness: 1 });
		const mock = ctx as unknown as { moveTo: { mock: { calls: [number, number][] } } };
		const yCoords = mock.moveTo.mock.calls.map((c) => c[1]);
		expect(yCoords).toEqual([50, 100, 150]);
	});

	it('sets strokeStyle and lineWidth from options', () => {
		const ctx = createMockCtx(100, 100);
		applyGrid(ctx, { rows: 2, cols: 2, color: '#ff0000', thickness: 3 });
		const ctxAny = ctx as unknown as { strokeStyle: string; lineWidth: number };
		expect(ctxAny.strokeStyle).toBe('#ff0000');
		expect(ctxAny.lineWidth).toBe(3);
	});

	it('calls setLineDash with empty array', () => {
		const ctx = createMockCtx(100, 100);
		applyGrid(ctx, { rows: 2, cols: 2, color: '#fff', thickness: 1 });
		const mock = ctx as unknown as { setLineDash: { mock: { calls: unknown[][] } } };
		expect(mock.setLineDash.mock.calls[0]).toEqual([[]]);
	});
});
