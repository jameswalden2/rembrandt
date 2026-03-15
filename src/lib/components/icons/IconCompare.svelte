<script lang="ts">
	let { class: className = '' } = $props();
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	class={className}
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="2"
	stroke-linecap="round"
	stroke-linejoin="round"
>
	<rect x="2" y="3" width="9" height="18" rx="1" />
	<rect x="13" y="3" width="9" height="18" rx="1" />
	<line x1="12" y1="2" x2="12" y2="22" />
</svg>
