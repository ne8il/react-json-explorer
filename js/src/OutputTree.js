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
        return <div className="mapRow"><div className="mapKey">{key} : </div> <OutputNode className="mapValue" leaf={value}/></div>
      });

      return <div className="map">
      {String.fromCharCode(123)}
      {nodes.toJS()}
      {String.fromCharCode(125)}
      </div>;
    }else if(Immutable.List.isList(this.props.leaf)){
      var nodes = this.props.leaf.map(function(value, index){
        return <OutputNode leaf={value} className="arrayValue"/>
      });

      return <div className="array">{nodes.toJS()}</div>;
    }else{
      return <div className={this.props.className}>{String(this.props.leaf)}</div>;
    }
  }
});

module.exports = OutputTree;
