import React, { Component, PropTypes } from 'react';
import './InputAddonButton.less';

let propTypes = {
  className: PropTypes.string
};

let defaultProps = {
  className: ''
};

export default
class InputAddonButton extends Component {
  render() {
    let { children, className, ...restProps } = this.props;
    return (
      <div className={`opuscapita_input-addon-button ${className}`} {...restProps}>
        {children}
      </div>
    );
  }
}

InputAddonButton.propTypes = propTypes;
InputAddonButton.defaultProps = defaultProps;
