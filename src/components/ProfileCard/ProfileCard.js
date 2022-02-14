
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
                console.log(user.uid);
                deactivateloadingscreen();
                role(user.uid);
            }
            else{
                navigate('/');
            }
         });
    },
    [navigate])


    return (
        <>
            <section className='container-fluid  mb-2 mt-4'>
            <div className=" rounded-3  bg-success p-2 text-white bg-opacity-75 bg-gradient  mx-3 py-3">
                <div className='row gy-4'>
                    <div className='col-md-10'>
                        <div className='row mb-1 ms-4'><span><em>Name:</em> &nbsp;&nbsp;Rahul Kumar SIngh</span></div>
                        <div className='row mb-1 ms-4'><span><em>Department:</em> &nbsp;&nbsp;Administration</span></div>
                        <div className='row mb-1 ms-4'><span><em>Role:</em> &nbsp;&nbsp;Admin</span></div>
                        <div className='row mb-1 ms-4'><span><em>Id:</em> &nbsp;&nbsp;Administration</span></div>
                        <div className='row mb-1 ms-4'><span><em>Phone:</em> &nbsp;&nbsp;Administration</span></div>
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

function role(uid){
    activateloadingscreen(`Geting user information...`);
    get(child(db, `users/${uid}`)).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
            deactivateloadingscreen();
        } else {
        console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}


export { ProfileCard };