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
                                <p><strong>{this.props.data.title}</strong> <span className="date"><small>{this.props.data.pubDate}
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
            this.setState({entries: entries});
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

    requestPublished: function () {
        dispatcher.dispatch({type: 'request.published'});
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
                        <li className="active"><a onClick={this.requestPublished} className="navbar-brand"
                                                  href="#">0</a></li>
                        <li className="active"><a onClick={this.requestAll} className="navbar-brand" href="#"><span
                            className="glyphicon glyphicon-retweet" aria-hidden="true"></span></a></li>
                    </ul>
                </div>
            </div>
        </nav>
    }
});

var MessageNotificationStore = function () {

    this.entries = [];
    this.serverUrl = {
        'dev': {
            '/rest/message': '/rest/data.json',
            '/rest/message/type/PUBLISHED': '/rest/data.published.json'
        },
        'production': {
            '/rest/message': '/rest/message',
            '/rest/message/type/PUBLISHED': '/rest/message/type/PUBLISHED'
        },
        'localhost': {
            '/rest/message': 'http://localhost:8090/rest/message',
            '/rest/message/type/PUBLISHED': 'http://localhost:8090/message/type/PUBLISHED'
        }
    };

    this.restUrl = this.serverUrl['dev'];

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
            case 'request.published' :
                this.requestPublished();
                break;
            case 'request.all' :
                this.request();
                break;
        }
    }.bind(this));

    this._notify = function () {
        console.info('notify: ', this.entries);

        emitter.emit('changed', this.entries);
    };

    this.markEntry = function (payload) {

        _.find(this.entries, {id: payload.data.id}).type = 'READED';

        this._notify();
    };

    this.checkEntry = function (payload) {

        _.find(this.entries, {id: payload.data.id}).checked = payload.data.checked;

        this._notify();
    };

    this.deleteEntry = function (payload) {
        console.info('deleteEntry: ', payload.data);

        this.entries = _.without(this.entries, payload.data);

        this._notify();
    };

    this.deleteCheckedEntries = function () {
        console.info('deleteCheckedEntries: ');

        var checkedEntry = null;
        while (checkedEntry = _.find(this.entries, function (data) {
            return data.checked
        })) {
            this.entries = _.without(this.entries, checkedEntry);
        }
        this._notify();
    };

    this.checkAllEntries = function (payload) {
        console.info('checkAllEntries: ', payload.data);

        _.each(this.entries, function (data) {
            data.checked = payload.data;
        });

        this._notify();
    };

    this.markCheckedEntries = function () {
        console.info('markCheckedEntries: ');
        _.each(this.entries, function (data) {
            if (data.checked) {
                data.type = 'READED';
            }
        });

        this._notify();
    };

    this.request = function () {
        $.get(this.restUrl['/rest/message'], function (entries) {
            this.entries = entries;
            this._notify();
        }.bind(this));
    };

    this.requestPublished = function () {
        $.get(this.restUrl['/rest/message/type/PUBLISHED'], function (entries) {
            this.entries = _.union(this.entries, entries);
            this._notify();
        }.bind(this));
    }
};

var emitter = new EventEmitter();
var dispatcher = new Flux.Dispatcher();
var store = new MessageNotificationStore();

ReactDOM.render(<MessageNotificationApp />, document.getElementById('container'));