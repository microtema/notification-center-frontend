'use strict';

var MessageNotificationApp = React.createClass({
    render: function () {
        return <div className="container message-motification-container">
            <MessageNotificationHeader />
            <MessageNotificationActionBar />
            <MessageNotificationTable filterText=""/>
        </div>
    }
});

var MessageNotificationHeader = React.createClass({
    render: function () {
        return <div className="row message-motification-header">
            <img className="pull-left" src="img/udg-logo.png" border="2"/>
            <h6 className="pull-right">designedbymario</h6>
        </div>
    }
});

var MessageEntry = React.createClass({

    checkEntry: function (e) {
        dispatcher.dispatch({type: 'check', data: {id: this.props.data.id, checked: !this.props.data.checked}});
    },

    markEntry: function (e) {
        dispatcher.dispatch({type: 'mark', data: {id: this.props.data.id}});
    },

    deleteEntry: function (e) {
        dispatcher.dispatch({type: 'delete', data: this.props.data});
    },

    render: function () {
        return <tr >
            <td className={this.props.data.type == 'UNREAD' ? 'danger index' : 'active index'}>
                <small>{this.props.data.index + 1}</small>
            </td>
            <td className="text-left description">
                <div className="paragraphs">
                    <div className="row">
                        <div className="span4">
                            <div className="clearfix content-heading">
                                <img className="pull-left img-responsive" src={this.props.data.image}/>
                                <p><strong>{this.props.data.title}</strong> <span className="date"><small>{moment(this.props.data.pubDate).format('LLLL')}
                                </small></span></p>
                                <p>{this.props.data.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </td>
            <td className="dropdown-toggle">
                <a href="#"><input type="checkbox" checked={this.props.data.checked} onChange={this.checkEntry}/></a>
            </td>
            <td className="action">
                <a href="#" onClick={this.markEntry}><span className="glyphicon glyphicon-eye-open"
                                                           aria-hidden="true"></span></a>
            </td>
            <td className="action">
                <a href="#" onClick={this.deleteEntry}><span className="glyphicon glyphicon-remove"
                                                             aria-hidden="true"></span></a>
            </td>
        </tr>
    }
});

var MessageNotificationTable = React.createClass({

    componentDidMount: function () {
        dispatcher.dispatch({type: 'request.all'});
    },

    componentWillMount: function () {
        emitter.on('changed', function (entries) {
            this.setState({entries: entries, countUnreaded: 0});
        }.bind(this));
    },

    getInitialState: function () {
        return {entries: [], checked: false};
    },

    markCheckedEntries: function () {
        dispatcher.dispatch({type: 'mark.checked'});
    },

    deleteCheckedEntries: function () {
        dispatcher.dispatch({type: 'delete.checked'});
    },

    checkEntries: function (e) {

        this.setState({checked: !this.state.checked});
        dispatcher.dispatch({type: 'check.all', data: !this.state.checked});
    },

    render: function () {

        var props = this.props;
        var rows = this.state.entries
            .filter(function (data) {
                var filterText = props.filterText.toLocaleLowerCase();
                for (var p in data) {
                    if ((data[p] + '').toLocaleLowerCase().indexOf(filterText) > -1) {
                        return true;
                    }
                }
                return false;
            })
            .map(function (data, index) {
                data.index = index;
                return <MessageEntry key={data.id} data={data}/>
            });

        return <table className="table table-hover message-motification-table">
            <thead>
            <tr>
                <th className="index">#</th>
                <th className="text-left">Message Notification Portal</th>
                <th className="dropdown-toggle"><input type="checkbox" value={this.state.checked}
                                                       onChange={this.checkEntries}/>
                </th>
                <th className="action"><a href="#" onClick={this.markCheckedEntries}><span
                    className="glyphicon glyphicon-eye-open" aria-hidden="true"></span></a></th>
                <th className="action"><a href="#" onClick={this.deleteCheckedEntries}><span
                    className="glyphicon glyphicon-remove" aria-hidden="true"></span></a></th>
            </tr>
            </thead>
            <tbody>
            {rows}
            </tbody>
        </table>
    }
});


var MessageNotificationActionBar = React.createClass({

    componentWillMount: function () {
        emitter.on('unread.count', function (count) {
            console.info('unread.count: ', count);
            this.setState({countUnreaded: count});
        }.bind(this));
    },

    getInitialState: function () {
        return {countUnreaded: 0};
    },

    requestAll: function () {
        dispatcher.dispatch({type: 'request.all'});
    },

    render: function () {
        return <nav className="navbar navbar-default">
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <form className="navbar-form navbar-left" role="search">
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Search for..."/>
                <span className="input-group-btn">
                    <button className="btn btn-default" type="button">Go</button>
                </span>
                        </div>
                    </form>
                    <ul className="nav navbar-nav navbar-right">
                        <li className="active"><a onClick={this.requestAll} className="navbar-brand"
                                                  href="#">{this.state.countUnreaded}</a></li>
                        <li className="active"><a onClick={this.requestAll} className="navbar-brand" href="#"><span
                            className="glyphicon glyphicon-retweet" aria-hidden="true"></span></a></li>
                    </ul>
                </div>
            </div>
        </nav>
    }
});

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

var MessageNotificationStore = function () {

    this.entries = [];
    this.restUrl = endpoint['localhost'];

    dispatcher.register(function (payload) {
        console.info('on event: ', payload.type);

        switch (payload.type) {
            case 'check.all' :
                this.checkAllEntries(payload);
                break;
            case 'check' :
                this.checkEntry(payload);
                break;
            case 'mark' :
                this.markEntry(payload);
                break;
            case 'mark.checked' :
                this.markCheckedEntries();
                break;
            case 'delete' :
                this.deleteEntry(payload);
                break;
            case 'delete.checked' :
                this.deleteCheckedEntries();
                break;
            case 'request.all' :
                this.request();
                break;
            case 'update.unreaded.count' :
                this.updateUnreadedCount();
                break;
        }
    }.bind(this));

    this._notify = function () {
        console.info('notify: ', this.entries);

        emitter.emit('changed', this.entries);

        emitter.emit('unread.count', _.filter(this.entries, function (data) {
            return data.type == 'UNREAD'
        }).length);
    };

    this.checkEntry = function (payload) {

        _.find(this.entries, {id: payload.data.id}).checked = payload.data.checked;

        this._notify();
    };

    this.deleteEntry = function (payload) {
        console.info('deleteEntry: ', payload.data);

        $.ajax({
            url: this.restUrl['/rest/message'](payload.data.id),
            type: 'DELETE',
            success: function (data) {
                this.entries = _.without(this.entries, payload.data);
                this._notify();
            }.bind(this)
        });
    };

    this.deleteCheckedEntries = function () {

        var checkedEntries = _.filter(this.entries, function (data) {
            return data.checked === true
        });

        var entriesIds = _.map(checkedEntries, function (data) {
            return data.id
        });

        console.info('deleteCheckedEntries', entriesIds);

        $.ajax({
            url: this.restUrl['/rest/message'](entriesIds.join(',')),
            type: 'DELETE',
            success: function (data) {

                for (var index = 0; index < checkedEntries.length; index++) {
                    this.entries = _.without(this.entries, checkedEntries[index]);
                }

                this._notify();

            }.bind(this)
        });
    };

    this.checkAllEntries = function (payload) {
        console.info('checkAllEntries: ', payload.data);

        _.each(this.entries, function (data) {
            data.checked = payload.data;
        });

        this._notify();
    };

    this.markEntry = function (payload) {

        this._markCheckedEntries([payload.data]);
    };

    this.markCheckedEntries = function () {

        this._markCheckedEntries(_.filter(this.entries, function (data) {
            return data.checked === true
        }));
    };

    this._markCheckedEntries = function (checkedEntries) {

        var entriesIds = _.map(checkedEntries, function (data) {
            return data.id
        });

        console.info('markCheckedEntries', entriesIds);

        $.ajax({
            url: this.restUrl['/rest/message'](entriesIds.join(',')),
            type: 'POST',
            success: function (data) {

                for (var index = 0; index < checkedEntries.length; index++) {
                    _.find(this.entries, checkedEntries[index]).type = 'READ';
                }

                this._notify();

            }.bind(this)
        });

    };

    this.request = function () {
        $.get(this.restUrl['/rest/message'](), function (entries) {
            this.entries = entries;
            this._notify();
        }.bind(this));
    };

    this.updateUnreadedCount = function () {
        $.get(this.restUrl['/rest/message/type']('UNREAD'), function (entries) {
            emitter.emit('unread.count', entries.length);
        }.bind(this));
    }

};

var emitter = new EventEmitter();
var dispatcher = new Flux.Dispatcher();
var store = new MessageNotificationStore();
var sse = new SsEventSource();

ReactDOM.render(<MessageNotificationApp />, document.getElementById('container'));