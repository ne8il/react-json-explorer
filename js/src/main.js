var React = require('react')
var Immutable = require('immutable');
var JsonInput = require('./JsonInput.js');
var OutputTree = require('./OutputTree.js');
var PreviousValueList = require('./PreviousValueList.js');
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

    var initial =  valid ? inputValue : '{"key":"value","arrayKey":[1,2,3,4]}';

    return {value: initial, validInput : true, previousValues : new Immutable.List() };
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
      console.log(this.state.previousValues);

      this.setState({
        value : val,
        validInput : true,
        previousValues : this.state.previousValues.unshift(val)
      });

      console.log(this.state.previousValues.toJS());

      store.set('inputValue', val);

    }catch(e){
      console.log(e);

      this.setState({
        validInput : false
      })
    }
  },
  render : function(){
    var outputMessage = this.state.validInput ? '' : <ValidationMessage text='Invalid JSON'/>;

    var exampleStyle = {padding:"10px"};

    return <table>
          <tr>
          <td className="main">
            <h3>Input</h3>
            {outputMessage}

            <JsonInput value={this.state.value} onInputChange={this.onInputChange}/>

            <h3>Output</h3>
            <div style={exampleStyle}>
            <span className="number type">Number</span>
            - <span className="string type">String</span>
             - <span className="boolean type">Boolean</span>
             - <span className="object type">Object</span>
             - <span className="array type">Array</span>
             - <span className="null type">null</span>
             - <span className="undefined type">undefined</span>
             </div>
            <OutputTree tree={Immutable.fromJS(JSON.parse(this.state.value))}/>
          </td>

          <td className="previousValues">
            <PreviousValueList values={this.state.previousValues} />
          </td>

          </tr>
          </table>
  }
});

React.render(
  <Page/>,
  document.getElementById('page')
);
