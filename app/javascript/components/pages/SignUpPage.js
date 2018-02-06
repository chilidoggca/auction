import React, {Component} from 'react';
// import {Token} from '../../requests/tokens';
import {User} from '../../requests/users';

class SignUpPage extends Component {
  constructor (props) {
    super(props);

    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password_confirmation: "",
    };

    this.createUser = this.createUser.bind(this);
  }

  handleChange (name) {
    return event => {
      const {currentTarget} = event;
      this.setState({[name]: currentTarget.value});
    };
  }

  createUser (event) {
    event.preventDefault();
    const {onSignUp = () => {}} = this.props;
    const {email, password} = this.state;
    User
      .create({email, password})
      .then(data => {
        if (!data.error) {
          const {jwt} = data;
          localStorage.setItem('jwt', jwt);
          this.props.history.push("/");
          onSignUp();
        }
      });
  }

  render () {
    const {first_name, last_name, email, password, password_confirmation} = this.state;
    return (
      <main
        className="SignUpPage"
        style={{
          padding: '0 20px'
        }}
      >
        <h2>Sign Up</h2>
        <form onSubmit={this.createUser}>
          <div>
            <label htmlFor='first_name'>First Name</label> <br />
            <input
              value={first_name}
              onChange={this.handleChange('first_name')}
              type='text'
              id='first_name'
              name='first_name'
            />
          </div>

          <div>
            <label htmlFor='last_name'>Last Name</label> <br />
            <input
              value={last_name}
              onChange={this.handleChange('last_name')}
              type='text'
              id='last_name'
              name='last_name'
            />
          </div>

          <div>
            <label htmlFor='email'>Email</label> <br />
            <input
              value={email}
              onChange={this.handleChange('email')}
              type='email'
              id='email'
              name='email'
            />
          </div>

          <div>
            <label htmlFor='password'>Password</label> <br />
            <input
              value={password}
              onChange={this.handleChange('password')}
              type='password'
              id='password'
              name='password'
            />
          </div>

          <div>
            <label htmlFor='password_confirmation'>Password Confirmation</label> <br />
            <input
              value={password_confirmation}
              onChange={this.handleChange('password_confirmation')}
              type='password'
              id='password_confirmation'
              name='password_confirmation'
            />
          </div>

          <div>
            <input type='submit' value='Sign Up'/>
          </div>
        </form>
      </main>
    )
  }
}

export {SignUpPage};
