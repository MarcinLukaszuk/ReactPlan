import React from 'react';
import ColorList from './Calendar/ColorList.js';


const LeftMenu = ({ colors,filter }) => {

    return ( 
        <div className="col-sm-2"> 
            <ColorList colors={colors} filter={filter} />
        </div>
    );
}

export default LeftMenu;
