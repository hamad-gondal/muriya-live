import { getAuth, signOut } from "firebase/auth";

export const sessionStatus = (): boolean => {
    if (window) {
        const status = window.sessionStorage.getItem("isUserLoggedIn");
        return status === "true" ? true : false;
    }
    else {
        return false;
    }
};

export const handleLogout = async () => {
    const auth = getAuth();
    signOut(auth)
        .then(() => {
            // Sign-out successful.
            console.log("Sign-out successful");
            window.sessionStorage.removeItem("isUserLoggedIn");
            window.sessionStorage.removeItem("userDisplayName");
        })
        .catch((error) => {
            // An error happened.
            console.log("Logout error: ", error);
        });
};
