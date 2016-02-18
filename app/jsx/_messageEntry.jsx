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