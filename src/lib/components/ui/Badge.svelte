<script lang="ts">
  export let variant: 'primary' | 'dark' | 'outline' = 'primary';

  const variants = {
    primary: 'bg-primary/10 text-primary border border-primary/20',
    dark: 'bg-white/5 text-gray-400 border border-white/10',
    outline: 'border border-primary/40 text-primary',
  };
</script>

<span
  class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide {variants[variant]} {$$props.class ?? ''}"
>
  <slot />
</span>