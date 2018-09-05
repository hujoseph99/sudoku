import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import "./scrollBar.css";

const Handle = Slider.Handle;

const handle = (props) => {
  const { value, index , ...restProps } = props;
  return (
    <Handle value={value} {...restProps} />
  );
};

class ScrollBar extends React.Component {
  render() {
    return (
      <div className="scrollBar">
        <Slider 
          min={17}
          max={81}
          defaultValue={30}
          marks={{
            17 : <strong>17</strong>,
            81 : <strong>81</strong>,
          }}
          railStyle={{
            'height': '0.4em',
          }}
          trackStyle={{
            'backgroundColor': 'rgb(7, 76, 188)',
            'height': '0.4em',
          }}
          handleStyle={{
            'backgroundColor': 'rgb(7, 76, 188)',
            'borderColor': 'rgb(7, 76, 188)',
            'height': '1.2em',
            'width': '1.2em',
            'outline': 'none',
            'border': 'none',
          }}
          dotStyle={{
            'backgroundColor': 'transparent',
            'borderColor': 'transparent',
          }}
          onChange={(value) => this.props.handleChange(value)}
          handle={handle}
        />
      </div>
    );
  }
}

export default ScrollBar;