import React from 'react';
import './books.css';
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";

class Books extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false,
            bookToDisplayMoreInformation: ''
        }

        this.handlerOpenModal = this.handlerOpenModal.bind(this);
        this.handlerCloseModal = this.handlerCloseModal.bind(this);
        this.handlerAddToFavorites = this.handlerAddToFavorites.bind(this);
        this.renderModalFooter = this.renderModalFooter.bind(this);
        this.handlerRemoveFromFavorites = this.handlerRemoveFromFavorites.bind(this);
    }

    handlerOpenModal(event, book) {
        this.setState({ isModalOpen: true, bookToDisplayMoreInformation: book });
    }

    handlerCloseModal(event, book) {
        this.setState({ isModalOpen: false, bookToDisplayMoreInformation: null });
    }

    handlerAddToFavorites(event) {
        if (this.state.bookToDisplayMoreInformation !== null && this.state.bookToDisplayMoreInformation !== undefined && this.state.bookToDisplayMoreInformation !== '') {
            this.props?.favorites(this.state.bookToDisplayMoreInformation);
        }
    }

    handlerRemoveFromFavorites(event) {
        if (this.state.bookToDisplayMoreInformation !== null && this.state.bookToDisplayMoreInformation !== undefined && this.state.bookToDisplayMoreInformation !== '') {
            this.props?.removeFavorite(this.state.bookToDisplayMoreInformation);
        }
    }

    renderModalFooter() {
        if (this.props?.isFavoriteContext) {
            return(
                <React.Fragment>
                    <button type="button" class="btn btn-primary" onClick={this.handlerRemoveFromFavorites}>Remove from favorites</button>
                    <button type="button" class="btn btn-primary" onClick={this.handlerCloseModal}>Close</button>
                </React.Fragment>
            )
        }
        else {
            return (
                <React.Fragment>
                    <button type="button" class="btn btn-primary" onClick={this.handlerAddToFavorites}>Save to favorite</button>
                    <button type="button" class="btn btn-primary" onClick={this.handlerCloseModal}>Close</button>
                </React.Fragment>
            )
        }
    }

    render() {
        if (this.props.books !== null && this.props.books !== undefined && this.props.books !== '') {
            return (
                <React.Fragment>
                    <div className="row">
                        <div className="col-sm">
                            {this.props.books.map((book, i) => {
                                return (
                                    <a class="thumbnail" className="bk-thumb" onClick={(event) => this.handlerOpenModal(event, book)}>
                                        <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.title} />
                                    </a>
                                )
                            })}
                        </div>
                    </div>
                    <Modal show={this.state.isModalOpen} onHide={this.handlerCloseModal}>
                        <ModalHeader>
                            <ModalTitle>{this.state.bookToDisplayMoreInformation?.volumeInfo?.title}</ModalTitle>
                        </ModalHeader>
                        <ModalBody>{this.state.bookToDisplayMoreInformation?.volumeInfo?.description}</ModalBody>
                        <ModalFooter>
                            {this.renderModalFooter()}
                        </ModalFooter>
                    </Modal>
                </React.Fragment>
            )
        }
        return null;
    }
}

export default Books;