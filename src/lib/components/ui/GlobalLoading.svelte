<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { fade } from 'svelte/transition';
	import { DotLottieSvelte } from '@lottiefiles/dotlottie-svelte';

	export let src = '/animation/chatbot.lottie';
	export let displayMs = 2000;
	export let fadeDuration = 600;

	let visible = true;
	let timeoutId: number | undefined;
	const win = typeof window !== 'undefined' ? (window as any) : undefined;
	let unlocked = false;

	function lockBodyOverflow() {
		if (!win) return;
		win.__globalLoadingCount = (win.__globalLoadingCount || 0) + 1;
		if (win.__globalLoadingCount === 1) {
			win.__prevBodyOverflowY = document.body.style.overflowY;
			document.body.style.overflowY = 'hidden';
		}
	}

	function unlockBodyOverflow() {
		if (!win || unlocked) return;
		unlocked = true;
		win.__globalLoadingCount = Math.max((win.__globalLoadingCount || 1) - 1, 0);
		if (win.__globalLoadingCount === 0) {
			document.body.style.overflowY = win.__prevBodyOverflowY ?? '';
			delete win.__prevBodyOverflowY;
		}
	}

	onMount(() => {
		lockBodyOverflow();
		timeoutId = window.setTimeout(() => (visible = false), displayMs);
	});

	onDestroy(() => {
		if (timeoutId) clearTimeout(timeoutId);
		unlockBodyOverflow();
	});
</script>

{#if visible}
	<div
		transition:fade={{ duration: fadeDuration }}
		class="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
		aria-hidden="true"
		on:outroend={unlockBodyOverflow}
	>
		<div class="flex h-[40vmin] w-[40vmin] items-center justify-center sm:h-[30vmin] sm:w-[30vmin]">
			<DotLottieSvelte
				{src}
				autoplay
				loop
				renderConfig={{ devicePixelRatio: 2 }}
				backgroundColor="transparent"
			/>
		</div>
	</div>
{/if}
