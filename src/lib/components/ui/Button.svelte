<script lang="ts">
	export let variant: 'primary' | 'outline' | 'ghost' = 'primary';
	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let href: string | undefined = undefined;
	export let disabled = false;
	export let type: 'button' | 'submit' | 'reset' = 'button';

	const sizeClasses = {
		sm: 'px-4 py-2 text-sm',
		md: 'px-6 py-3 text-base',
		lg: 'px-8 py-4 text-lg'
	};

	const variantClasses = {
		primary:
			'bg-primary text-dark font-semibold rounded-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(103,219,236,0.5)] hover:scale-105 active:scale-95',
		outline:
			'border border-primary/50 text-primary font-semibold rounded-xl transition-all duration-300 hover:bg-primary/10 hover:border-primary hover:shadow-[0_0_20px_rgba(103,219,236,0.3)] active:scale-95',
		ghost:
			'text-gray-300 font-medium rounded-xl transition-all duration-300 hover:text-white hover:bg-white/10 active:scale-95'
	};
</script>

{#if href}
	<a
		{href}
		class="inline-flex items-center gap-2 {sizeClasses[size]} {variantClasses[
			variant
		]} {$$props.class ?? ''}"
		class:opacity-50={disabled}
		class:pointer-events-none={disabled}
	>
		<slot />
	</a>
{:else}
	<button
		{type}
		{disabled}
		on:click
		class="inline-flex cursor-pointer items-center gap-2 {sizeClasses[size]} {variantClasses[
			variant
		]} {$$props.class ?? ''}"
		class:opacity-50={disabled}
	>
		<slot />
	</button>
{/if}
