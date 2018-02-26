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
      auction: {
        newBid: {
          // bid_price: ""
        },
        bids: []
      },
    };

    this.createBid = this.createBid.bind(this);
    this.updateNewBid = this.updateNewBid.bind(this);

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

    Bid
      .destroy(bidId)
      .then(data => {
        if (data.errors) {
          this.setState({
            validationErrors: data
              .errors
              .filter(e => e.type === 'ActiveRecord::RecordInvalid')
          });
        } else {
          // console.log(data);
          this.setState({
            auction: {
              ...auction,
              bids: [...data.bids]
            }
          })
        }
      });
  }

  updateNewBid (data) {
    const {auction} = this.state;
    const {newBid} = auction;
    const {id} = auction;
    // const {bid_price} = newBid;

    this.setState({
      auction: {
        ...auction,
        newBid: {...newBid, ...data}
      }
    });
  }

  createBid () {
    const {auction} = this.state;
    const {newBid} = this.state.auction;
    // const {bid_price} = newBid;
    const {id} = this.state.auction;

    // console.log(newBid);
    Bid
      .create(newBid, id)
      .then(data => {
        if (data.errors) {
          this.setState({
            validationErrors: data
              .errors
              .filter(e => e.type === 'ActiveRecord::RecordInvalid')
          });
        } else {
          console.log(data);
          // console.log([...this.state.bids]);
          this.setState({
            auction: {
              ...auction,
              bids: [...data.bids]
            }
          })
        }
      });
  }

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
    const {newBid = {}} = auction;
    const {validationErrors=[]} = this.state;
    const {id = ''} = auction;

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
          className="btn btn-outline-secondary m-2"
          onClick={this.delete}
        >Delete</button>
        <BidForm
          errors={validationErrors}
          bid={newBid}
          onChange={this.updateNewBid}
          onSubmit={this.createBid}
         />
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
