import React from 'react';

export function GuestUserSignIn (props) {
  return (
    <p>Just looking around? <a href="#" onClick={props.onSignInGuestUserClick}>Sign in as a guest!</a></p>
  );
}
