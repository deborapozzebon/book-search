import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import Books from './Books.js'


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      book: '',
      searchResult: '',
      apiKey: 'AIzaSyDCD3PxYjfsbMWBrAEEPIx8vnmf_1b0Fpo'
    }

    this.hadlerChange = this.hadlerChange.bind(this);
    this.handlerSubmit = this.handlerSubmit.bind(this);
  }

  hadlerChange(event) {
    const book = event.target.value;
    this.setState({ book: book });
  }

  handlerSubmit(event) {
    event.preventDefault();
    axios.get('https://www.googleapis.com/books/v1/volumes?q=' + this.state.book + '&key=' + this.state.apiKey + '&maxResults=10')
      .then(data => {
        this.setState({ searchResult: data.data.items });
      })
  }

  render() {
    return (
      <div className="container">
        <h1>Books search</h1>
        <form onSubmit={this.handlerSubmit}>
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Book name" onChange={this.hadlerChange} />
          </div>
          <button type="submit">Search</button>
        </form>
        <Books books={this.state.searchResult}/>
      </div>
    )
  }
}

export default App;
