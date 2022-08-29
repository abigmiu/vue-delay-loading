import Vue, { createApp, Directive } from 'vue'
import LoadingCmp from './loading.vue';

const Loading = createApp(LoadingCmp)

class State {
    preTime: number;
    oldValue: boolean;
    value: boolean;
    duration: number;
    timer: number | null;

    constructor(duration = 2000) {
        this.preTime = new Date().getTime();
        this.oldValue = false;
        this.value = false;
        this.duration = duration;
        this.timer = null;
    }

    getIsOver() {
        const current = new Date().getTime()
        const result = current - this.preTime > this.duration
        this.preTime = current;
        return result
    }

    toggleStatus(value: boolean, el: HTMLElement & { instance: any }) {
        if (value) {
            this.timer = window.setTimeout(() => {
                this.start(el);
                console.log(new Date());
                clearTimeout(this.timer as number);
            }, this.duration)
        } else {
            if (this.timer) {
                clearTimeout(this.timer);
            }
            this.done(el);
        }
        this.oldValue = value;
    }

    start(el: HTMLElement & { instance: any }) {
        const style = getComputedStyle(el);
        if (["absolute", "fixed", "relative"].indexOf(style.position) === -1) {
            el.style.position = 'relative'
        }
        el.appendChild(el.instance.$el);
    }

    done(el: HTMLElement & { instance: any }) {
        if (!this.oldValue) return

        el.removeChild(el.instance.$el);
    }
}

const direct: Directive = {
    mounted(el, binding) {
        let arg = binding.arg;
        if (arg && !/\d+/.test(arg)) {
            throw new Error('不为整数');
        }
        const duration = arg ? +arg : undefined;
        el.loadingState = new State(duration);
        const instance = Loading.mount(document.createElement('div'))
        el.instance = instance

        el.loadingState.toggleStatus(binding.value, el)

    },
    updated(el, binding) {
        console.log(binding.value, binding.oldValue);
        if (binding.oldValue !== binding.value) {
            console.log(new Date())
            el.loadingState.toggleStatus(binding.value, el)
        }

    }
}



export default direct
