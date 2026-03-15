export function applySobel(
	ctx: CanvasRenderingContext2D,
	options: {
		threshold: number;
		invert: boolean;
		blurRadius: number;
	}
): void {
	const { threshold, invert, blurRadius } = options;
	const w = ctx.canvas.width;
	const h = ctx.canvas.height;
	const imageData = ctx.getImageData(0, 0, w, h);
	const data = imageData.data;

	// Convert to grayscale luminosity into a Float32Array
	const gray = new Float32Array(w * h);
	for (let i = 0; i < w * h; i++) {
		const p = i * 4;
		gray[i] = data[p] * 0.299 + data[p + 1] * 0.587 + data[p + 2] * 0.114;
	}

	// Apply separable box blur before edge detection
	if (blurRadius > 0) {
		const kernelSize = 2 * blurRadius + 1;
		const temp = new Float32Array(w * h);

		// Horizontal pass
		for (let y = 0; y < h; y++) {
			for (let x = 0; x < w; x++) {
				let sum = 0;
				for (let k = -blurRadius; k <= blurRadius; k++) {
					const sx = Math.min(w - 1, Math.max(0, x + k));
					sum += gray[y * w + sx];
				}
				temp[y * w + x] = sum / kernelSize;
			}
		}

		// Vertical pass
		for (let y = 0; y < h; y++) {
			for (let x = 0; x < w; x++) {
				let sum = 0;
				for (let k = -blurRadius; k <= blurRadius; k++) {
					const sy = Math.min(h - 1, Math.max(0, y + k));
					sum += temp[sy * w + x];
				}
				gray[y * w + x] = sum / kernelSize;
			}
		}
	}

	// Apply Sobel kernels
	// Gx: [[-1,0,1],[-2,0,2],[-1,0,1]]
	// Gy: [[-1,-2,-1],[0,0,0],[1,2,1]]
	for (let y = 0; y < h; y++) {
		for (let x = 0; x < w; x++) {
			let magnitude = 0;

			if (x > 0 && x < w - 1 && y > 0 && y < h - 1) {
				const tl = gray[(y - 1) * w + (x - 1)];
				const tm = gray[(y - 1) * w + x];
				const tr = gray[(y - 1) * w + (x + 1)];
				const ml = gray[y * w + (x - 1)];
				const mr = gray[y * w + (x + 1)];
				const bl = gray[(y + 1) * w + (x - 1)];
				const bm = gray[(y + 1) * w + x];
				const br = gray[(y + 1) * w + (x + 1)];

				const gx = -tl + tr - 2 * ml + 2 * mr - bl + br;
				const gy = -tl - 2 * tm - tr + bl + 2 * bm + br;

				magnitude = Math.min(255, Math.sqrt(gx * gx + gy * gy));
			}

			if (magnitude < threshold) magnitude = 0;

			const value = invert ? 255 - magnitude : magnitude;
			const p = (y * w + x) * 4;
			data[p] = value;
			data[p + 1] = value;
			data[p + 2] = value;
			// alpha preserved
		}
	}

	ctx.putImageData(imageData, 0, 0);
}
