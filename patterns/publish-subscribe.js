const EventBas = {
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

EventBas.subscribe('foo', (msg) => {
    console.log(msg);
});

EventBas.publish('foo', 'Hello world');
EventBas.publish('foo', 'Another world');