var MessageNotificationApp = React.createClass({

    render: function () {
        return <div className="container message-motification-container">
            <MessageNotificationHeader />
            <MessageNotificationActionBar onSearch={this.handleUserInput} filterText={this.state.filterText}/>
            <MessageNotificationTable filterText={this.state.filterText}/>
        </div>
    },

    getInitialState: function () {
        return {filterText: ''};
    },

    handleUserInput: function (searchTearm) {
        this.setState({filterText: searchTearm});
    }
});