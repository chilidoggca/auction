import React, {Component} from 'react';
import {Field} from '../Field';
import {Auction} from '../../requests/auctions';
import {Link} from 'react-router-dom';

class AuctionIndexPage extends Component {
  constructor (props) {
    super(props);

    this.state = {
      loading: true,
      auctions: []
    };

    this.deleteAuction = this.deleteAuction.bind(this);
  }

  deleteAuction (auctionId) {
    return () => {
      const {auctions} = this.state;
      Auction.destroy(auctionId).then(data => {
        this.setState({
          auctions: data
        });
      }).catch(function(error) {
        console.log('Sorry: ', error.message);
      });
    }
  }

  // Promise version
  componentDidMount () {
    Auction
      .all()
      .then(auctions => {
        this.setState({auctions, loading: false})
      });
  }

  render () {
    const {loading} = this.state;
    const {auctions} = this.state;

    if (loading) {
      return (
        <main
          className="AuctionIndexPage"
          style={{padding: '0  20px'}}
        >
          <h3>Loading auctions...</h3>
        </main>
      )
    }

    return (
      <main
        className="AuctionIndexPage"
        style={{padding: '0  20px'}}
      >
        <h2>Auctions</h2>
        <div style={{paddingLeft: '10px'}}>
          {
            this.state.auctions.map(auction => (
              <div key={auction.id} className="auctionItemDiv">
                <Link to={`/auctions/${auction.id}`}>
                  {auction.title}
                </Link>
                <Field name="Auction Owner" value={auction.auction_owner.full_name} />
                {
                  (true) ?
                  <button
                    className="btn"
                    onClick={this.deleteAuction(auction.id)}
                  >Delete</button> : ''
                }
              </div>
            ))
          }
        </div>
      </main>
    );
  }
}

export {AuctionIndexPage};
