var SsEventSource = function () {

    this.sseUrl = endpoint['localhost'];

    this.init = function () {

        var source = null;
        if (!!window.EventSource) {
            source = new EventSource(this.sseUrl['/sse']());
        } else {
            console.log('EventSource is not supported');
            return
        }

        source.addEventListener('message', function (e) {

            clearTimeout(this.timerId);
            this.timerId = setTimeout(function () {
                console.log('on.message', e);
                dispatcher.dispatch({type: 'update.unreaded.count'});
            }, 1000);

        }, false);

        source.addEventListener('open', function (e) {
            console.log('open', e);
        }, false);

        source.addEventListener('error', function (e) {
            if (e.readyState == EventSource.CLOSED) {
            } else {
            }
            console.log('error', e);
        }, false);
    };

    this.init();
};