<script>
	// @ts-nocheck

	import Particles, { particlesInit } from '@tsparticles/svelte';
	import { loadFull } from 'tsparticles'; // if you are going to use `loadFull`, install the "tsparticles" package too.

	export let id;

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
			enable: false
		}
	};

	let onParticlesLoaded = (/** @type {{ detail: { particles: any; }; }} */ event) => {
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

<Particles
	{id}
	options={particlesConfig}
	style="background: linear-gradient(45deg, #3b0764 30%, #712da4);
        position: absolute;
        top: 0;
        left: 0;
        z-index: 10;
        width: 100%;
        height: 100%;"
	on:particlesLoaded={onParticlesLoaded}
/>

<style>
	.particles-bg {
		background: linear-gradient(170deg, #3b0764 30%, #712da4);
		position: absolute;
		top: 0;
		left: 0;
		z-index: 10;
		height: 100%;
	}
</style>
