const EventEmitter = require('events');

class School extends EventEmitter {
    startPeriod() {
        console.log('start Period');
        // raise event when bell ring
        this.emit('bellRing', 'secound period started');
    }
}

// School as a class thas have all those EventEmitter property
module.exports = School;
