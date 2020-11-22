import React from 'react';
import axios from 'axios';
import './main.css';
import Books from '../books/books.js';
import ReactPaginate from 'react-paginate';
import { NavbarBrand, Navbar, NavLink, Nav } from 'react-bootstrap';
import Toast from 'react-bootstrap/Toast';
import Search from '../search/search';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isSearch: true,
      favorites: [],
      offset: 0,
      bookPerPage: 14,
      currentPage: 0,
      searchResult: '',
      pageCount: 0,
      apiKey: 'AIzaSyDCD3PxYjfsbMWBrAEEPIx8vnmf_1b0Fpo',
      isToastOpen: false,
      toastText: '',
      toastTitle: ''
    }

    this.hadlerChange = this.hadlerChange.bind(this);
    this.receivedData = this.receivedData.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.renderSearch = this.renderSearch.bind(this);
    this.handlerIsSearch = this.handlerIsSearch.bind(this);
    this.addBookToFavorites = this.addBookToFavorites.bind(this);
    this.removeBookFromFavorites = this.removeBookFromFavorites.bind(this);
  }

  hadlerChange(book) {
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
        favorites: [...previousState.favorites, book], isToastOpen: true, toastText: 'Book successfully add to favorites!', toastTitle: book?.volumeInfo?.title + ' add to favorites'
      }))
    }
  }

  removeBookFromFavorites(book) {
    var array = [...this.state.favorites];
    var index = array.indexOf(book)
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({ favorites: array, isToastOpen: true, toastText: 'Book successfully removed from favorites!', toastTitle: book?.volumeInfo?.title + ' removed from favorites' });
    }
  }

  renderSearch() {
    return (
      <div className="container">
        <Search 
          hadlerChange={this.hadlerChange} 
          hadlerSubmit={this.receivedData} 
        />
        <Books 
          books={this.state.searchResult} 
          favorites={this.addBookToFavorites} 
          isFavoriteContext={false} 
        />
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={1}
          pageRangeDisplayed={2}
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
      <React.Fragment>
        <div className="container my-2">
          <h2>Favorites Books</h2>
          <Books books={this.state.favorites} isFavoriteContext={true} removeFavorite={this.removeBookFromFavorites} />
        </div>
      </React.Fragment>
    )
  }

  render() {
    return (
      <React.Fragment>
        <Navbar bg="dark">
          <NavbarBrand>Books Search</NavbarBrand>
          <Nav className="nav-items">
            <NavLink onClick={this.handlerIsSearch} >Search</NavLink>
            <NavLink onClick={this.handlerIsSearch} >Favorites</NavLink>
          </Nav>
        </Navbar>
        <footer className="footer">
          <div className="footer-content">
            <Toast onClose={() => this.setState({ isToastOpen: false })} show={this.state.isToastOpen} delay={6000} autohide>
              <Toast.Header>
                <strong className="mr-auto">{this.state.toastTitle}</strong>
              </Toast.Header>
              <Toast.Body>{this.state.toastText}</Toast.Body>
            </Toast>
          </div>
        </footer>
        {this.state.isSearch ? this.renderSearch() : this.renderFavorites()}
      </React.Fragment>
    )
  }
}

export default Main;