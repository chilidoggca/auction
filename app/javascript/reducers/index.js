import { combineReducers } from 'redux';
import AuctionsReducer from './reducer_auctions';

const rootReducer = combineReducers({
  auctions: AuctionsReducer
});

export default rootReducer;
