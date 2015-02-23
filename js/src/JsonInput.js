var React = require('react')
var Immutable = require('immutable');

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
    var value = this.state.value;
    var styleProps = {
      'width' : "100%",
      'font-size' : '16px',
      'height' : 200
    }

    return <textarea style={styleProps} value={value} onChange={this.handleChange}></textarea>
  }
});

module.exports = JsonInput;
