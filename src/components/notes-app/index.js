

import React, { Component } from "react";
import "./index.css";
import * as _ from 'lodash';
export default class NotesApp extends Component {

  constructor() {
    super();
    this.state = {
      name: '',
      status: '',
      books: [],
      selectedItems:[]
    }
  }

  updateText = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  addNote = () => {
    if (this.state.name && this.state.status) {
      const books = [...this.state.books];
      books.push({
        name: this.state.name,
        status: this.state.status
      });
      this.setState({
        books: books,
        selectedItems:books,
        name: '',
        status: ''
      });
    }
  }

  displayAllItems = () => {
    const books = [...this.state.books];
    const ascOrderedItems= _.orderBy(books,['status'],['asc']);
    this.setState({
      selectedItems:ascOrderedItems
    });
  }

  displayActiveItems = () => {
    const books = [...this.state.books];
    const activeBooks = books.filter((book)=>book.status.toLowerCase() === 'active');
    this.setState({
      selectedItems:activeBooks
    });
  }

  displayCompletedItems = () => {
    const books = [...this.state.books];
    const completedBooks = books.filter((book)=>book.status.toLowerCase() === 'completed');
    this.setState({
      selectedItems:completedBooks
    });
  }



  render() {
    const records = this.state.selectedItems && this.state.selectedItems.map((items, index) => {
      return (
        <tr key={index}>
          <td>{items.name}</td>
          <td>{items.status}</td>
        </tr>
      )
    });
    return (
      <div className="layout-column align-items-center justify-content-start">
        <section className="layout-row align-items-center justify-content-center mt-30">
          <input data-testid="input-note-name" name="name" type="text" className="large mx-8"
            placeholder="Note Title" onChange={this.updateText} value={this.state.name} />
          <input data-testid="input-note-status" name="status" type="text" className="large mx-8"
            placeholder="Note Status" onChange={this.updateText} value={this.state.status} />
          <button className="" data-testid="submit-button" onClick={this.addNote}>Add Note</button>
        </section>

        <div className="mt-50">
          <ul className="tabs">
            <li className="tab-item slide-up-fade-in" data-testid="allButton" onClick={this.displayAllItems}>All</li>
            <li className="tab-item slide-up-fade-in" data-testid="activeButton" onClick={this.displayActiveItems}>Active</li>
            <li className="tab-item slide-up-fade-in" data-testid="completedButton" onClick={this.displayCompletedItems}>Completed</li>
          </ul>
        </div>
        <div className="card w-40 pt-30 pb-8">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody data-testid="noteList">
              {records}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
