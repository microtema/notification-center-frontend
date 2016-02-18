var MessageNotificationApp = React.createClass({
    render: function () {
        return <div className="container message-motification-container">
            <MessageNotificationHeader />
            <MessageNotificationActionBar />
            <MessageNotificationTable filterText=""/>
        </div>
    }
});