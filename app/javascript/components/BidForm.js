import React from 'react';
import {FormErrors} from './FormErrors';

function BidForm (props) {
  const {
    bid = {},
    onSubmit = () => {},
    onChange = () => {},
    errors = []
  } = props;

  const {bid_price = ""} = bid;

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit();
  };

  const handleChange = name => event => {
    onChange({[name]: event.currentTarget.value});
  };

  return (
    <form
      className="BidForm"
      onSubmit={handleSubmit}
    >
      <div>
        <input
          placeholder="Bid Price"
          onChange={handleChange("bid_price")}
          value={bid_price}
          name="bid_price"
          id="bid_price"
          type="number"

        />
        <FormErrors forField='bid_price' errors={errors} />
        <input type="submit" className="btn" value="Place Bid!" />
      </div>
    </form>
  );
}

export {BidForm}
