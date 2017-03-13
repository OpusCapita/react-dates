import React, { Component, PropTypes } from 'react';
import './DemoComponent.less';

export default
class DemoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicks: 0
    };
  }

  incrementClicks() {
    this.setState({ clicks: this.state.clicks + 1 });
  }

  handleButtonClick() {
    this.props.onClick();
    this.incrementClicks();
  }

  render() {
    let label = this.props.label || "Give me back my label!";
    let { clicks } = this.state;
    return (
      <div>
        <button
          className="welcome-button"
          onClick={this.handleButtonClick.bind(this)}
        >
          {label}
        </button>
        <hr/>
        <div>
          <span>Clicked: </span>
          <strong>{clicks} </strong>
          <span>times</span>
        </div>
      </div>
    );
  }
}

DemoComponent.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func
};
DemoComponent.defaultProps = {
  onClick: () => {}
}
