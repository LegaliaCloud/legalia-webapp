<script>
	import Particles, { particlesInit } from '@tsparticles/svelte';
	import { loadFull } from 'tsparticles'; // if you are going to use `loadFull`, install the "tsparticles" package too.

	let particlesConfig = {
		particles: {
			color: {
				value: '#c900af'
			},
			links: {
				enable: true,
				color: '#c900af'
			},
			move: {
				enable: true
			},
			number: {
				value: 150
			}
		},
		fullScreen: {
			enable: true
		}
	};

	let onParticlesLoaded = (event) => {
		const particlesContainer = event.detail.particles;

		// you can use particlesContainer to call all the Container class
		// (from the core library) methods like play, pause, refresh, start, stop
	};

	void particlesInit(async (engine) => {
		// call this once per app
		// you can use main to customize the tsParticles instance adding presets or custom shapes
		// this loads the tsparticles package bundle, it's the easiest method for getting everything ready
		// starting from v2 you can add only the features you need reducing the bundle size
		//await loadFull(engine);
		await loadFull(engine);
	});
</script>

<div class="my-hero z-10">
	<Particles id="tsparticles" options={particlesConfig} on:particlesLoaded={onParticlesLoaded} />
</div>

<style>
	.my-hero {
		background: linear-gradient(170deg, #3b0764 30%, #712da4);
		position: absolute;
		top: 0;
		left: 0;
		height: 95vh;
		width: 100%;
		shape-outside: polygon(0 0, 100% 0, 100% 50%, 0 100%);
		clip-path: polygon(0 0, 100% 0, 100% 50%, 0 100%);
	}

	@media only screen and (max-width: 720px) {
		.my-hero {
			background: linear-gradient(170deg, #3b0764 30%, #712da4);
			position: absolute;
			top: 0;
			left: 0;
			height: 95vh;
			width: 100%;
			shape-outside: polygon(0 0, 100% 0, 100% 75%, 0 100%);
			clip-path: polygon(0 0, 100% 0, 100% 75%, 0 100%);
		}
	}
</style>
