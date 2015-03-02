var React = require('react');

var PreviousValueItem = React.createClass({
  getInitialState : function(){
    return {
      value : this.props.value,
      created : new Date()
    }
  },
  render : function(){
    var createdDate = this.state.created.toISOString();

    return <li className="previousValue">
      {this.props.index} : (Created {createdDate}) <br />
      Value : <span className="previousValueJSON">{this.props.value}</span>
    </li>
  }
});

var PreviousValueList = React.createClass({
  render : function(){
    var PreviousValues = this.props.values.map((value, index) => <PreviousValueItem value={value} index={index}/>);
    return <ul>{PreviousValues.toJS()}</ul>;
  }
});

module.exports = PreviousValueList;
