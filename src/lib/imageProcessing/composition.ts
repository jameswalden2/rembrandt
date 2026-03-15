export interface CompositionOverlayOptions {
	color: string;
	thickness: number;
}

const PHI = (1 + Math.sqrt(5)) / 2;
// Growth factor: r multiplies by PHI every quarter-turn
const SPIRAL_B = Math.log(PHI) / (Math.PI / 2);

export function applyRuleOfThirds(
	ctx: CanvasRenderingContext2D,
	options: CompositionOverlayOptions
) {
	const { color, thickness } = options;
	const w = ctx.canvas.width;
	const h = ctx.canvas.height;

	ctx.strokeStyle = color;
	ctx.lineWidth = thickness;
	ctx.setLineDash([]);

	for (const frac of [1 / 3, 2 / 3]) {
		ctx.beginPath();
		ctx.moveTo(w * frac, 0);
		ctx.lineTo(w * frac, h);
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(0, h * frac);
		ctx.lineTo(w, h * frac);
		ctx.stroke();
	}
}

export function applyGoldenRatio(
	ctx: CanvasRenderingContext2D,
	options: CompositionOverlayOptions
) {
	const { color, thickness } = options;
	const w = ctx.canvas.width;
	const h = ctx.canvas.height;

	ctx.strokeStyle = color;
	ctx.lineWidth = thickness;
	ctx.setLineDash([]);

	// Lines at (1 − 1/φ) ≈ 38.2% and 1/φ ≈ 61.8%
	for (const frac of [1 - 1 / PHI, 1 / PHI]) {
		ctx.beginPath();
		ctx.moveTo(w * frac, 0);
		ctx.lineTo(w * frac, h);
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(0, h * frac);
		ctx.lineTo(w, h * frac);
		ctx.stroke();
	}
}

export function applyGoldenSpiral(
	ctx: CanvasRenderingContext2D,
	options: CompositionOverlayOptions
) {
	const { color, thickness } = options;
	const w = ctx.canvas.width;
	const h = ctx.canvas.height;

	ctx.strokeStyle = color;
	ctx.lineWidth = thickness;
	ctx.setLineDash([]);

	const cx = w / 2;
	const cy = h / 2;

	// Outer radius just reaches the canvas corner
	const maxR = Math.sqrt(w * w + h * h) / 2;

	// 4 full rotations, drawn from outside (large r) to inside (small r)
	const rotations = 4;
	const totalAngle = rotations * 2 * Math.PI;
	const steps = 400;

	ctx.beginPath();
	for (let i = 0; i <= steps; i++) {
		const t = totalAngle * (1 - i / steps);
		const r = maxR * Math.exp(-SPIRAL_B * (totalAngle - t));
		const x = cx + r * Math.cos(t);
		const y = cy + r * Math.sin(t);
		if (i === 0) ctx.moveTo(x, y);
		else ctx.lineTo(x, y);
	}
	ctx.stroke();
}

export function applyDiagonalLines(
	ctx: CanvasRenderingContext2D,
	options: CompositionOverlayOptions
) {
	const { color, thickness } = options;
	const w = ctx.canvas.width;
	const h = ctx.canvas.height;

	ctx.strokeStyle = color;
	ctx.lineWidth = thickness;
	ctx.setLineDash([]);

	// Top-left to bottom-right
	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(w, h);
	ctx.stroke();

	// Top-right to bottom-left
	ctx.beginPath();
	ctx.moveTo(w, 0);
	ctx.lineTo(0, h);
	ctx.stroke();
}
