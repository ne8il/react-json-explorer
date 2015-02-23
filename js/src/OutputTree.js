var React = require('react')
var Immutable = require('immutable');

var OutputTree = React.createClass({

  getList : function(tree){
    return tree.map(function(value, key){
      console.log(value);
      console.log(key);

      return <tr className="mapRow">
                <td className="mapKey">{key} : </td>
                <td><OutputTree className="mapValue" tree={value}/></td>
              </tr>
    }).toJS();
  },

  getRows : function(tree){
    if(Immutable.Map.isMap(tree) || Immutable.List.isList(tree) ){
      console.log('get list for tree');
      return this.getList(tree);
    }else{
      console.log('get regular node');
      return <tr><td>{String(tree)}</td></tr>;
    }
  },

  render: function(){
    var tree = this.props.tree;
    console.log(tree);
    console.log('tree');
    return <table className="tree">
      <tbody>
        {this.getRows(tree)}
      </tbody>
    </table>;
  }
});

/*
var OutputMapNode = React.createClass({
  getInitialState : function(){
    return {collapsed : false}
  },
  handleToggle : function(e){
    this.setState({collapsed : !this.state.collapsed});
    return false;
  },
  render : function(){

    var collapseToggle = <a href="#" onClick={this.handleToggle}>{this.state.collapsed ? '+' : '-'}</a>;

    if(this.state.collapsed){
        return <div className="mapRow">{collapseToggle} {String.fromCharCode(123)}...{String.fromCharCode(125)}</div>
    }

    var nodes = this.props.leaf.map(function(value, key){
      return <tr className="mapRow"><td className="mapKey">{key} : </td> <td><OutputNode className="mapValue" leaf={value}/></td></tr>
    });

    return <table><tbody>{nodes.toJS()}</tbody></table>;

  }
});
*/

/*
var OutputListNode = React.createClass({
  render : function(){
    var nodes = this.props.leaf.map(function(value, index){
      return <tr>
      <td>{index}</td>
                <td><OutputNode leaf={value} className="arrayValue"/></td></tr>
    });

    return <table><tbody>[{nodes.toJS()}]</tbody></table>;
  }
});
*/

module.exports = OutputTree;
