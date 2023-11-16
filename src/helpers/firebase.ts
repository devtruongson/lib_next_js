import firebase from "firebase/compat/app";
import "firebase/compat/auth";

export default function firebaseConfig() {
    const config = {
        apiKey: process.env.NEXT_PUBLIC_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    };

    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }

    const provider = {
        googleAuth: new firebase.auth.GoogleAuthProvider(),
        githubAuth: new firebase.auth.GithubAuthProvider(),
    };
    return provider;
}
