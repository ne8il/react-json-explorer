var React = require('react')
var Immutable = require('immutable');
var JsonInput = require('./JsonInput.js');
var OutputTree = require('./OutputTree.js');
var store = require('store');

var ValidationMessage = React.createClass({
  render : function(){
    return <div className="message">{this.props.text}</div>
  }
});

var Page = React.createClass({
  getInitialState : function(){
    var inputValue = store.get('inputValue');
    var valid = (inputValue && this._isValidJson(inputValue));
    console.log(valid);

    var initial =  valid ? inputValue : '{"key":"value","arrayKey":[1,2,3,4]}';
    return {value: initial, validInput : true};
  },
  _isValidJson : function(str){
    var valid = true;
    try {
      JSON.parse(str);
    }catch(e){
      console.log('false');
      valid = false;
    }finally{
      return valid;
    }
  },
  onInputChange : function(val) {
    try{
      var parse = JSON.parse(val);

      this.setState({
        value : val,
        validInput : true
      });
      store.set('inputValue', val);

    }catch(e){
      this.setState({
        validInput : false
      })
    }
  },
  render : function(){
    var outputMessage = this.state.validInput ? '' : <ValidationMessage text='Invalid JSON'/>;

    return <div>
            <h3>Input</h3>
            {outputMessage}

            <JsonInput value={this.state.value} onInputChange={this.onInputChange}/>

            <h3>Output</h3>
            (<span className="number">Number</span>
            - <span className="string">String</span> - <span className="boolean">Boolean</span> - <span className="object">Object</span>
             - <span className="array">Array</span>
             - <span className="null">null</span>
             - <span className="undefined">undefined</span>)
            <OutputTree tree={Immutable.fromJS(JSON.parse(this.state.value))}/>
          </div>
  }
});

React.render(
  <Page/>,
  document.getElementById('page')
);
