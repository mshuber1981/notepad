import React from "react";
import NavBar from "../components/NavBar";
import {
  AmplifyAuthenticator,
  AmplifyGreetings,
  AmplifySignUp,
} from "@aws-amplify/ui-react";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";

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
    <section>
      <AmplifyGreetings username={user.username}></AmplifyGreetings>
      <h1 className="d-flex flex-column justify-content-center align-items-center text-center">
        App
      </h1>
    </section>
  ) : (
    <section>
      <NavBar />
      <AmplifyAuthenticator className="d-flex flex-column vh-100 justify-content-center align-items-center">
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
    </section>
  );
};

export default Notes;
