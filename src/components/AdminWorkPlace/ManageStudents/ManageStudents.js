import './ManageStudents.css';
import { BackButton } from "../../BackButton/BackButton";
import { getAuth,onAuthStateChanged} from "firebase/auth";
import { getDatabase , ref, child, get} from "firebase/database";
import {app} from "../../../Firebase/firebase";
import { useEffect } from 'react'
import { useState } from "react";
import { useNavigate } from 'react-router-dom';





function ManageStudents(){

    let navigate=useNavigate();
    const [role, setRole] = useState(undefined);
    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
          if (user) {
            const uid = user.uid;
            let db=ref(getDatabase(app));
            get(child(db, `users/${uid}`)).then((snapshot) => {
                if (snapshot.exists()) {
                    setRole(snapshot.val().role);
                    console.log(snapshot.val().role);
                } else {
                console.log("No data available");
                }
            }).catch((error) => {
                console.error(error);
            });

          } else {
          }
        });
    },
    []);

    if(role===`admin`)
    return(
        <>
            <BackButton/>
            <div className='container-fluid'>
                <div className='container d-inline-block h1 ms-4 text-primary my-3 mb-4'>
                   <em id="heading"> Manage Students</em>
                </div>
            </div>
            <div className="container-fluid p-3 px-5">
                <div className="accordion accordion-flush" id="accordionFlushExample">
                    <div className="accordion-item mb-5">
                        <h2 className="accordion-header" id="flush-headingOne">
                            <button className="accordion-button rounded-3 collapsed text-white fs-3 " type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                Add New Student
                            </button>
                        </h2>
                        <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">

                            </div>
                        </div>
                    </div>
                    <div className="accordion-item mb-5">
                        <h2 className="accordion-header" id="flush-headingTwo">
                        <button className="accordion-button collapsed rounded-3 text-white fs-3 " type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                            Migrate Student
                        </button>
                        </h2>
                        <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">

                            </div>
                        </div>
                    </div>
                    <div className="accordion-item mb-5">
                        <h2 className="accordion-header" id="flush-headingThree">
                        <button className="accordion-button collapsed rounded-3 text-white fs-3 " type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                            Modify Student Details
                        </button>
                        </h2>
                        <div id="flush-collapseThree" className="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
    else if(role===`student` || role===`teacher`)
        navigate('/',{replace:true});
    else
    return(
        <>
        </>
    );
}

export { ManageStudents };