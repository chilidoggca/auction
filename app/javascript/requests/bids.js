import {BASE_URL} from './config';

function getJwt() {
  return `JWT ${localStorage.getItem('jwt')}`;
}

// HTTP REQUESTS

export const Auction = {
  create (params) {
    return fetch(
      `${BASE_URL}/api/v1/auctions/${id}`,
      {
        method: 'POST',
        headers: {
          'Authorization': getJwt(),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      }
    )
    .then(res => res.json());
  },
  destroy (id) {
    return fetch(
      `${BASE_URL}/api/v1/bids/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Authorization': getJwt()
         }
      }
    )
      .then(res=> res.json())
  }
}
