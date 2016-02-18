'use strict';

var MessageNotificationApp = React.createClass({
    render: function () {
        return <div className="container">
            <MessageNotificationHeader />
            <MessageNotificationActionBar />
            <MessageNotificationTable />
        </div>
    }
});

var MessageNotificationHeader = React.createClass({
    render: function () {
        return <div className="row text-center"><h2>Message Notification Portal</h2></div>
    }
});

var MessageNotificationTable = React.createClass({
    render: function () {
        return <table className="table table-hover message-motification-table">
            <thead>
            <tr>
                <th className="index">#</th>
                <th className="text-left">Message</th>
                <th className="dropdown-toggle"><input type="checkbox"/></th>
                <th className="action">&nbsp;</th>
                <th className="action">&nbsp;</th>

            </tr>
            </thead>
            <tbody>
            <tr>
                <td className="index">1</td>
                <td className="text-left">
                    <div className="paragraphs">
                        <div className="row">
                            <div className="span4">
                                <div className="clearfix content-heading">
                                    <img className="pull-left img-responsive" src="img/react.png"/>
                                    <p><strong>React A JAVASCRIPT LIBRARY FOR BUILDING USER INTERFACES</strong></p>
                                    <p>JUST THE UI
                                        Lots of people use React as the V in MVC. Since React makes no assumptions about
                                        the rest of your technology stack, it's easy to try it out on a small feature in
                                        an existing project.
                                    </p>
                                    <p>
                                        VIRTUAL DOM
                                        React abstracts away the DOM from you, giving a simpler programming model and
                                        better performance. React can also render on the server using Node, and it can
                                        power native apps using React Native.
                                    </p>
                                    <p>
                                        DATA FLOW
                                        React implements one-way reactive data flow which reduces boilerplate and is
                                        easier to reason about than traditional data binding.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </td>
                <td className="dropdown-toggle"><input type="checkbox"/></td>
                <td className="action"><span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span></td>
                <td className="action"><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></td>
            </tr>
            <tr className="warning">
                <td className="index ">2</td>
                <td className="text-left">
                    <div className="paragraphs">
                        <div className="row">
                            <div className="span4">
                                <div className="clearfix content-heading">
                                    <img className="pull-left img-responsive" src="img/html5.gif"/>
                                    <p><strong>HTML5</strong></p>
                                    <p> HTML5 is a markup language used for structuring and presenting content on the World Wide Web. It was finalized, and published, on 28 October 2014 by the World Wide Web Consortium (W3C).[2][3] This is the fifth revision of the HTML standard since the inception of the World Wide Web. The previous version, HTML 4, was standardized in 1997.

                                        Its core aims are to improve the language with support for the latest multimedia while keeping it easily readable by humans and consistently understood by computers and devices (web browsers, parsers, etc.). HTML5 is intended to subsume not only HTML 4, but also XHTML 1 and DOM Level 2 HTML.[4]

                                        Following its immediate predecessors HTML 4.01 and XHTML 1.1, HTML5 is a response to the fact that the HTML and XHTML in common use on the World Wide Web have a mixture of features introduced by various specifications, along with those introduced by software products such as web browsers and those established by common practice.[5] It is also an attempt to define a single markup language that can be written in either HTML or XHTML. It includes detailed processing models to encourage more interoperable implementations; it extends, improves and rationalizes the markup available for documents, and introduces markup and application programming interfaces (APIs) for complex web applications.[6] For the same reasons, HTML5 is also a potential candidate for cross-platform mobile applications. Many features of HTML5 have been designed with low-powered devices such as smartphones and tablets taken in to consideration. In December 2011, research firm Strategy Analytics forecast sales of HTML5 compatible phones would top 1 billion in 2013.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </td>
                <td className="dropdown-toggle"><input type="checkbox"/></td>
                <td className="action"><span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span></td>
                <td className="action"><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></td>
            </tr>
            </tbody>
        </table>
    }
});


var MessageNotificationActionBar = React.createClass({
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
                        <li className="active"><a className="navbar-brand" href="#">0</a></li>
                        <li className="active"><a className="navbar-brand" href="#"><span
                            className="glyphicon glyphicon-retweet" aria-hidden="true"></span></a></li>
                        <li className="dropdown">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button"
                               aria-haspopup="true" aria-expanded="false">Action<span className="caret"></span></a>
                            <ul className="dropdown-menu">
                                <li><a href="#"><span className="glyphicon glyphicon-remove" aria-hidden="true"></span>  Delete selected</a></li>
                                <li><a href="#"><span className="glyphicon glyphicon-eye-open" aria-hidden="true"></span>  Mark selected as readed</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    }
});

ReactDOM.render(<MessageNotificationApp />, document.getElementById('container'));