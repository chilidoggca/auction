import React from 'react';
import {Field} from './Field';

function AuctionDetails (props = {}) {
  const {auction_owner = {}} = props;
  const containerStyle = {
    paddingLeft: '10px'
  }
  return (
    <div className="AuctionDetails">
      <h2>{props.title}</h2>
      <div style={containerStyle}>
        <p>{props.details}</p>
        <p>By {auction_owner.full_name}</p>
        <Field name="End Date" value={props.end_date} />
        <Field name="Reserve Price" value={props.reserve_price} />
      </div>
    </div>
  );
}

export {AuctionDetails};
