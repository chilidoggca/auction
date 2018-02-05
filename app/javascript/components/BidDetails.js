import React from 'react';
import {Field} from './Field';

function BidDetails (props) {
  const {onDeleteClick = () => {}} = props;

  return (
    <div className="BidDetails">
      <p>${props.bid_price} by {props.bidder_full_name}</p>
      <Field name="Created At" value={props.created_at} />
      <button
        onClick={() => onDeleteClick(props.id)}
      >Delete</button>
    </div>
  );
}

export {BidDetails};
