import React from 'react'

import './Items.css'
import data from '../characters.json'
import Item from '../item/Item'

class Items extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items: data,
            search: '',
            sortName: false,
            sortRating: false
        };
    }

    addRow() {
        const items = this.state.items;
        const id = items.length > 0 ? items.reduce((a,b) => a.id > b.id ? a : b).id + 1 : 1;
        items.push({id: id, image: '', name: '', description: '', rating: 0});
        this.setState({items: items});
    }

    saveRow = row => {
        const items = this.state.items;
        items[items.findIndex(item => item.id === row.id)] = row;
        this.setState({items: items});
    }

    removeRow = id => {
        this.setState({items: this.state.items.filter(item => item.id !== id)});
    }

    sortByName() {
        const items = this.state.items;
        this.state.sortName ? 
            this.setState({items: items.sort((a, b) => (a.name >= b.name) ? -1 : 1)}) :
            this.setState({items: items.sort((a, b) => (a.name >= b.name) ? 1 : -1)});
        this.setState({sortName: !this.state.sortName, sortRating: false});
    }

    sortByRating() {
        const items = this.state.items;
        this.state.sortRating ? 
            items.sort((a, b) => (a.rating >= b.rating) ? -1 : 1) :
            items.sort((a, b) => (a.rating >= b.rating) ? 1 : -1);
        this.setState(items);
        this.setState({sortName: false, sortRating: !this.state.sortRating});
    }

    searchChange(event) {
        this.setState({search: event.target.value});
        console.log(this.state.items)
    }

    render() {
        return <div id="content">
                    <div id="content-header">
                        <div className="content-header-field">Image</div>
                        <div className="content-header-field cursor" onClick={() => this.sortByName()}>Name</div>
                        <div className="content-header-field">Description</div>
                        <div className="content-header-field cursor" onClick={() => this.sortByRating()}>Rating</div>
                        <div className="content-header-field"><input type="search" value={this.state.search} 
                            onChange={this.searchChange.bind(this)} placeholder="Search by name"/></div>
                    </div>
                {this.state.items.filter(item => item.name.toLowerCase().includes(this.state.search))
                    .map(item => <Item key={item.id} content={item} onRemove={this.removeRow} onSave={this.saveRow}/>)}
                <button id="addButton" onClick={() => this.addRow()}>Add row</button>
        </div>
    }
}

export default Items;