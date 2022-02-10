import {firebase,app} from "../../Firebase/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase , ref, child, get} from "firebase/database";

var lol;
function signin(email,password){
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        lol=user.uid;
        console.log(lol)
    })
    .catch((error) => {
        const errorCode = console.log(error.code);
        const errorMessage = console.log(error.message);
    });
}

// const db=ref(getDatabase(app));
// get(child(db, `students/${lol}`)).then((snapshot) => {
//   if (snapshot.exists()) {
//     console.log(snapshot.val());
//   } else {
//     console.log("No data available");
//   }
// }).catch((error) => {
//   console.error(error);
// });

function Login() {
    return(
        <div>
            {signin("iamrahulsingh0801@gmail.com","Rahul@123")}
        </div>
    );
}
export {Login};