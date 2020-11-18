import React, { useState } from 'react';

class Books extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.books !== null && this.props.books !== undefined && this.props.books !== '') {
            return (
                <div className="row">
                    <div className="col-xs-6 col-md-3">
                        {this.props.books.map(function (book, i) {
                            return (
                                <a href="#" class="thumbnail">
                                    <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.title} />
                                </a>
                            )
                        })}
                    </div>
                </div>
            )
        }
        return null;
    }
}

export default Books;