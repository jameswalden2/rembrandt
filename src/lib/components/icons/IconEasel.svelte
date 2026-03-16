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
	<!-- Canvas board -->
	<rect x="4" y="2" width="16" height="11" rx="0.5" />
	<!-- Top rail -->
	<line x1="4" y1="5" x2="20" y2="5" />
	<!-- Left leg -->
	<line x1="6" y1="13" x2="2" y2="22" />
	<!-- Centre leg -->
	<line x1="12" y1="13" x2="12" y2="22" />
	<!-- Right leg -->
	<line x1="18" y1="13" x2="22" y2="22" />
	<!-- Brace -->
	<line x1="3" y1="19" x2="21" y2="19" />
</svg>
