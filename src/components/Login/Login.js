import firebase from "../../Firebase/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function signin(){
    var email="iamrahulsingh0801@gmail.com";
    var password="Rahul@123";
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = console.log(userCredential.user);
        console.log(userCredential);
    })
    .catch((error) => {
        const errorCode = console.log(error.code);
        const errorMessage = console.log(error.message);
    });
}


function Login() {
    return(
        <div>
            {signin()}
        </div>
    );
}
export {Login};