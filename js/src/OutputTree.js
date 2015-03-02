var React = require('react')
var Immutable = require('immutable');

function selectElementContents(el) {
    var range = document.createRange();
    range.selectNodeContents(el);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
}

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
        <tr>
          <td className="key">{key}</td>
          <td><OutputTree tree={value}/></td>
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
    var headerClass = header.toLowerCase();

    if(isMap || isList ){
      var collapseToggle = <a href="#" onClick={this.handleToggle}>{this.state.collapsed ? '+' : '-'}</a>;

      if(tree.size === 0){
        if(isMap){
          return <span>{String.fromCharCode(123)} {String.fromCharCode(125)}</span>
        }else{
          return <span>[ ]</span>
        }
      }
      if(this.state.collapsed){
          if(isMap){
            return <div>{collapseToggle} {String.fromCharCode(123)}...{String.fromCharCode(125)}</div>
          }else{
            return <div>{collapseToggle} [...]</div>
          }
      }

      return <table className="tree">
        <thead><tr><th className={headerClass} colSpan="2">{header} {collapseToggle}</th></tr></thead>

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
  onInputClick : function(e){
    selectElementContents(e.currentTarget);
  },

  render : function(){
    var {val} = this.props;

    var type = (val === null) ? 'null' :
                (val === undefined) ? 'undefined' :
                typeof val;
    type += ' type';

    return <span className={type} onClick={this.onInputClick}>{String(this.props.val)}</span>;
  }
});

module.exports = OutputTree;
