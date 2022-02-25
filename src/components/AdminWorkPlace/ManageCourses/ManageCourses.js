import { getAuth,onAuthStateChanged} from "firebase/auth";
import { getDatabase , ref , child, get,onValue} from "firebase/database";
import {app} from "../../../Firebase/firebase";
import { useEffect } from 'react'
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { BackButton } from "../../BackButton/BackButton";


function ManageCourses(){

    let navigate=useNavigate();
    const [role, setRole] = useState(undefined);
    useEffect(() => {
        let db=ref(getDatabase(app));
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
          if (user) {
            const uid = user.uid;

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
                   <em id="heading"> Manage Courses</em>
                </div>
            </div>
            <div className="container-fluid p-3 px-5">
                <div className="accordion accordion-flush" id="ManageCoursesAccordion">
                    <div className="accordion-item mb-5">
                        <h2 className="accordion-header" id="AddNewCourseHeader">
                            <button className="accordion-button rounded-3 collapsed text-white fs-3 " type="button" data-bs-toggle="collapse" data-bs-target="#AddNewCourseBody" aria-expanded="false" aria-controls="AddNewCourseBody">
                                Add New Course
                            </button>
                        </h2>
                        <div id="AddNewCourseBody" className="accordion-collapse collapse" aria-labelledby="AddNewCourseHeader" data-bs-parent="#ManageCoursesAccordion">
                            <div className="accordion-body">
                                <CoursesTable/>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item mb-5">
                        <h2 className="accordion-header" id="ModifyCoursesHeader">
                        <button className="accordion-button collapsed rounded-3 text-white fs-3 " type="button" data-bs-toggle="collapse" data-bs-target="#ModifyCoursesBody" aria-expanded="false" aria-controls="ModifyCoursesBody">
                            Modify Courses
                        </button>
                        </h2>
                        <div id="ModifyCoursesBody" className="accordion-collapse collapse" aria-labelledby="ModifyCoursesHeader" data-bs-parent="#ManageCoursesAccordion">
                            <div className="accordion-body">

                            </div>
                        </div>
                    </div>
                    <div className="accordion-item mb-5">
                        <h2 className="accordion-header" id="DeleteCoursesHeader">
                        <button className="accordion-button collapsed rounded-3 text-white fs-3 " type="button" data-bs-toggle="collapse" data-bs-target="#DeleteCoursesBody" aria-expanded="false" aria-controls="DeleteCoursesBody">
                            Delete Courses
                        </button>
                        </h2>
                        <div id="DeleteCoursesBody" className="accordion-collapse collapse" aria-labelledby="DeleteCoursesHeader" data-bs-parent="#ManageCoursesAccordion">
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


function CoursesTable(){

    let[data,setData]=useState(undefined);

    useEffect(() => {
        fetchallcourses();
    },
    []);

    function fetchallcourses(){
        let db=ref(getDatabase(app));

        get(child(db, `courses/active`)).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());   
                setData(snapshot.val());            
            } else {
            console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    if(data===undefined){
        return(
            <>
            </>
        );
    }

    else{
        console.log(data);
        var formdata = Object.keys(data).map((key) => [key, data[key]]);
        return(
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">Course Id</th>
                    <th scope="col">Course Name</th>
                    <th scope="col">Total Semesters</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        // console.log(formdata),
                        formdata.map((item)=>(
                                <tr key={item[0]} >
                                <td>{item[0]}</td>
                                <td>{item[1].name}</td>
                                <td>{item[1].totalsem}</td>
                                </tr>
                                // console.log(item[0])
                        ))
                    }
                </tbody>
            </table>
        );
    }
}



export { ManageCourses };
