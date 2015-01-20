var React = require('react')
var Immutable = require('immutable');
var JsonInput = require('./JsonInput.js');
var OutputTree = require('./OutputTree.js');

var ValidationMessage = React.createClass({
  render : function(){
    return <div class="message">{this.props.text}</div>
  }
});

var Page = React.createClass({
  getInitialState : function(){
    var initial = '{"key":"value","arrayKey":[1,2,3,4]}';
    return {value: initial, validInput : true};
  },
  onInputChange : function(val) {
    try{
      var parse = JSON.parse(val);

      this.setState({
        value : val,
        validInput : true
      });
    }catch(e){
      this.setState({
        validInput : false
      })
    }
  },
  render : function(){
    var outputMessage = this.state.validInput ? '' : <ValidationMessage text='Invalid JSON'/>;

    return <div>
            Input : {outputMessage}
            <JsonInput value={this.state.value} onInputChange={this.onInputChange}/>

            Output : 
            <OutputTree tree={this.state.value}/>
          </div>
  }
});

React.render(
  <Page/>,
  document.getElementById('page')
);
