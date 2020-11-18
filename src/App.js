import React from 'react';
import axios from 'axios';
import './App.css';
import Books from './books/books.js'
import ReactPaginate from 'react-paginate';
import { NavbarBrand, Navbar, NavLink, Nav } from 'react-bootstrap';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isSearch: true,
      favorites: [],
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
    this.renderSearch = this.renderSearch.bind(this);
    this.handlerIsSearch = this.handlerIsSearch.bind(this);
    this.addBookToFavorites = this.addBookToFavorites.bind(this);
    this.removeBookFromFavorites = this.removeBookFromFavorites.bind(this);
  }

  hadlerChange(event) {
    const book = event.target.value;
    this.setState({ book: book });
  }

  handlerIsSearch(event) {
    this.setState({ isSearch: !this.state.isSearch })
  }

  receivedData(event) {
    event?.preventDefault();
    axios.get('https://www.googleapis.com/books/v1/volumes?q=' + this.state.book + '&key=' + this.state.apiKey + '&maxResults=' + this.state.bookPerPage + '&startIndex=' + this.state.offset)
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

  addBookToFavorites(book) {
    if (this.state.favorites !== null && this.state.favorites !== undefined && this.state.favorites !== '') {
      this.setState(previousState => ({
        favorites: [...previousState.favorites, book]
      }))
    }
  }

  removeBookFromFavorites(book) {
    var array = [...this.state.favorites];
    var index = array.indexOf(book)
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({ favorites: array });
    }
  }

  renderSearch() {
    return (
      <div className="container">
        <br />
        <form onSubmit={this.receivedData}>
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Book name" onChange={this.hadlerChange} />
          </div>
          <button type="submit">Search</button>
        </form>
        <Books books={this.state.searchResult} favorites={this.addBookToFavorites} isFavoriteContext={false} />
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

  renderFavorites() {
    return (
      <div>
        <div className="container">
          <Books books={this.state.favorites} isFavoriteContext={true} removeFavorite={this.removeBookFromFavorites} />
        </div>
      </div>
    )
  }

  render() {
    return (
      <>
        <Navbar bg="dark">
          <NavbarBrand style={{ color: 'white', fontWeight: 'bold' }}>Books Search</NavbarBrand>
          <Nav>
            <NavLink onClick={this.handlerIsSearch} >Search</NavLink>
            <NavLink onClick={this.handlerIsSearch} >Favorites</NavLink>
          </Nav>
        </Navbar>
        {this.state.isSearch ? this.renderSearch() : this.renderFavorites()}
      </>
    )
  }
}

export default App;
