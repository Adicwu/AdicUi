import Vue from 'vue'
import Main from './Notification';
const NotificationConstructor = Vue.extend(Main);

let instance;
let instances = [];
let seed = 1;

const Notification = function (options) {
    const id = 'notification_' + seed++;
    const offsetTop = instances.reduce((total, cur) => {
        return total + cur.$el.clientHeight + 16;
    }, 0);
    options.closeHandler = function () {
        Notification.close(id)
    }
    instance = new NotificationConstructor({
        data: options
    });
    instance.$mount();
    document.body.appendChild(instance.$el);
    instance.visible = true;
    instance.id = id;
    instance.dom = instance.$el;
    instance.$el.ontransitionend = function (e) {
        instance.height = e.target.clientHeight;
    }
    instance.top = offsetTop;
    instance.dom.style.top = offsetTop + 'px';
    instances.push(instance)
    return instance;
};
['success', 'warning', 'info', 'error'].forEach(type => {
    Notification[type] = options => {
        if (typeof options === 'string') {
            options = {
                message: options
            };
        }
        options.type = type;
        return Notification(options);
    };
});
Notification.close = function (id) {
    let deletIndex = instances.findIndex(item => item.id === id);
    let deletItem = instances.splice(deletIndex, 1)[0];
    instances.forEach(instance => {
        let newOffsetTop = instance.top - deletItem.top - deletItem.height;
        instance.dom.style.top = newOffsetTop + 'px'
    })
}
export default Notification;