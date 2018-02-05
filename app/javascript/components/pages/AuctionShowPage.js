import React, {Component} from 'react';
import {AuctionDetails} from '../AuctionDetails';
import {BidList} from '../BidList';
import {BidForm} from '../BidForm';
import {Auction} from '../../requests/auctions';
import {Bid} from '../../requests/bids';

class AuctionShowPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      auction: {}
    };

    // this.createBid = this.createBid.bind(this);
    // this.updateNewBid = this.updateNewBid.bind(this);

    this.delete = this.delete.bind(this);
    this.deleteBid = this.deleteBid.bind(this);
  }

  delete () {
    this.setState({
      auction: {}
    });
  }

  deleteBid (bidId) {
    const {auction} = this.state;
    const {bids} = auction;
    this.setState({
      auction: {
        ...auction,
        bids: bids.filter(bid => bid.id !== bidId)
      }
    })
  }

  // updateNewBid (data) {
  //   const {newBid} = this.state;
  //
  //   this.setState({
  //     newBid: {...newBid, ...data}
  //   });
  // }
  //
  // createBid () {
  //   const {history} = this.props;
  //   const {newBid} = this.state;
  //   Bid
  //     .create(newBid)
  //     .then(data => {
  //       if (data.errors) {
  //         this.setState({
  //           validationErrors: data
  //             .errors
  //             .filter(e => e.type === 'ActiveRecord::RecordInvalid')
  //         });
  //       } else {
  //         history.push(`/auctions/${data.id}`)
  //       }
  //     });
  // }

  componentDidMount () {
    const {params} = this.props.match;
    Auction
      .get(params.id)
      .then(auction => {
        this.setState({
          auction,
          loading: false
        })
      });
  }

  render () {
    const {auction, loading} = this.state;
    const {bids = []} = auction;

    if (loading) {
      return (
        <main
          className="AuctionLoadingPage">
          <h3>Loading auction show page...</h3>
        </main>
      )
    }

    return (
      <main
        className="AuctionShowPage"
        style={{
          padding: '0 20px'
        }}
      >
        <AuctionDetails {...this.state.auction} />
        <button
          onClick={this.delete}
        >Delete</button>
        {/* <BidForm
          errors={validationErrors}
          bid={newBid}
          onChange={this.updateNewBid}
          onSubmit={this.createBid}
         /> */}
        <h3>Previous Bids</h3>
        <BidList
          bids={bids}
          onBidDeleteClick={this.deleteBid}
        />
      </main>
    );
  }
}

export {AuctionShowPage};
