import Vue, { createApp, Directive } from 'vue'
import LoadingCmp from './loading.vue';

const Loading = createApp(LoadingCmp)


function start(el: HTMLElement & { instance: any }) {
    const style = getComputedStyle(el);
    if (["absolute", "fixed", "relative"].indexOf(style.position) === -1) {
        el.style.position = 'relative'
    }
    el.appendChild(el.instance.$el);
}

function done(el: HTMLElement & { instance: any }) {
    el.removeChild(el.instance.$el);
}
class State {
    oldValue: boolean;
    duration: number;
    timer: number | null;

    constructor(duration = 300) {
        this.oldValue = false;
        this.duration = duration;
        this.timer = null;
    }

    toggleStatus(value: boolean, el: HTMLElement & { instance: any }) {
        if (value) {
            this.timer = window.setTimeout(() => {
                start(el);
                clearTimeout(this.timer as number);
            }, this.duration)
        } else {
            if (this.timer) {
                clearTimeout(this.timer);
            }
            if (!this.oldValue) return
            done(el);
        }
        this.oldValue = value;
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
        if (binding.oldValue !== binding.value) {
            el.loadingState.toggleStatus(binding.value, el)
        }

    }
}



export default direct
