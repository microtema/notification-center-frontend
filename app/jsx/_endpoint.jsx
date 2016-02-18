var endpoint = (function () {
    return {
        'dev': {
            '/rest/message': function () {
                return '/rest/data.json'
            },
            '/rest/message/type': function () {
                return '/rest/data.unread.json'
            },
            '/sse': function () {
                return '/sse'
            }
        },
        'production': {
            '/rest/message': function (param) {
                return '/rest/message/' + (param || '')
            },
            '/rest/message/type': function (param) {
                return '/rest/message/type/' + (param || '')
            },
            '/sse': function () {
                return '/sse'
            }
        },
        'localhost': {
            '/rest/message': function (param) {
                return 'http://localhost:8090/rest/message/' + (param || '')
            },
            '/rest/message/type': function (param) {
                return 'http://localhost:8090/rest/message/type/' + (param || '')
            },
            '/sse': function (param) {
                return 'http://localhost:8090/sse' + (param || '')
            }
        }
    };
})();
