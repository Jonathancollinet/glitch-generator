export default class GlitchController {
    private animation: Animation | null;

    constructor(animation: Animation | null) {
        this.animation = animation;
    }

    selectAnimationAt(percent: number) {
        if (this.animation) {
            const effect = this.animation.effect;
            const timing = effect?.getComputedTiming();
            const duration = timing?.duration as number;

            this.animation.currentTime = (duration / 100) * percent;
        }
    }

    getPlayState() {
        if (this.animation) {
            return this.animation.playState;
        }
    }

    play() {
        if (this.animation) {
            this.animation.play();
        }
    }

    pause() {
        if (this.animation) {
            this.animation.pause();
        }
    }

    getCurrentTime() {
        if (this.animation) {
            return this.animation.currentTime;
        }
    }
}