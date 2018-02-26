import React, {Component} from 'react';
// Anywhere you write JSX tags, React must be
// imported, because JSX tags are translated
// to React.createElement(...) calls.

// When importing a directory, the import will actually look for a
// file named index.js inside of it and import that instead.
import {
  NotFoundPage,
  HomePage,
  AuctionIndexPage,
  AuctionNewPage,
  AuctionShowPage,
  SignInPage,
  SignUpPage
} from './pages';
import {NavBar} from './NavBar';
import {AuthRoute} from './AuthRoute';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import jwtDecode from 'jwt-decode';

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      user: null,
      loading: true
    };
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  signOut () {
    localStorage.removeItem('jwt');
    this.setState({user: null});
  }

  signIn () {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      const payload = jwtDecode(jwt);
      this.setState({user: payload, loading: false});
    } else {
      this.setState({loading: false});
    }
  }

  componentDidMount () {
    this.signIn();
  }

  isAuth () {
    return !!this.state.user
  }

  render () {
    const {user, loading} = this.state;

    if (loading) {
      return (
        <div>
          Loading...
        </div>
      );
    }
    // The <Switch> component is used with <Route> children.
    // It will force only one route children to render at a time.
    // Only the first <Route> that matches will render.
    return (
      <Router basename="/client">
        <div className="App">
          <NavBar
            user={user}
            onSignOutClick={this.signOut}
          />
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/sign_in" render={props => {
              return <SignInPage {...props} onSignIn={this.signIn} />
            }} />
            <Route path="/sign_up" component={SignUpPage} />
            <AuthRoute
              isAuthenticated={this.isAuth()}
              path="/auctions"
              exact
              component={AuctionIndexPage}
            />
            <AuthRoute
              isAuthenticated={this.isAuth()}
              path="/auctions/new"
              component={AuctionNewPage}
            />
            <AuthRoute
              isAuthenticated={this.isAuth()}
              path="/auctions/:id"
              component={AuctionShowPage}
            />
            {/*
              To match all routes that aren't matched in a SWITCH component,
              create a route without a 'path' prop. We can use to implement
              a 404 page.
             */}
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

// import App from './App';
// ð will make the value at App available by importing with ð
// in other files.
export default App;
