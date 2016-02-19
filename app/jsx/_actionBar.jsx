var MessageNotificationActionBar = React.createClass({

    componentWillMount: function () {
        emitter.on('unread.count', function (count) {
            console.info('unread.count: ', count);
            this.setState({countUnreaded: count, active: count > 0});
        }.bind(this));
    },

    getInitialState: function () {
        return {countUnreaded: 0, active: false};
    },

    requestAll: function () {
        dispatcher.dispatch({type: 'request.all'});
    },

    handleChange: function (e) {
        this.props.onSearch(e.target.value);
    },

    render: function () {
        return <nav className="navbar navbar-default">
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <form className="navbar-form navbar-left" role="search">
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Search for..." onChange={this.handleChange}/>
                <span className="input-group-btn">
                    <button className="btn btn-default" type="button">Go</button>
                </span>
                        </div>
                    </form>
                    <ul className="nav navbar-nav navbar-right">

                        <li className={this.state.active ? 'active': ''}
                            title={this.state.countUnreaded > 0 ? 'You have '+this.state.countUnreaded + ' unread notifications': 'You have no unread notification'}>
                            <a onClick={this.requestAll} className="navbar-brand" href="#">
                                <span className="glyphicon glyphicon-bell"
                                      aria-hidden="true"></span>
                            </a>
                        </li>
                        <li className={this.state.active ? 'active': ''}
                            title={this.state.countUnreaded > 0 ? 'You have '+this.state.countUnreaded + ' unread notification': 'You have no unread notification'}>
                            <a onClick={this.requestAll}
                               className="navbar-brand"
                               href="#">{this.state.countUnreaded}</a></li>
                        <li className={this.state.active ? 'active': ''} title="Reload"><a onClick={this.requestAll}
                                                                                           className="navbar-brand"
                                                                                           href="#"><span
                            className="glyphicon glyphicon-retweet" aria-hidden="true"></span></a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    }
});