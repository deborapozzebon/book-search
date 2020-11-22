import React from 'react';

class Search extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            book: '',
        }

        this.hadlerChange = this.hadlerChange.bind(this);
        this.hadlerSubmit = this.hadlerSubmit.bind(this);
    }

    hadlerChange(event) {
        this.props.hadlerChange(event.target.value);
    }

    hadlerSubmit(event) {
        this.props.hadlerSubmit(event);
    }

    render() {
        return (
            <React.Fragment>
                <form onSubmit={this.hadlerSubmit}>
                    <div className="form-group mt-2">
                        <input data-testid="search-input" type="text" className="form-control mt-2" placeholder="Book name" onChange={this.hadlerChange} />
                        <button data-testid="search-button" type="submit" className="btn btn-primary mt-2">Search</button>
                    </div>
                </form>
            </React.Fragment>
        )
    }
}

export default Search;