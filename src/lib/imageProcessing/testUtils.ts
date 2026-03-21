import { vi } from 'vitest';

export function makePixels(pixels: [number, number, number, number][]): Uint8ClampedArray {
	const out = new Uint8ClampedArray(pixels.length * 4);
	pixels.forEach(([r, g, b, a], i) => {
		out[i * 4] = r;
		out[i * 4 + 1] = g;
		out[i * 4 + 2] = b;
		out[i * 4 + 3] = a;
	});
	return out;
}

export function createMockCtx(width: number, height: number, initialPixels?: Uint8ClampedArray) {
	const data = initialPixels ?? new Uint8ClampedArray(width * height * 4);
	return {
		canvas: { width, height },
		getImageData: vi.fn(() => ({
			data: new Uint8ClampedArray(data),
			width,
			height
		})),
		putImageData: vi.fn(),
		beginPath: vi.fn(),
		moveTo: vi.fn(),
		lineTo: vi.fn(),
		stroke: vi.fn(),
		fill: vi.fn(),
		fillRect: vi.fn(),
		strokeRect: vi.fn(),
		arc: vi.fn(),
		quadraticCurveTo: vi.fn(),
		setLineDash: vi.fn(),
		clearRect: vi.fn(),
		drawImage: vi.fn(),
		strokeStyle: '',
		lineWidth: 0,
		filter: ''
	} as unknown as CanvasRenderingContext2D;
}

export function getCapturedPixels(mockCtx: ReturnType<typeof createMockCtx>): Uint8ClampedArray {
	const mock = mockCtx as unknown as { putImageData: ReturnType<typeof vi.fn> };
	return mock.putImageData.mock.calls[0][0].data as Uint8ClampedArray;
}
