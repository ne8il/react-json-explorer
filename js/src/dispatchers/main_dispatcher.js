var Dispatcher = require('flux').Dispatcher;
var assign = require('object-assign');

var appDispatcher = assign(new Dispatcher(), {
    handleViewAction: function (action) {
        this.dispatch({
            source: 'view',
            action: action
        });
    }
});

module.exports = appDispatcher;
