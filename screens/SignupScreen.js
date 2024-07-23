import { Alert } from "react-native";
import { createUser } from "../util/auth";
import { AuthContext } from "../store/auth";
import { useContext, useState } from "react";

import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";

function SignupScreen() {
  const authCtx = useContext(AuthContext);

  const [isAuthenticating, setIsAuthenticating] = useState(false);

  async function signupHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const { idToken } = await createUser(email, password);
      authCtx.authenticate(idToken);
    } catch (error) {
      Alert.alert("Authentication Failed!", "Could not Sign Up");
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message={"Creating User..."} />;
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
