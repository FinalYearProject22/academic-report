import { getAuth,onAuthStateChanged} from "firebase/auth";
import { getDatabase , ref , child, get, set,onValue} from "firebase/database";
import {app} from "../../../Firebase/firebase";
import { useEffect } from 'react'
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { BackButton } from "../../BackButton/BackButton";
import { showModal } from "../../MainModal/MainModal";


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
                                <form className="container">
                                    <div className="row">
                                        <div className="col-md-6  p-2">
                                            <div className="input-group  ">
                                                <label className="input-group-text" htmlFor="degreetype">Degree Type</label>
                                                <select defaultValue={'Bachelors'} className="form-select" id="degreetype">
                                                    <option  value="Bachelors">Bachelors</option>
                                                    <option value="Masters">Masters</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-6 p-2">
                                        <div className="input-group ">
                                                <label className="input-group-text" htmlFor="degreedomain">Degree Domain</label>
                                                <select  defaultValue={'Technology'} className="form-select" id="degreedomain">
                                                    <option value="Technology">Technology</option>
                                                    <option value="Science">Science</option>
                                                    <option value="Computer Application">Computer Application</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6  p-2">
                                            <div className="input-group  ">
                                                <label className="input-group-text" htmlFor="major">Major</label>
                                                <select defaultValue={'Informationa Technology'} className="form-select" id="major">
                                                    <option value="Information Technology">Information Technology</option>
                                                    <option value="Computer Science">Computer Science</option>
                                                    <option value="Electrical Engineering">Electrical Engineering</option>
                                                    <option value="Electrical & Communication Engineering">Electrical & Communication Engineering</option>
                                                    <option value="Applied Electronics">Applied Electronics</option>
                                                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-6 p-2">
                                        <div className="input-group ">
                                                <label className="input-group-text" htmlFor="semesters">Number Of Semesters</label>
                                                <select defaultValue={'8'} className="form-select" id="semesters">
                                                    <option value="2">2</option>
                                                    <option value="4">4</option>
                                                    <option value="6">6</option>
                                                    <option value="8">8</option>
                                                    <option value="10">10</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="container text-center mt-3">
                                        <button onClick={addCourse} className="btn btn-primary btn-lg">Add Course</button>
                                    </div>
                                </form>
                                <CurrentCoursesTable/>
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
                            <DeleteCoursesTable/>
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

function addCourse(){
    var degreetype=(document.getElementById("degreetype").value);
    var degreedomain=(document.getElementById("degreedomain").value);
    var major=(document.getElementById("major").value);
    var semesters=(document.getElementById("semesters").value);
    let courseid;

    if(degreetype==='Bachelors')
        courseid=`B`;
    else
        courseid=`M`;


    switch(degreedomain) {
        case "Technology":
            courseid=courseid+`tech`;
            break;
        case "Science":
            courseid=courseid+`Sc`;
            break;
        case "Computer Application":
            courseid=courseid+`CA`;
            break;
        default:
            courseid=courseid+``;
    }

    switch(major) {
        case "Information Technology":
            courseid=courseid+"\\IT";
            break;
        case "Computer Science":
            courseid=courseid+`\\CS`;
            break;
        case "Electrical Engineering":
            courseid=courseid+`\\EE`;
            break;
        case "Electrical & Communication Engineering":
                courseid=courseid+`\\ECE`;
                break;
        case "Applied Electronics":
            courseid=courseid+`\\AE`;
            break;
        case "Mechanical Engineering":
                courseid=courseid+`\\ME`;
                break;
        default:
            courseid=courseid+``;
    }

    courseid=courseid+`\\`+ new Date().getFullYear();
    let coursename= degreetype + ` in ` + degreedomain + ` (`  + major + `)`; 

    let currentcourses=[];
    let db=ref(getDatabase(app));
    get(child(db, `courses/active`)).then((snapshot) => {
        if (snapshot.exists()) { 
            currentcourses=Object.keys(snapshot.val());
            let flag=0;
            currentcourses.forEach(element => {
                if(element===courseid)
                    flag=1;
 
            });
            if(flag===0){
                let db=(getDatabase(app));
                set(ref(db, 'courses/active/'+courseid), {
                  name: coursename,
                  totalsem: semesters
                });
                showModal(`New Course is created `, `Add Details to the course by Modifying the course`);
              //   CurrentCoursesTable.fetchallcourses();
            }
            else{
                showModal(`Course can not be created `, `Delete the course with Id: ${courseid} and then try`);
            }
        } else {
        console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
    
}




function CurrentCoursesTable(){

    let[data,setData]=useState(undefined);

    useEffect(() => {
        fetchallcourses();
    },
    []);

    function fetchallcourses(){
        let db = getDatabase();
        const dbRef = ref(db, 'courses/active');

        onValue(dbRef, (snapshot) => {
            setData(snapshot.val());
        });
    }

    if(data===undefined){
        return(
            <>
            </>
        );
    }

    else{
        var formdata = Object.keys(data).map((key) => [key, data[key]]);
        return(
            <>
`                <div className="h4 text-info">
                    Current Courses
                </div>
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
            </>
        );
    }
}



function DeleteCoursesTable(){
    let[data,setData]=useState(undefined);

    useEffect(() => {
        fetchallcourses();
    },
    []);

    function fetchallcourses(){
        let db = getDatabase();
        const dbRef = ref(db, 'courses/active');

        onValue(dbRef, (snapshot) => {
            setData(snapshot.val());
        });
    }

    if(data===undefined){
        return(
            <>
            </>
        );
    }

    else{
        var formdata = Object.keys(data).map((key) => [key, data[key]]);
        return(
            <>
`                <div className="h2 text-info">
                    Current Courses
                </div>
                <table className="table">
                <thead>
                    <tr>
                    <th scope="col">Course Id</th>
                    <th scope="col">Course Name</th>
                    <th scope="col">Total Semesters</th>
                    <th scope="col">Action</th>
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
                                <td>
                                    <button className="btn btn-sm btn-danger">
                                        Delete
                                    </button>
                                </td>
                                </tr>
                        ))
                    }
                </tbody>
            </table>
            </>
        );
    }
}

export { ManageCourses};
