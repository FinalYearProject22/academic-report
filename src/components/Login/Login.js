import './Login.css';
import {app} from "../../Firebase/firebase";
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
                  <button type="button" id="loginmodalclose" className="btn-close" data-dismiss="modal" aria-label="Close">
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
                  <button type="button" id="forgotmodalclose" className="btn-close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                    <form className="container justify-content-center mb-3 mt-2 h-100">
                    <p><em>Enter your email address to request an password reset.</em></p>
                      <div className="form-outline mb-4">
                        <input type="email" name="email" id="resetemail" className="form-control form-control-lg" placeholder='Email Address'/>
                      </div>
                      <div className='container-fluid'>
                      <button  id="resetsubmitbtn" type="button" onClick={reset} className="btn btn-primary mx-auto btn-lg ">Request Reset</button>
                      </div>
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
                  <button type="button" id="requestmodalclose" className="btn-close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body" id="requestmodalmessage">
                </div>
              </div>
            </div>
          </div>
          <div id="loadingscreen"  className="invisible d-flex justify-content-center align-items-center container-fluid  h-100 position-absolute top-0 start-0 bg-light">
            <div id="spinnercontainer" className='container d-flex justify-content-center'>
              <div id="loadingscreenspinner" className="d-block spinner-border spinner-border-lg"  role="status"></div>
              <div className='d-block ms-3 d-flex text-center justify-content-center align-items-center'>
                <span id="loadertext" className='h4'><em>Fetching Data from DataBase....</em></span>
              </div>
            </div>
          </div>
        </section>
    );
  }
  
function togglespinner(ans){
  if(ans===true){
  document.getElementById("submitbtn").innerHTML=`
  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
  `+document.getElementById("submitbtn").innerHTML;
  }else{
    document.getElementById("submitbtn").innerHTML=`Sign in`
  }
}


function signin(){
    togglespinner(true);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    var email=document.getElementById("email").value;
    var password=document.getElementById("password").value;
    const auth = getAuth();
  setPersistence(auth, browserSessionPersistence)
  .then(() => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log(user.uid);
        togglespinner(false);
        document.getElementById("loadingscreen").classList.remove("invisible");
        document.body.style.overflow = 'hidden';
        role(user.uid);
    })
    .catch((error) => {
        togglespinner(false);
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

let db=ref(getDatabase(app));

function role(uid){
  get(child(db, `users/${uid}/role`)).then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
      document.getElementById("loadertext").innerHTML=`<em>Preparing your Page...</em>`;
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
}


export { Login };