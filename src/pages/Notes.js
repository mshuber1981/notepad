import React from "react";
// https://react-bootstrap.github.io/components/buttons/
import { Button } from "react-bootstrap";
// https://www.npmjs.com/package/react-router-bootstrap
import { Link } from "react-router-dom";
// https://docs.amplify.aws/start/getting-started/auth/q/integration/react
import {
  AmplifyAuthenticator,
  AmplifyGreetings,
  AmplifySignUp,
} from "@aws-amplify/ui-react";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";
import UserNotes from "./UserNotes";

const Notes = () => {
  const [authState, setAuthState] = React.useState();
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
    });
  }, []);

  return authState === AuthState.SignedIn && user ? (
    <>
      <AmplifyGreetings username={user.username}></AmplifyGreetings>
      <UserNotes />
    </>
  ) : (
    <div className="d-flex flex-column vh-100 justify-content-center align-items-center home">
      <Link exact="true" to="/">
        <Button>Home 🗒</Button>
      </Link>
      <br></br>
      <AmplifyAuthenticator>
        <AmplifySignUp
          slot="sign-up"
          formFields={[
            {
              type: "username",
              label: "Username",
              placeholder: "",
              required: true,
            },
            {
              type: "email",
              label: "Email",
              placeholder: "someone@example.com",
              required: true,
            },
            {
              type: "password",
              label: "Password",
              placeholder: "",
              required: true,
            },
          ]}
        />
      </AmplifyAuthenticator>
    </div>
  );
};

export default Notes;
