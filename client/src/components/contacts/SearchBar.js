import React from 'react';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(e) {
        e.preventDefault();
        this.props.handleSearchByCode(e.target.value);
    }

    render() {
        const round = {
            padding: "15px",
            borderRadius: "20px"
        }
        return (
            <div>
                <label>
                    <input type="text" className="form-control search-form" style={round} name="search" placeholder="Search by Name /Mobile No." onChange={this.handleSearch} />
                </label>
            </div>
        )
    }
}

export default SearchBar;