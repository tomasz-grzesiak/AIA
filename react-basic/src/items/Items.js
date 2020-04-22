import React from 'react'

import './Items.css'
import Item from '../item/Item'

class Items extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [
                {id: 1, first: 'Dylan', last: 'Smith', age: 67},
                {id: 2, first: 'Robin', last: 'Green', age: 82},
                {id: 3, first: 'Vincent', last: 'Lopez', age: 55}
            ]
        }
    }

    render() {
        return <div id="content">
                    <div id="content-header">
                        <div className="content-header-field">First name</div>
                        <div className="content-header-field">Last name</div>
                        <div className="content-header-field">Age</div>
                        <div className="content-header-field">Actions</div>
                    </div>
                {this.state.items.map(item => <Item content={item} key={item.id}/>)}
        </div>
    }
}

export default Items;