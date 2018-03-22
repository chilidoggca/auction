import React, { Component } from 'react';
import { connect } from 'react-redux';

class AuctionList extends Component {

  renderList() {
    return this.props.auctions.map((auction) => {
      return <li key={auction.id} className="list-group-item">{auction.title}</li>
    });
  }

  render() {
    return (
      <ul className="list-group col-sm-4">
        {this.renderList()}
      </ul>
    )
  }
}

function mapStateToProps(state) {
  // Whatever is returned will show up as props inside book list.
  return {
    auctions: state.books
  }
}

 export default connect(mapStateToProps)(AuctionList);
