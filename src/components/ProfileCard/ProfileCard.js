
import React, { useEffect } from 'react'
import { getDatabase , ref, child, get} from "firebase/database";
import {app} from "../../Firebase/firebase";
import { activateloadingscreen, deactivateloadingscreen } from '../Loadingscreen/Loadingscreen';
import { getAuth, onAuthStateChanged} from "firebase/auth";
import { useNavigate } from 'react-router-dom';

function ProfileCard(){


    let navigate=useNavigate();
    useEffect(() => {
         activateloadingscreen(`Fetching your Profile...`); 
         const auth=getAuth();
         onAuthStateChanged(auth, (user)=>{
            if(user){
                deactivateloadingscreen();
                // console.log("2");
                role(user.uid,user.email);
            }
            else{
                deactivateloadingscreen();
                navigate('/');
            }
         });
    },
    [navigate])


    return (
        <> 
         {/* {console.log("1")} */}
            <section className='container-fluid  mb-2 mt-4'>
            <div className=" rounded-3  bg-success text-white bg-opacity-75 bg-gradient  mx-3 py-3">
                <div className='row gy-4'>
                    <div className='col-md-10'>
                        <div className='row mb-1 ms-4'><span><em>Name:</em> &nbsp;&nbsp;<span id="user-name"></span></span></div>
                        <div className='row mb-1 ms-4'><span><em>Department:</em> &nbsp;&nbsp;<span id="user-dep"></span></span></div>
                        <div className='row mb-1 ms-4'><span><em>Role:</em> &nbsp;&nbsp;<span id="user-role"></span></span></div>
                        <div className='row mb-1 ms-4'><span><em>Id:</em> &nbsp;&nbsp;<span id="user-id"></span></span></div>
                        <div className='row mb-1 ms-4'><span><em>Email:</em> &nbsp;&nbsp;<span id="user-email"></span></span></div>
                    </div>
                    <span className='col-md-2 d-flex justify-content-center align-items-center'>
                        <button className='btn btn-danger'>
                            Logout
                        </button>
                    </span>
                </div>
            </div>
            </section>
        </>
    );
}


let db=ref(getDatabase(app));
function role(uid,email){
    // console.log("3");
    activateloadingscreen(`Geting user information...`);
    get(child(db, `users/${uid}`)).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
            document.getElementById("user-name").innerHTML=snapshot.val().name;
            document.getElementById("user-dep").innerHTML=snapshot.val().dept;
            if(snapshot.val().role===`admin`)
                document.getElementById("user-role").innerHTML=`Administrator`;
            else if(snapshot.val().role===`student`)
                document.getElementById("user-role").innerHTML=`Student`;
            else
                document.getElementById("user-role").innerHTML=`Teacher`;
            document.getElementById("user-id").innerHTML=snapshot.val().rollno;
            document.getElementById("user-email").innerHTML=email;
            deactivateloadingscreen();
        } else {
        console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}


export { ProfileCard,};