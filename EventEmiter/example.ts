import EventEmitter from './index'

var ee = new EventEmitter();
ee.on('message', function (text) {
  console.log('第一次监听')
  console.log(text);
});

const callback2 = function (text) {
  console.log('第二次监听')
  console.log(text);
}

ee.on('message', callback2);

ee.emit('message', 'hello world 1');

// ee.removeAllListeners('message');
ee.removeListeners('message', callback2);

ee.emit('message', 'hello world 2');


ee.once('once', function (text) {
  console.log(text);
})
ee.emit('once', 'test once 1');
ee.emit('once', 'test once 2');