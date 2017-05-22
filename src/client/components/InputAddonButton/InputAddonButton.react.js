import React, { Component, PropTypes } from 'react';
import './InputAddonButton.less';

let propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
};

let defaultProps = {
  className: '',
  disabled: false,
  onClick: () => {}
};

export default
class InputAddonButton extends Component {
  handleOnClick(e) {
    if (!this.props.disabled) {
      this.props.onClick(e);
    }
  }

  render() {
    let {
      children,
      className,
      onClick,
      disabled,
      ...restProps
    } = this.props;

    return (
      <div
        className={`
          opuscapita_input-addon-button
          ${disabled ? 'opuscapita_input-addon-button--disabled' : ''}
          ${className}`
        }
        onClick={this.handleOnClick.bind(this)}
        {...restProps}
      >
        {children}
      </div>
    );
  }
}

InputAddonButton.propTypes = propTypes;
InputAddonButton.defaultProps = defaultProps;
