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
    }

    handlerOpenModal(event, book) {
        this.setState({ isModalOpen: true, bookToDisplayMoreInformation: book });
    }
    handlerCloseModal(event, book) {
        this.setState({ isModalOpen: false, bookToDisplayMoreInformation: null });
    }

    render() {
        if (this.props.books !== null && this.props.books !== undefined && this.props.books !== '') {
            return (
                <React.Fragment>
                    <div className="row">
                        <div className="col-sm">
                            {this.props.books.map((book, i) => {
                                return (
                                    <a href="#" cass="thumbnail" className="bk-thumb">
                                        <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.title} />
                                        <button onClick={(event) => this.handlerOpenModal(event, book)} />
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
                        <ModalFooter>This is the footer</ModalFooter>
                    </Modal>
                </React.Fragment>
            )
        }
        return null;
    }
}

export default Books;