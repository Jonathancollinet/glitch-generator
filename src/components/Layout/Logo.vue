<template>
    <div class="select-none" id="text">G</div>
</template>

<style scoped>
#text {
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 32px;
	color: rgb(0 0 0 / 0%);
	height: 0px;
	padding: 0px;
	border-radius: 0px;
	background-color: rgb(255 255 255 / 0%);
	animation-name: glitch;
	animation-duration: 2000ms;
	animation-timing-function: steps(100);
	animation-iteration-count: infinite;
	animation-play-state: running;
}

@keyframes glitch {
	0% {
		text-shadow: -8px 0px 3px rgb(114 76 249), -4px 0px 3px rgb(249 76 76), 4px 0px 3px rgb(249 76 76), 8px 0px 3px rgb(114 76 249);
	}
	30% {
		text-shadow: 8px 0px 3px rgb(114 76 249), 4px 0px 3px rgb(249 76 76), -4px 0px 3px rgb(249 76 76), -8px 0px 3px rgb(114 76 249);
	}
	70%,
	100% {
		text-shadow: -8px 0px 3px rgb(114 76 249), -4px 0px 3px rgb(249 76 76), 4px 0px 3px rgb(249 76 76), 8px 0px 3px rgb(114 76 249);
	}
}
</style>