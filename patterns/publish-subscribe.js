const EventBus = {
    channels: {},
    subscribe(channelName, listener) {
        if (!this.channels[channelName]) {
            this.channels[channelName] = [];
        }
        this.channels[channelName].push(listener)
    },
    publish(channelName, data) {
        const channel = this.channels[channelName];
        if (!channel || !channel.length) {
            return;
        }

        channel.forEach(listener => listener(data));
    }
};

class Order {
    constructor (params) {
        this.params = params
    }

    save () {
        console.log('Order saved')
        EventBus.publish('order/new', {
            userEmail: this.params.userEmail
        })
    }
}

class Mailer {
    constructor () {
        EventBus.subscribe('order/new', this.sendPurchaseEmail)
    }

    sendPurchaseEmail (params) {
        console.log(`Email send to ${params.userEmail}`)
    }
}

const mailer = new Mailer();
const order = new Order({userEmail: 'john@gmail.com'})
order.save();