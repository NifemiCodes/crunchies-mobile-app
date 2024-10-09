import { checkAuthState } from "@/helpers";
import { Redirect } from "expo-router";
import { useState } from "react";

export default function Index() {
  const [signedIn, setSignedIn] = useState<boolean>();

  (async () => {
    const authState = await checkAuthState();
    setSignedIn(authState);
  })();
  return signedIn ? <Redirect href={"/checkout"} /> : <Redirect href={"/(auth)/welcome"} />;
}
