import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import containers from './containers';

//import * as serviceWorker from './serviceWorker';

//ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();


var params = new URLSearchParams(window.location.search)
var DEVSERVER = params.get('devserver') === '1';

var target = window;
if (DEVSERVER) {
    document.domain = 'localhost';
    target = window.parent;
}

target.React = React;
target.ReactDOM = ReactDOM;
target.Components = containers;

function copyStylesToParent() {
    console.log('- Polling copyStylesToParent');

    var localStyles = [...document.getElementsByTagName('style')];
    var parentDocument = window.parent.document

    if (parentDocument.getElementById('parent-style-wrapper')) {
        parentDocument.getElementById('parent-style-wrapper').remove();
    }

    var styleWrapper = parentDocument.createElement('div')
    styleWrapper.setAttribute('id', 'parent-style-wrapper')

    localStyles.forEach(localStyle => {
        var style = localStyle.cloneNode(true);
        styleWrapper.appendChild(style);
    });

    parentDocument.body.appendChild(styleWrapper);
}

if (DEVSERVER) {
    copyStylesToParent();
    setInterval(copyStylesToParent, 1000);
}
