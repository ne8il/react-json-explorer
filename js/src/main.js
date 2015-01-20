var React = require('react')
var Immutable = require('immutable');

var OutputTree = React.createClass({
  render: function(){
    var tree = Immutable.fromJS(JSON.parse(this.props.tree));

    return <div className="tree"><OutputNode leaf={tree}></OutputNode></div>;
  }
});

var OutputNode = React.createClass({
  render : function(){

    if(Immutable.Map.isMap(this.props.leaf)){
      var nodes = this.props.leaf.map(function(value, key){
          return <div><div className="key">{key} : </div><div className="value"><OutputNode leaf={value}/></div></div>
      });

      return <div className="map">{nodes.toJS()}</div>;
    }else if(Immutable.List.isList(this.props.leaf)){
      var nodes = this.props.leaf.map(function(value, index){
        return <OutputNode leaf={value}/>
      });

      return <div className="array">{nodes.toJS()}</div>;
    }else{
      return <div>{String(this.props.leaf)}</div>;
    }
  }
});

var JsonInput = React.createClass({
  getInitialState: function() {
    return this.props;
  },
  handleChange: function(event) {
    var val = event.target.value;
    this.setState({value: val});
    this.props.onInputChange(val);
  },
  render : function(){
    var value = this.state.value;
    var styleProps = {
      'width' : 500,
      'height' : 200
    }

    return <textarea style={styleProps} value={value} onChange={this.handleChange}></textarea>
  }
});

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
            {outputMessage}
            <JsonInput value={this.state.value} onInputChange={this.onInputChange}/>
            <OutputTree tree={this.state.value}/>
          </div>
  }
});

React.render(
  <Page/>,
  document.getElementById('output')
);
