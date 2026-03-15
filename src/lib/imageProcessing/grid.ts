export interface GridOptions {
	rows: number;
	cols: number;
	color: string;
	thickness: number;
}

export function applyGrid(ctx: CanvasRenderingContext2D, options: GridOptions) {
	const { rows, cols, color, thickness } = options;
	const w = ctx.canvas.width;
	const h = ctx.canvas.height;
	ctx.strokeStyle = color;
	ctx.lineWidth = thickness;
	ctx.setLineDash([]);

	for (let i = 1; i < cols; i++) {
		ctx.beginPath();
		ctx.moveTo(w * (i / cols), 0);
		ctx.lineTo(w * (i / cols), h);
		ctx.stroke();
	}
	for (let i = 1; i < rows; i++) {
		ctx.beginPath();
		ctx.moveTo(0, h * (i / rows));
		ctx.lineTo(w, h * (i / rows));
		ctx.stroke();
	}
}
