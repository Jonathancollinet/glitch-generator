export default class GlitchController {
    private animation: Animation;

    constructor(animation: Animation) {
        this.animation = animation;
    }

    selectAnimationAt(percent: number) {
        const effect = this.animation.effect;
        const timing = effect?.getComputedTiming();
        const duration = timing?.duration as number;

        this.animation.currentTime = (duration / 100) * percent;
    }

    getPlayState() {
        return this.animation.playState;
    }

    play() {
        this.animation.play();
    }

    pause() {
        this.animation.pause();
    }

    getCurrentTime() {
        return this.animation.currentTime;
    }
}
