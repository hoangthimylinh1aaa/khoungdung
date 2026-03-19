<script lang="ts">
	import './layout.css';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
</script>

<svelte:head>
	<meta name="robots" content="index, follow" />
	<meta name="theme-color" content="#67dbec" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
</svelte:head>

<div class="flex min-h-screen flex-col">
	<Header />
	<main class="flex-1">
		<slot />
	</main>
	<Footer />
</div>
