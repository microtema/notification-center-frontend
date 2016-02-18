'use strict';

var emitter = new EventEmitter();
var dispatcher = new Flux.Dispatcher();
var store = new MessageNotificationStore();
var sse = new SsEventSource();

ReactDOM.render(<MessageNotificationApp />, document.getElementById('container'));