import './Login.css';
import {firebase,app} from "../../Firebase/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase , ref, child, get} from "firebase/database";

function Login() {
    return (
        <section id="loginform" class="container mt-5 mb-5 pb-5 mx-auto">
          <div class="container ">
            <div class="row d-flex justify-content-center align-items-center ">
              <div class="container col-md-9 col-lg-6 col-xl-5">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" class="img-fluid"
                  alt="Sample"/>
              </div>
              <div class=" container col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                <form class="container justify-content-center mb-5 mt-5 h-100">
                    <h3 class="justify-content-center fw-normal mb-3 pb-3">Sign in</h3>
                  <div class="form-outline mb-4">
                    <input type="email" id="form1Example13" class="form-control form-control-lg" placeholder='Email Address'/>
                    {/* <label class="form-label" for="form1Example13">Email address</label> */}
                  </div>

                  {/* <!-- Password input --> */}
                  <div class="form-outline mb-4">
                    <input type="password" id="form1Example23" class="form-control form-control-lg" placeholder='Password'/>
                    {/* <label class="form-label" for="form1Example23">Password</label> */}
                  </div>

                  <div class="d-flex  mb-4">
                    {/* <!-- Checkbox --> */}
                    <a href="#!">Forgot password?</a>
                  </div>
                  {/* <!-- Submit button --> */}
                  <button type="submit" class="btn btn-primary btn-lg ">Sign in</button>

                </form>
              </div>
            </div>
          </div>
        </section>
    );
  }
  
export { Login };


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

