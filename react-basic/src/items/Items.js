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
                {id: 3, first: 'Vincent', last: 'Lopez', age: 55},
                {id: 4, first: 'Anna', last: 'Vanic', age: 23}
            ],
            sortFirst: false,
            sortLast: false,
            sortAge: false
        };
    }

    addRow() {//TODO something wrong
        const items = this.state.items;
        items.push({id: items[items.length -1].id+1, first: '', last: '', age: 0});
        this.setState(items);
        console.log(items);
    }

    removeRow = id => { // TODO something wrong
        let items = this.state.items;
        items = items.filter(item => item.id !== id);
        this.setState(items);
        console.log(items);
    }

    sortByFirst() {
        const items = this.state.items;
        this.state.sortFirst ? 
            this.setState({items: items.sort((a, b) => (a.first > b.first) ? -1 : 1)}) :
            this.setState({items: items.sort((a, b) => (a.first > b.first) ? 1 : -1)});
        this.setState({sortFirst: !this.state.sortFirst});
    }

    sortByLast() {
        const items = this.state.items;
        this.state.sortLast ? 
            this.setState({items: items.sort((a, b) => (a.last > b.last) ? -1 : 1)}) :
            this.setState({items: items.sort((a, b) => (a.last > b.last) ? 1 : -1)});
        this.setState({sortLast: !this.state.sortLast});
    }

    sortByAge() {
        const items = this.state.items;
        this.state.sortAge ? 
            items.sort((a, b) => (a.age > b.age) ? -1 : 1) :
            items.sort((a, b) => (a.age > b.age) ? 1 : -1);
        this.setState(items);
        this.setState({sortAge: !this.state.sortAge});
    }

    render() {
        return <div id="content">
                    <div id="content-header">
                        <div className="content-header-field" onClick={() => this.sortByFirst()}>First name</div>
                        <div className="content-header-field" onClick={() => this.sortByLast()}>Last name</div>
                        <div className="content-header-field" onClick={() => this.sortByAge()}>Age</div>
                        <div className="content-header-field">Actions</div>
                    </div>
                {this.state.items.map(item => <Item key={item.id} content={item} onRemove={this.removeRow}/>)}
                <button id="addButton" onClick={() => this.addRow()}>Add row</button>
        </div>
    }
}

export default Items;