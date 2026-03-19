<script lang="ts">
	import { onMount } from 'svelte';

	export let delay = 0;
	export let direction: 'up' | 'left' | 'right' | 'fade' = 'up';

	let el: HTMLElement;
	let visible = false;

	const animations = {
		up: 'animate-fade-up',
		left: 'animate-slide-left',
		right: 'animate-slide-right',
		fade: 'animate-fade-in'
	};

	onMount(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					visible = true;
					observer.disconnect();
				}
			},
			{ threshold: 0.1 }
		);
		observer.observe(el);
		return () => observer.disconnect();
	});
</script>

<div
	bind:this={el}
	class="opacity-0-init {visible ? animations[direction] : ''} {$$props.class ?? ''}"
	style="animation-delay: {delay}ms; animation-fill-mode: forwards;"
>
	<slot />
</div>
