<script lang="ts">
	import { localeStore } from '$lib/stores/locale';
	import { translations } from '$lib/i18n';
	import type { Locale } from '$lib/i18n';
	import AnimatedText from '$lib/components/ui/AnimatedText.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';

	let locale: Locale = 'vi';
	localeStore.subscribe((v) => (locale = v));
	$: a = translations[locale].aboutPage;

	const coreValues = [
		{
			icon: '💡',
			title: locale === 'vi' ? 'Đổi mới sáng tạo' : 'Innovation',
			desc:
				locale === 'vi'
					? 'Luôn tìm kiếm giải pháp mới và sáng tạo để giải quyết thách thức.'
					: 'Always seeking new and creative solutions to solve challenges.'
		},
		{
			icon: '🤝',
			title: locale === 'vi' ? 'Tin cậy' : 'Trust',
			desc:
				locale === 'vi'
					? 'Xây dựng mối quan hệ bền vững dựa trên sự tin tưởng và minh bạch.'
					: 'Building lasting relationships based on trust and transparency.'
		},
		{
			icon: '🚀',
			title: locale === 'vi' ? 'Tăng trưởng' : 'Growth',
			desc:
				locale === 'vi'
					? 'Không ngừng học hỏi và phát triển cùng khách hàng và đối tác.'
					: 'Continuously learning and growing with customers and partners.'
		}
	];

	const teamMembers = [
		{
			name: 'Nguyễn Hoàng Long',
			role: locale === 'vi' ? 'CEO & Co-founder' : 'CEO & Co-founder',
			avatar: 'NHL'
		},
		{
			name: 'Trần Minh Khoa',
			role: locale === 'vi' ? 'CTO & Co-founder' : 'CTO & Co-founder',
			avatar: 'TMK'
		},
		{ name: 'Lê Thị Hương', role: locale === 'vi' ? 'CPO' : 'CPO', avatar: 'LTH' }
	];
</script>

<svelte:head>
	<title>{a.hero_title} {a.hero_title_2} — Kho phần mềm</title>
	<meta name="description" content={a.hero_subtitle} />
</svelte:head>

<!-- Hero -->
<section class="noise-overlay relative overflow-hidden pt-24 pb-12 sm:pt-28">
	<div
		class="absolute inset-0 -z-10"
		style="background: radial-gradient(ellipse at 50% 0%, rgba(103,219,236,0.1) 0%, transparent 60%);"
	></div>
	<div class="container-custom section-padding py-8 text-center">
		<AnimatedText>
			<Badge variant="primary" class="mb-4">About</Badge>
			<h1
				class="font-display mb-4 text-4xl leading-tight font-bold text-white sm:text-5xl lg:text-6xl"
			>
				{a.hero_title}
				<span class="text-gradient"> {a.hero_title_2}</span>
			</h1>
			<p class="mx-auto max-w-2xl text-base text-gray-400 sm:text-lg">{a.hero_subtitle}</p>
		</AnimatedText>
	</div>
</section>

<!-- Mission & Vision -->
<section class="section-padding pt-0">
	<div class="container-custom">
		<div class="grid gap-6 md:grid-cols-2">
			<AnimatedText direction="left">
				<div class="card-glow h-full p-6 sm:p-8">
					<div
						class="bg-primary/10 border-primary/20 mb-4 flex h-12 w-12 items-center justify-center rounded-xl border"
					>
						<span class="text-2xl">🎯</span>
					</div>
					<h2 class="font-display mb-3 text-xl font-bold text-white">{a.mission_title}</h2>
					<p class="text-gray-400">{a.mission_desc}</p>
				</div>
			</AnimatedText>
			<AnimatedText direction="right">
				<div class="card-glow h-full p-6 sm:p-8">
					<div
						class="bg-primary/10 border-primary/20 mb-4 flex h-12 w-12 items-center justify-center rounded-xl border"
					>
						<span class="text-2xl">🔭</span>
					</div>
					<h2 class="font-display mb-3 text-xl font-bold text-white">{a.vision_title}</h2>
					<p class="text-gray-400">{a.vision_desc}</p>
				</div>
			</AnimatedText>
		</div>
	</div>
</section>

<!-- Core Values -->
<section class="section-padding pt-0">
	<div class="container-custom">
		<AnimatedText>
			<h2 class="font-display mb-8 text-center text-2xl font-bold text-white sm:text-3xl">
				<span class="text-gradient">{a.values_title}</span>
			</h2>
		</AnimatedText>
		<div class="grid gap-6 md:grid-cols-3">
			{#each coreValues as value, i (i)}
				<AnimatedText delay={i * 100}>
					<div class="card-glow p-6 text-center">
						<div class="mb-3 text-3xl">{value.icon}</div>
						<h3 class="font-display mb-2 font-bold text-white">{value.title}</h3>
						<p class="text-sm text-gray-400">{value.desc}</p>
					</div>
				</AnimatedText>
			{/each}
		</div>
	</div>
</section>

<!-- Team -->
<section class="section-padding pt-0">
	<div class="container-custom">
		<AnimatedText>
			<div class="mb-8 text-center">
				<h2 class="font-display mb-2 text-2xl font-bold text-white sm:text-3xl">
					<span class="text-gradient">{a.team_title}</span>
				</h2>
				<p class="text-gray-400">{a.team_subtitle}</p>
			</div>
		</AnimatedText>
		<div class="mx-auto grid max-w-3xl gap-6 md:grid-cols-3">
			{#each teamMembers as member, i (i)}
				<AnimatedText delay={i * 100}>
					<div class="card-glow p-6 text-center">
						<div
							class="from-primary text-dark mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br to-cyan-400 font-bold"
						>
							{member.avatar}
						</div>
						<h3 class="font-display mb-1 font-bold text-white">{member.name}</h3>
						<p class="text-sm text-gray-400">{member.role}</p>
					</div>
				</AnimatedText>
			{/each}
		</div>
	</div>
</section>
