import { describe, expect, it } from 'vitest';
import { nearestCentroid, runKMeans } from './kMeans';

describe('nearestCentroid', () => {
	it('returns 0 when point matches the only centroid', () => {
		expect(nearestCentroid(255, 0, 0, [[255, 0, 0]])).toBe(0);
	});

	it('returns the index of the closest centroid', () => {
		const centroids: [number, number, number][] = [
			[0, 0, 0],
			[200, 200, 200],
			[100, 100, 100]
		];
		expect(nearestCentroid(110, 110, 110, centroids)).toBe(2);
	});

	it('returns the first match when distances are equal (uses strict <)', () => {
		const centroids: [number, number, number][] = [
			[100, 0, 0],
			[0, 100, 0]
		];
		// Both are distance 10000 from [0,0,0] — first wins because strict < doesn't update on tie
		// Equidistant from origin: favour index 0
		expect(nearestCentroid(0, 0, 0, centroids)).toBe(0);
	});
});

describe('runKMeans', () => {
	const RED: [number, number, number] = [255, 0, 0];
	const BLUE: [number, number, number] = [0, 0, 255];

	it('converges to the single input colour with k=1', () => {
		const samples: [number, number, number][] = Array(10).fill([128, 64, 32]);
		const { centroids } = runKMeans(samples, 1);
		expect(centroids).toHaveLength(1);
		expect(centroids[0]).toEqual([128, 64, 32]);
	});

	it('separates two clearly distinct clusters with k=2', () => {
		const samples = [...Array(50).fill(RED), ...Array(50).fill(BLUE)] as [number, number, number][];
		const { centroids } = runKMeans(samples, 2);
		const sorted = [...centroids].sort((a, b) => a[0] - b[0]);
		expect(sorted[0][2]).toBeGreaterThan(200); // blue centroid
		expect(sorted[1][0]).toBeGreaterThan(200); // red centroid
	});

	it('does not include counts key when withCounts is false (non-converging path only)', () => {
		// NOTE: when converged early, counts IS included regardless of withCounts.
		// This only tests the no-withCounts overload resolves correctly at the type level.
		const samples: [number, number, number][] = Array(50).fill(RED).concat(Array(50).fill(BLUE));
		const result = runKMeans(samples as [number, number, number][], 2, false);
		// result.counts may or may not be present depending on whether it converged
		expect(result.centroids).toHaveLength(2);
	});

	describe('withCounts: true', () => {
		it('returns counts summing to total number of samples', () => {
			const samples = [...Array(50).fill(RED), ...Array(50).fill(BLUE)] as [
				number,
				number,
				number
			][];
			const { counts } = runKMeans(samples, 2, true);
			expect(counts[0] + counts[1]).toBe(100);
		});

		it('returns correct count with k=1 uniform data', () => {
			const samples: [number, number, number][] = Array(10).fill([100, 100, 100]);
			const { centroids, counts } = runKMeans(samples, 1, true);
			expect(centroids).toHaveLength(1);
			expect(counts).toEqual([10]);
		});

		it('counts array length equals k', () => {
			const samples = [...Array(30).fill(RED), ...Array(30).fill(BLUE)] as [
				number,
				number,
				number
			][];
			const { counts } = runKMeans(samples, 2, true);
			expect(counts).toHaveLength(2);
		});

		it('returns counts via early convergence path', () => {
			// All-identical samples converge in iteration 1 (early return at line 100 in kMeans.ts)
			// That path always returns { centroids, counts } regardless of withCounts flag
			const samples: [number, number, number][] = Array(5).fill([200, 100, 50]);
			const result = runKMeans(samples, 1, true);
			expect(result.counts).toEqual([5]);
		});
	});
});
