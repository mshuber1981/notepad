import React from "react";
// https://react-bootstrap.github.io/components/buttons/
import { Button } from "react-bootstrap";
// https://www.npmjs.com/package/react-router-bootstrap
import { Link } from "react-router-dom";
// https://docs.amplify.aws/start/getting-started/auth/q/integration/react
import {
  AmplifyAuthenticator,
  AmplifyGreetings,
  AmplifySignIn,
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
    <div className="notes container-fluid">
      <AmplifyGreetings username={user.username}></AmplifyGreetings>
      {/* Passing username prop to UserNotes */}
      <UserNotes username={user.username} />
    </div>
  ) : (
    <div className="notes container-fluid">
      <div className="d-flex flex-column vh-100 justify-content-center align-items-center">
        <Link exact="true" to="/">
          <Button>Home 🗒</Button>
        </Link>
        <br></br>
        <div className="auth">
          {/* https://docs.amplify.aws/ui/auth/authenticator/q/framework/react#sign-in */}
          <AmplifyAuthenticator>
            <AmplifySignIn
              slot="sign-in"
              formFields={[
                {
                  type: "username",
                  label: "Username",
                  placeholder: "Case sensitive!",
                  required: true,
                },
                {
                  type: "password",
                  label: "Password",
                  placeholder: "",
                  required: true,
                },
              ]}
            ></AmplifySignIn>
            <AmplifySignUp
              slot="sign-up"
              formFields={[
                {
                  type: "username",
                  label: "Username",
                  placeholder: "Case sensitive!",
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
                  placeholder: "8 characters (A-Z, a-z, 0-9)",
                  required: true,
                },
              ]}
            />
          </AmplifyAuthenticator>
        </div>
      </div>
    </div>
  );
};

export default Notes;
