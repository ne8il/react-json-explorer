var React = require('react');

var JsonInput = React.createClass({
  getInitialState: function() {
    return this.props;
  },
  handleChange: function(event) {
    var {value} = event.target;
    this.setState({value: value});
    this.props.onInputChange(value);
  },
  render : function(){
    return <textarea value={this.state.value} onChange={this.handleChange}></textarea>
  }
});

module.exports = JsonInput;
