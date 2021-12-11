export default {
    install(Vue) {
        if (this.installed) {
            return
        }
        this.installed = true
        Vue.prototype.$dropModal = {
            EventBus: new Vue(),
            show(settings) {
                this.EventBus.$emit('dropShown', settings)
            },
            cords(elem) {
                this.EventBus.$emit('elementSent', elem)
            }

        }
    }
}