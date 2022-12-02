console.log('nodejs eventDriven  ');

// "EventsEmitter" as a class of a "events"
const EventsEmitter = require('events');

const emitter = new EventsEmitter();

// register a listener for bellRing event
emitter.on('bellRing', (e) => {
    console.log(`bellRing response boz ${e}`);
});

// raise a events
// emit take two argument first is event name 2nd is optional
emitter.emit('bellRing', 'secound period ended');
