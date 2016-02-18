#Describe Message Notification Project

### Install
* **npm install:** ( install all in package.json)
* **bower update:**  ( install all dependencies in bower.json)
* **grunt server:**  ( start node.js server)
* **grunt install:** ( compile , test, build)
* **grunt test:**    ( run karma test)
* **grunt:**         ( run watch task to compile *.jsx to js/*.js)


We'll be building a simple but realistic Message Notification Center that you can read and edit, a basic version of the realtime Messages offered by RESTServer.

We'll provide:

* A view of all of the Messages
* A form to search a Message
* Hooks for you to provide a SSE backend

It'll also have a few neat features:

* **Live loading:** Messages appear in the list.
* **Live updates:** New Messages are popped into the comment view in real time.
* **Mark Messages:** users can mark Messages as read.


### Running a server

In order to start this tutorial, we're going to require a running Node.JS server. This will serve purely as an API endpoint which we'll use for getting data. **

For sake of simplicity, the server we will run uses a `JSON` file as a database. You would not run this in production but it makes it easy to simulate what you might do when consuming an API. Once you start the server, it will support our API endpoint and it will also serve the static pages we need.

### Getting started

For this tutorial, we're going to make it as easy as possible. Included in the server package discussed above is an HTML file which we'll work in. Open up `/index.html` in your favorite editor. It should look something like this:

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="shortcut icon" href="https://www.udg.de/wp-content/uploads/2013/12/favicon_16x16.ico?143410" />
    <title>Message Notification Portal</title>
    <script src="../bower_components/react/react.js"></script>
    <script src="../bower_components/react/react-dom.js"></script>
    <script src="../bower_components/eventEmitter/EventEmitter.js"></script>
    <script src="../bower_components/flux/dist/Flux.js"></script>
    <script src="../bower_components/moment/min/moment.min.js"></script>
    <script src="../bower_components/jquery/dist/jquery.js"></script>
    <script src="../bower_components/underscore/underscore.js"></script>
    <script src="../bower_components/bootstrap/dist/js/bootstrap.js"></script>
    <link href="../bower_components/bootstrap/dist/css/bootstrap.css" rel="stylesheet" type="text/css"/>
    <link href="css/app.css" rel="stylesheet" type="text/css">

</head>
<body>
<div id="container" ></div>
<script src="js/app.js" ></script>
</body>
</html>
```

For the remainder of this tutorial, we'll be writing our JavaScript code in this script tag. We don't have any advanced live-reloading so you'll need to refresh your browser to see updates after saving. Follow your progress by opening `http://localhost:8000/app/index.html` in your browser (after starting the server). When you load this for the first time without any changes, you'll see the finished product of what we're going to build. When you're ready to start working, just delete the preceding `<script>` tag and then you can continue.

> Note:
>
> We included jQuery here because we want to simplify the code of our future ajax calls, but it's **NOT** mandatory for React to work.
