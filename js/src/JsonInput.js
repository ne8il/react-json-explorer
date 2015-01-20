var React = require('react')
var Immutable = require('immutable');

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
      'width' : "100%",
      'font-size' : '16px',
      'height' : 200
    }

    return <textarea style={styleProps} value={value} onChange={this.handleChange}></textarea>
  }
});

module.exports = JsonInput;
