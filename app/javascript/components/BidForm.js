import React from 'react';
import {FormErrors} from './FormErrors';

function BidForm (props) {
  const {
    bid = {},
    onSubmit = () => {},
    onChange = () => {},
    errors = []
  } = props;

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
        <label htmlFor="bid_price">Bid Price</label> <br />
        <input
          onChange={handleChange("bid_price")}
          value={bid.bid_price}
          name="bid_price"
          id="bid_price"
          type="number"
        />
        <FormErrors forField='bid_price' errors={errors} />
      </div>

      <div>
        <input type="submit" value="Submit"/>
      </div>
    </form>
  );
}

export {BidForm}
