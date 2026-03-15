function euclideanDist(a: [number, number, number], b: [number, number, number]): number {
	const dr = a[0] - b[0];
	const dg = a[1] - b[1];
	const db = a[2] - b[2];
	return dr * dr + dg * dg + db * db;
}

function kmeansPlusPlus(
	samples: [number, number, number][],
	k: number
): [number, number, number][] {
	const centroids: [number, number, number][] = [];
	const firstIdx = Math.floor(Math.random() * samples.length);
	centroids.push([...samples[firstIdx]] as [number, number, number]);

	for (let i = 1; i < k; i++) {
		const dists = samples.map((s) => {
			let minD = Infinity;
			for (const c of centroids) {
				const d = euclideanDist(s, c);
				if (d < minD) minD = d;
			}
			return minD;
		});
		const total = dists.reduce((a, b) => a + b, 0);
		let rand = Math.random() * total;
		let chosen = 0;
		for (let j = 0; j < dists.length; j++) {
			rand -= dists[j];
			if (rand <= 0) {
				chosen = j;
				break;
			}
		}
		centroids.push([...samples[chosen]] as [number, number, number]);
	}
	return centroids;
}

export function nearestCentroid(
	r: number,
	g: number,
	b: number,
	centroids: [number, number, number][]
): number {
	let best = 0;
	let bestDist = Infinity;
	for (let i = 0; i < centroids.length; i++) {
		const d = euclideanDist([r, g, b], centroids[i]);
		if (d < bestDist) {
			bestDist = d;
			best = i;
		}
	}
	return best;
}

export function runKMeans(
	samples: [number, number, number][],
	k: number,
	withCounts: true
): { centroids: [number, number, number][]; counts: number[] };

export function runKMeans(
	samples: [number, number, number][],
	k: number,
	withCounts?: false
): { centroids: [number, number, number][] };

export function runKMeans(
	samples: [number, number, number][],
	k: number,
	withCounts: boolean = false
): { centroids: [number, number, number][]; counts?: number[] } {
	let centroids = kmeansPlusPlus(samples, k);

	for (let iter = 0; iter < 20; iter++) {
		const sums: [number, number, number][] = Array.from({ length: k }, () => [0, 0, 0]);
		const counts = new Array(k).fill(0);

		for (const s of samples) {
			const idx = nearestCentroid(s[0], s[1], s[2], centroids);
			sums[idx][0] += s[0];
			sums[idx][1] += s[1];
			sums[idx][2] += s[2];
			counts[idx]++;
		}

		let converged = true;
		const newCentroids: [number, number, number][] = centroids.map((c, i) => {
			if (counts[i] === 0) return c;
			const nr = Math.round(sums[i][0] / counts[i]);
			const ng = Math.round(sums[i][1] / counts[i]);
			const nb = Math.round(sums[i][2] / counts[i]);
			if (nr !== c[0] || ng !== c[1] || nb !== c[2]) converged = false;
			return [nr, ng, nb];
		});

		centroids = newCentroids;
		if (converged) return { centroids, counts };
	}

	if (withCounts) {
		const counts = new Array(k).fill(0);
		for (const s of samples) {
			counts[nearestCentroid(s[0], s[1], s[2], centroids)]++;
		}
		return { centroids, counts };
	}
	return { centroids };
}
