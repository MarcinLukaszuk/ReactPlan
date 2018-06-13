import React, { Component } from 'react';

class ColorItem extends Component {

   
   
    render() {
        return (
            <div>
                <div className="well well-sm" style={{ background: this.props.color }} onClick={this.props.filtruj}>  {this.props.person}</div>
            </div>
        );
    }
}
export default ColorItem;