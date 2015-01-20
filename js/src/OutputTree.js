var React = require('react')
var Immutable = require('immutable');

var OutputTree = React.createClass({
  render: function(){
    var tree = Immutable.fromJS(JSON.parse(this.props.tree));
    return <div className="tree"><OutputNode leaf={tree}></OutputNode></div>;
  }
});

var OutputMapNode = React.createClass({
  getInitialState : function(){
    return {collapsed : false}
  },
  handleToggle : function(e){
    this.setState({collapsed : !this.state.collapsed});
    return false;
  },
  render : function(){

    var str = <a href="#" onClick={this.handleToggle}>{this.state.collapsed ? '+' : '-'}</a>;

    if(this.state.collapsed){
        return <div className="mapRow">{str} [Object object]</div>
    }

    var nodes = this.props.leaf.map(function(value, key){
      return <div className="mapRow"><div className="mapKey">{key} : </div> <OutputNode className="mapValue" leaf={value}/></div>
    });

    return <div className="map">
    {str} 
    {String.fromCharCode(123)}
    {nodes.toJS()}
    {String.fromCharCode(125)}
    </div>;
  }
});

var OutputListNode = React.createClass({
  render : function(){
    var nodes = this.props.leaf.map(function(value, index){
      return <OutputNode leaf={value} className="arrayValue"/>
    });

    return <div className="array">{nodes.toJS()}</div>;
  }
});

var OutputNode = React.createClass({
  render : function(){
    if(Immutable.Map.isMap(this.props.leaf)){
      return <OutputMapNode {...this.props} />;
    }else if(Immutable.List.isList(this.props.leaf)){
      return <OutputListNode {...this.props} />;
    }else{
      return <div className={this.props.className}>{String(this.props.leaf)}</div>;
    }
  }
});

module.exports = OutputTree;
