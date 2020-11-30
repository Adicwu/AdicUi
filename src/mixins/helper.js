const mixins = {
    data() {
        return {
            debounceTimer: null,
            throttleFlag: true
        }
    },
    methods: {
        debounce(fn, delay = 300) {
            this.debounceTimer && clearTimeout(this.debounceTimer);
            this.debounceTimer = setTimeout(() => fn(), delay);
        },
        throttle(fn, delay = 300) {
            if (!this.throttleFlag) return;
            this.throttleFlag = false;
            setTimeout(() => {
                fn();
                this.throttleFlag = true;
            }, delay)
        }
    },
}

export default mixins;