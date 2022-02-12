import './Login.css';
import {firebase,app} from "../../Firebase/firebase";
import { getAuth, signInWithEmailAndPassword ,setPersistence,browserSessionPersistence,sendPasswordResetEmail} from "firebase/auth";
import { getDatabase , ref, child, get} from "firebase/database";

function Login() {
    return (
        <section id="loginform" className="container mt-5 mb-5 pb-5 mx-auto">
          <div className="container ">
            <div className="row d-flex justify-content-center align-items-center ">
              <div className="container col-md-9 col-lg-6 col-xl-5">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid"
                  alt="Sample"/>
              </div>
              <div className=" border border-2 rounded-3 border-light container col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                <form className="container justify-content-center mb-5 mt-5 h-100">
                    <h3 className="justify-content-center fw-normal mb-3 pb-3">Sign in</h3>
                  <div className="form-outline mb-4">
                    <input type="email" name="email" id="email" className="form-control form-control-lg" placeholder='Email Address'/>
                  </div>
                  <div className="form-outline mb-4">
                    <input type="password" id="password" className="form-control form-control-lg" placeholder='Password'/>
                  </div>
                  <div className="d-flex  mb-4">
                    <a href='' onClick={forgot} >Forgot password?</a>
                  </div>
                  <button  id="submitbtn" type="button" onClick={signin} className="btn btn-primary btn-lg ">Sign in</button>
                </form>
              </div>
            </div>
          </div>
          <div className="modal fade" id="loginModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="loginModalLongTitle">Could not Login to your account</h5>
                  <button type="button" id="loginmodalclose" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                
                  <p id="loginmodalmessage"></p>
                </div>
              </div>
            </div>
          </div>
          <div className="modal fade" id="forgotModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="forgotModalLongTitle">Password Reset Form</h5>
                  <button type="button" id="forgotmodalclose" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                    <form className="container justify-content-center mb-3 mt-2 h-100">
                    <p><em>Enter your email address to request an password reset.</em></p>
                      <div className="form-outline mb-4">
                        <input type="email" name="email" id="resetemail" className="form-control form-control-lg" placeholder='Email Address'/>
                      </div>
                      <button  id="resetsubmitbtn" type="button" onClick={reset} className="btn btn-primary btn-lg ">Request Reset</button>
                    </form>
                </div>
              </div>
            </div>
          </div>
          <div className="modal fade" id="requestModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="requestModalLongTitle"> </h5>
                  <button type="button" id="requestmodalclose" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body" id="requestmodalmessage">
                </div>
              </div>
            </div>
          </div>
        </section>
    );
  }
  
export { Login };


function signin(){
    var email=document.getElementById("email").value;
    var password=document.getElementById("password").value;
    const auth = getAuth();
  setPersistence(auth, browserSessionPersistence)
  .then(() => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log(user.uid);
    })
    .catch((error) => {
        let btnclose = document.getElementById('loginmodalclose');
        let locModal = document.getElementById('loginModal');
        locModal.style.display = "block";
        locModal.style.paddingRight = "17px";
        locModal.className="modal fade show";
        document.getElementById('loginModalLongTitle').innerHTML= `Could not Login to your account`;
        document.getElementById("loginmodalmessage").innerHTML= `
        <p >Because of the following reason(s):</p>
        ${error.code}`;
        btnclose.addEventListener('click', (e) => {
          locModal.style.display = "none";
          locModal.className="modal fade";
        });
    });
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });

}




function forgot(e){
  e.preventDefault();
  let btnclose = document.getElementById('forgotmodalclose');
  let locModal = document.getElementById('forgotModal');
  locModal.style.display = "block";
  locModal.style.paddingRight = "17px";
  locModal.className="modal fade show";
  btnclose.addEventListener('click', (e) => {
    locModal.style.display = "none";
    locModal.className="modal fade";
  });
}

function reset(){
  var email=document.getElementById("resetemail").value;
  let locModal = document.getElementById('forgotModal');
  locModal.style.display = "none";
  locModal.className="modal fade";


  let reqmodal = document.getElementById('requestModal');
  let reqbtnclose = document.getElementById('requestmodalclose');
  const auth = getAuth();
  sendPasswordResetEmail(auth, email)
    .then(() => {
      reqmodal.style.display = "block";
      reqmodal.style.paddingRight = "17px";
      reqmodal.className="modal fade show";
      document.getElementById('requestModalLongTitle').innerHTML= `Password reset Request has been accepted`;
      document.getElementById("requestmodalmessage").innerHTML= `
      <p ><em>Instruction has been sent to your given email address.</em></p>`;
      reqbtnclose.addEventListener('click', (e) => {
        reqmodal.style.display = "none";
        reqmodal.className="modal fade";
      });
  })
  .catch((error) => {
    reqmodal.style.display = "block";
    reqmodal.style.paddingRight = "17px";
    reqmodal.className="modal fade show";
      document.getElementById('requestModalLongTitle').innerHTML= `Could not reset password`;
      document.getElementById("requestmodalmessage").innerHTML= `
      <p >Because of the following reason(s):</p>
      ${error.code}`;
      reqbtnclose.addEventListener('click', (e) => {
        reqmodal.style.display = "none";
        reqmodal.className="modal fade";
      });
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

