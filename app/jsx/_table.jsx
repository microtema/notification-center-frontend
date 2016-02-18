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
                <th className="text-left">Display user notifications</th>
                <th className="dropdown-toggle" title="Select/Unselect all notifications">
                    <a href="#" onClick={this.checkEntries}><span className={this.state.checked ? 'glyphicon glyphicon-check': 'glyphicon glyphicon-unchecked'} aria-hidden="true"></span></a>
                </th>
                <th className="action" title="Mark all selected notifications as read"><a href="#" onClick={this.markCheckedEntries}><span
                    className="glyphicon glyphicon-bookmark" aria-hidden="true"></span></a></th>
                <th className="action" title="Delete all selected notifications"><a href="#" onClick={this.deleteCheckedEntries}><span
                    className="glyphicon glyphicon-remove" aria-hidden="true"></span></a></th>
            </tr>
            </thead>
            <tbody>
            {rows}
            </tbody>
        </table>
    }
});