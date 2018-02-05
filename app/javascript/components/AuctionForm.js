import React from 'react';
import {FormErrors} from './FormErrors';

function AuctionForm (props) {
  const {
    auction = {},
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
      className="AuctionForm"
      onSubmit={handleSubmit}
    >
      <div>
        <label htmlFor="title">Title</label> <br />
        <input
          onChange={handleChange("title")}
          value={auction.title}
          name="title"
          id="title"
        />
        <FormErrors forField='title' errors={errors} />
      </div>

      <div>
        <label htmlFor="details">Details</label> <br />
        <textarea
          onChange={handleChange("details")}
          value={auction.details}
          name="details"
          id="details"
        />
        <FormErrors forField='details' errors={errors} />
      </div>

      <div>
        <label htmlFor="end_date">End Date</label> <br />
        <input
          onChange={handleChange("end_date")}
          value={auction.end_date}
          name="end_date"
          id="end_date"
          type="date"
        />
        <FormErrors forField='end_date' errors={errors} />
      </div>

      <div>
        <label htmlFor="reserve_price">Reserve Price</label> <br />
        <input
          onChange={handleChange("reserve_price")}
          value={auction.reserve_price}
          name="reserve_price"
          id="reserve_price"
          type="number"
        />
        <FormErrors forField='reserve_price' errors={errors} />
      </div>

      <div>
        <input type="submit" value="Submit"/>
      </div>
    </form>
  );
}

export {AuctionForm}
