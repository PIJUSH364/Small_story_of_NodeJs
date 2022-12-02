const School = require('./school');

// new School()===EventsEmitter = require('events');
const emmit = new School();

emmit.on('bellRing', (e) => {
    console.log(`bell ring boz ${e}`);
});

emmit.startPeriod();
