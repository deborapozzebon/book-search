import React from 'react';
import axios from 'axios';
import './App.css';
import Books from './books/books.js'
import ReactPaginate from 'react-paginate';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      book: '',
      offset: 0,
      bookPerPage: 10,
      currentPage: 0,
      searchResult: '',
      pageCount: 0,
      apiKey: 'AIzaSyDCD3PxYjfsbMWBrAEEPIx8vnmf_1b0Fpo'
    }

    this.hadlerChange = this.hadlerChange.bind(this);
    this.receivedData = this.receivedData.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  hadlerChange(event) {
    const book = event.target.value;
    this.setState({ book: book });
  }

  receivedData(event) {
    event?.preventDefault();
    axios.get('https://www.googleapis.com/books/v1/volumes?q=' + this.state.book + '&key=' + this.state.apiKey + '&maxResults=' + this.state.bookPerPage + '&startIndex='+ this.state.offset)
      .then(data => {
        const result = data.data.items;
        this.setState({ searchResult: result, pageCount: Math.ceil(data.data.totalItems / this.state.bookPerPage) });
      })
  }

  handlePageClick(event) {
    const selectedPage = event.selected;
    const offset = selectedPage * this.state.bookPerPage;

    this.setState({
        currentPage: selectedPage,
        offset: offset
    }, () => {
        this.receivedData()
    });

};

  render() {
    return (
      <div className="container">
        <h1>Books search</h1>
        <form onSubmit={this.receivedData}>
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Book name" onChange={this.hadlerChange} />
          </div>
          <button type="submit">Search</button>
        </form>
        <Books books={this.state.searchResult}/>
        <ReactPaginate
          previousLabel={"prev"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </div>
    )
  }
}

export default App;
