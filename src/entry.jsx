import React from 'react';  
import Router from 'react-router';  
import { DefaultRoute, Link, Route, RouteHandler } from 'react-router';

import Homepage from './pages/Homepage.jsx';

let App = React.createClass({  
    render() {
        return (
            <div className="App"> 
                <Homepage/>
                <RouteHandler/>
            </div>
        );
    }
});

let routes = (  
    <Route name="app" path="/" handler={App}>
    </Route>
);

Router.run(routes, function (Handler) {  
    React.render(<Handler/>, document.body);
});