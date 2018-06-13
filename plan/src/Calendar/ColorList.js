import React, { Component } from 'react';
import ColorItem from './ColorItem.js';
class ColorList extends Component {
  
  colorToColorItem = col => {
    const person = col.prop;
    const color = col.color;
    const key = col.counter;
    return <ColorItem color={color} person={person} key={key} filtruj={this.props.filter} />;
  };

  render() {
    return (
      <div >
        {(this.props.colors || {}).map(this.colorToColorItem)}
      </div>
    );
  }
}
export default ColorList;