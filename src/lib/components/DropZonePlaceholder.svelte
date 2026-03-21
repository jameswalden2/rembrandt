<script lang="ts">
	let {
		isDragging,
		onchange
	}: {
		isDragging: boolean;
		onchange: (e: Event) => void;
	} = $props();
</script>

<!-- Background layers (absolutely fill the canvas zone) -->
<svg
	class="pointer-events-none absolute inset-0 h-full w-full {isDragging
		? 'opacity-70'
		: 'opacity-30'} transition-opacity duration-300"
	xmlns="http://www.w3.org/2000/svg"
	aria-hidden="true"
>
	<defs>
		<pattern id="rembrandt-grid-sub" width="32" height="32" patternUnits="userSpaceOnUse">
			<path d="M 32 0 L 0 0 0 32" fill="none" stroke="#4a4240" stroke-width="0.5" opacity="0.45" />
		</pattern>
		<pattern id="rembrandt-grid" width="64" height="64" patternUnits="userSpaceOnUse">
			<path d="M 64 0 L 0 0 0 64" fill="none" stroke="#4a4240" stroke-width="0.5" opacity="0.9" />
		</pattern>
	</defs>
	<rect width="100%" height="100%" fill="url(#rembrandt-grid-sub)" />
	<rect width="100%" height="100%" fill="url(#rembrandt-grid)" />
</svg>
<div
	class="pointer-events-none absolute inset-0 transition-all duration-500"
	style="background: radial-gradient(ellipse 55% 45% at 50% 42%, {isDragging
		? 'rgba(232,166,74,0.11)'
		: 'rgba(232,166,74,0.055)'} 0%, transparent 70%)"
	aria-hidden="true"
></div>

<!-- Centered content -->
<label class="relative z-10 flex cursor-pointer flex-col items-center gap-8 px-8 text-center">
	<!-- Easel illustration -->
	<div
		class="easel-float transition-all duration-500 {isDragging
			? 'text-studio-amber opacity-65'
			: 'text-studio-text-muted opacity-35'}"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 120 140"
			fill="none"
			stroke="currentColor"
			stroke-width="1.5"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="h-auto w-28"
			aria-hidden="true"
		>
			<rect x="22" y="8" width="76" height="62" rx="1.5" />
			<line x1="22" y1="20" x2="98" y2="20" />
			<line x1="22" y1="58" x2="98" y2="58" />
			<line x1="34" y1="8" x2="34" y2="70" />
			<line x1="86" y1="8" x2="86" y2="70" />
			<line x1="30" y1="70" x2="14" y2="132" />
			<line x1="90" y1="70" x2="106" y2="132" />
			<line x1="60" y1="70" x2="60" y2="132" />
			<line x1="18" y1="108" x2="102" y2="108" />
			<line x1="10" y1="132" x2="110" y2="132" />
		</svg>
	</div>

	<!-- Text -->
	<div class="flex flex-col gap-3">
		<h1
			class="font-heading text-5xl leading-none font-light tracking-wide transition-colors duration-300 {isDragging
				? 'text-studio-text-primary'
				: 'text-studio-text-secondary'}"
		>
			Drop your reference<br />image here
		</h1>
		<p class="text-sm text-studio-text-muted">
			or <span class="text-studio-amber underline underline-offset-2 hover:text-studio-amber-hover"
				>browse files</span
			>
		</p>
		<p class="text-[11px] tracking-widest text-studio-text-muted uppercase opacity-40">
			PNG &nbsp;·&nbsp; JPG &nbsp;·&nbsp; WEBP &nbsp;·&nbsp; GIF
		</p>
	</div>

	<input type="file" accept="image/*" {onchange} class="hidden" />
</label>
