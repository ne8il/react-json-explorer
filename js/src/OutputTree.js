var React = require('react')
var Immutable = require('immutable');

var OutputTree = React.createClass({

  getInitialState : function(){
    return {collapsed : false}
  },
  handleToggle : function(e){
    this.setState({collapsed : !this.state.collapsed});
    return false;
  },

  getList : function(tree){
    return tree.map((value, key) =>
        <tr className="mapRow">
          <td className="mapKey">{key} : </td>
          <td><OutputTree className="mapValue" tree={value}/></td>
        </tr>
    );
  },

  getRows : function(tree){
    return this.getList(tree).toJS();
  },

  render: function(){
    var tree = this.props.tree;
    var isMap = Immutable.Map.isMap(tree);
    var isList = Immutable.List.isList(tree);
    var header = isMap ? "Object" : "Array";

    if(isMap || isList ){
      var collapseToggle = <a href="#" onClick={this.handleToggle}>{this.state.collapsed ? '+' : '-'}</a>;

      if(this.state.collapsed){
          if(isMap){
            return <div className="mapRow">{collapseToggle} {String.fromCharCode(123)}...{String.fromCharCode(125)}</div>
          }else{
            return <div className="mapRow">{collapseToggle} [...]</div>
          }
      }

      return <table className="tree">
        <thead><tr><th colSpan="2">{header} {collapseToggle}</th></tr></thead>

        <tbody>
          {this.getRows(tree)}
        </tbody>
      </table>;
    }else{
      return <PrimitiveNode val={tree}/>
    }
  }
});

var PrimitiveNode = React.createClass({
  render : function(){
    var type = typeof this.props.val;
    console.log(typeof this.props.val);
    return <span className={type}>{String(this.props.val)}</span>;
  }
});

module.exports = OutputTree;
