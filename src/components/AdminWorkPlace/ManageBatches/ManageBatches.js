import { getAuth,onAuthStateChanged} from "firebase/auth";
import { getDatabase , ref, child, get,onValue,set,update,push, remove,increment} from "firebase/database";
import {app} from "../../../Firebase/firebase";
import { useEffect } from 'react'
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { BackButton } from "../../BackButton/BackButton";
import { showModal } from "../../MainModal/MainModal";



function ManageBatches(){

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
                   <em id="heading"> Manage Batches</em>
                </div>
            </div>
            <div className="container-fluid p-3 px-5">
                <div className="accordion accordion-flush" id="ManageBatchesAccordion">
                    <div className="accordion-item mb-5">
                        <h2 className="accordion-header" id="AddNewBatchHeader">
                            <button className="accordion-button rounded-3 collapsed text-white fs-3 " type="button" data-bs-toggle="collapse" data-bs-target="#AddNewBatchBody" aria-expanded="false" aria-controls="AddNewBatchBody">
                                Add New Batch (correct remove teacher and student)
                            </button>
                        </h2>
                        <div id="AddNewBatchBody" className="accordion-collapse collapse" aria-labelledby="AddNewBatchHeader" data-bs-parent="#ManageBatchesAccordion">
                            <div className="accordion-body">

                            <AddBatch/>
                            <CurrentBatchesTable/>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item mb-5">
                        <h2 className="accordion-header" id="ChangeSemHeader">
                        <button className="accordion-button collapsed rounded-3 text-white fs-3 " type="button" data-bs-toggle="collapse" data-bs-target="#ChangeSemBody" aria-expanded="false" aria-controls="ChangeSemBody">
                            Change Semesters (Delete Teacher batches)
                        </button>
                        </h2>
                        <div id="ChangeSemBody" className="accordion-collapse collapse" aria-labelledby="ChangeSemHeader" data-bs-parent="#ManageBatchesAccordion">
                            <div className="accordion-body">
                            <div className="col-md-12 p-2">
                            <div className="container text-center">
                                <div className="my-3 fs-4 text-danger">
                                <em>Changed Semesters can not be  brought back to its intial state</em>
                                </div>
                                <button onClick={()=>{
                                        incrementsem();
                                    }} id="courseselectorbtn" className="btn btn-danger btn-lg btn">Increment Semester</button>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item mb-5">
                        <h2 className="accordion-header" id="AssignStudentsHeader">
                        <button className="accordion-button collapsed rounded-3 text-white fs-3 " type="button" data-bs-toggle="collapse" data-bs-target="#AssignStudentsBody" aria-expanded="false" aria-controls="AssignStudentsBody">
                            Assign Students
                        </button>
                        </h2>
                        <div id="AssignStudentsBody" className="accordion-collapse collapse" aria-labelledby="AssignStudentsHeader" data-bs-parent="#ManageBatchesAccordion">
                            <div className="accordion-body">
                                {/* <AssignStudents/> */}
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item mb-5">
                        <h2 className="accordion-header" id="AssignTeachersHeader">
                        <button className="accordion-button collapsed rounded-3 text-white fs-3 " type="button" data-bs-toggle="collapse" data-bs-target="#AssignTeachersBody" aria-expanded="false" aria-controls="AssignTeachersBody">
                            Assign Teachers
                        </button>
                        </h2>
                        <div id="AssignTeachersBody" className="accordion-collapse collapse" aria-labelledby="AssignTeachersHeader" data-bs-parent="#ManageBatchesAccordion">
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


// function CurrentStudents({batchid}){

//     let[data,setData]=useState(undefined);
//     // let[courseid,setcourseid]=useState("");

//     useEffect(() => {
//             fetchallcourses();
//     },
//     []);

//     function fetchallcourses(){
//         let db = getDatabase();
//         const dbRef = ref(db, 'batches/'+batchid);
//         // get(child(ref(db), `batches/`+batchid+``)).then((snapshot) => {
//         //     console.log(snapshot.val())
//         // }).catch((error) => {
//         //     console.error(error);
//         // });
//         onValue(dbRef, (snapshot) => {
//             setData(snapshot.val());
//         });
//     }
//     if(data && data !== "null" && data !== "undefined"){
//         return(
//             <div className="h6 mt-3">
//                 gfjnh
//                 {console.log(data)}
//             </div>
//         );

//     }
//     else
//     return(
//         <div className="h6 mt-3">
// kl;jk
//         </div>
//     );
// }



// function AssignStudents(){

//     let[data,setData]=useState(undefined);
//     let[batchid,setbatchid]=useState("");

//     useEffect(() => {
//         fetchallcourses();
//     },
//     []);

//     function fetchallcourses(){
//         let db = getDatabase();
//         const dbRef = ref(db, 'batches');

//         onValue(dbRef, (snapshot) => {
//             setData(snapshot.val());
//         });
//     }
 
//     if(data && data !== "null" && data !== "undefined"){
//         var coursedata = Object.keys(data).map((key) => [key, data[key]]);
//         return(
//         <>
//             <div className="container" id="courseselector">
//             <div className="row">
//                 <div className="col-md-8 p-2">
//                     <div className="input-group  ">
//                         <label className="input-group-text" htmlFor="selectbatch">Select Batch</label>
//                         <select defaultValue={''} className="form-select" id="selectbatch">
//                         {
//                             coursedata.map((item)=>(
//                                     <option  key= {item[0]} value={item[0]}>{item[0]+` : `+ item[1].name}</option>
//                             ))
//                         }
//                         </select>
//                     </div>
//                 </div>
//                 <div className="col-md-4 p-2">
//                     <div className="container text-center">
//                         <button onClick={()=>{
//                             // setbatchid(document.getElementById("selectbatch").value)
//                             console.log(`Hola`)
//                         }} id="courseselectorbtn" className="btn btn-primary btn">Select Batch</button>
//                     </div>
//                 </div>
//             </div>
//             </div>
//             <CurrentStudents batchid={batchid}/>
//         </>
//         );
//     }
//     else
//     return(
//         <div className="h6 mt-3">
//         No Batches Present
//         </div>
//     );

// }





function incrementsem(){
    let db1=getDatabase(app);
    let db=ref(getDatabase(app));
    set(ref(db1, 'Assesments/PA'), {
        pa1:true,
        pa2:false,
    });
    set(ref(db1, 'Assesments/CA'), {
        ca1:true,
        ca2:false,
        ca3:false,
        ca4:false
    });  
    get(child(db, `batches/`)).then((snapshot) => {
        console.log(snapshot.val())
        if(snapshot.val()!==null){
            for (const key in snapshot.val()) {
                console.log(key)
                get(child(db, `batches/${key}`)).then((snapshot) => {

                    console.log(snapshot.val().curr)
                    console.log(snapshot.val().totalsem)
                    let current=snapshot.val().curr
                    let total=snapshot.val().totalsem
                    if(current===`Batch Over`){

                    }
                    else if(current<total){
                        current++
                    }else{
                        current=`Batch Over`
                    }

                    const updates = {};
                    updates['/batches/' + key+`/curr`] = current;
                    update(ref(db1), updates);

                    console.log(snapshot.val())
                }).catch((error) => {
                    console.error(error);
                });
            }
        }

    }).catch((error) => {
        console.error(error);
    });


}


function AddBatch(){

        let[data,setData]=useState(undefined);
        // let[courseid,setcourseid]=useState("");
    
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
     
        if(data && data !== "null" && data !== "undefined"){
            var coursedata = Object.keys(data).map((key) => [key, data[key]]);
            return(
            <>
                <div className="container" id="courseselectorbatch">
                <div className="row">
                    <div className="col-md-6 p-2">
                        <div className="input-group  ">
                            <label className="input-group-text" htmlFor="coursetoselect">Select Course</label>
                            <select defaultValue={''} className="form-select" id="coursetoselect">
                            {
                                coursedata.map((item)=>(
                                        <option  key= {item[0]} value={item[0]}>{item[0]+` : `+ item[1].name}</option>
                                ))
                            }
                            </select>
                        </div>
                    </div>
                    <div className="col-md-6 p-2">
                        <div className="container text-center">
                        <input id="batchname" type="text" className="form-control" placeholder="Batch Name" aria-label="Batch Name"></input>
                        </div>
                    </div>
                    <div className="col-md-12 p-2">
                        <div className="container text-center">
                            <button onClick={()=>{
                                AddBatchUtility(document.getElementById("coursetoselect").value,document.getElementById("batchname").value)
                            }} id="courseselectorbtn" className="btn btn-primary btn">Add Batch</button>
                        </div>
                    </div>
                    
                </div>
                </div>
            </>
            );
        }
        else
        return(
            <div className="h6 mt-3">
            No Courses to Modify
            </div>
        );
}



function AddBatchUtility(courseid,batchname){
    console.log(courseid+` `+batchname)
    let batchid=courseid+`\\`+new  Date().getFullYear();
    let db=ref(getDatabase(app));
    get(child(db, `courses/active/${courseid}`)).then((snapshot) => {
        if (snapshot.exists()) {
            let coursedetails=snapshot.val();
            coursedetails[`curr`]=1;
            coursedetails[`courseid`]=courseid;
            coursedetails[`name`]=batchname;
            console.log(coursedetails);
            get(child(db, `batches/`)).then((snapshot) => {
                if (snapshot.exists()) {
                    console.log(snapshot.val());
                    let flag=0;
                    for (const key in snapshot.val()) {
                        if(batchid===key)
                            flag=1;
                    }
                    if(flag===1){
                        showModal(`This Batch Already exists`,`This Batch was already created for current semester.`);
                    }
                    else{
                        console.log(batchid);
                        const db1 = getDatabase();
                        const updates = {};
                        updates['/batches/' + batchid] = coursedetails;
                        update(ref(db1), updates);

                    }

                } else {
                    console.log(batchid);
                    const db1 = getDatabase();
                    const updates = {};
                    updates['/batches/' + batchid] = coursedetails;
                    update(ref(db1), updates);
                }
            }).catch((error) => {
                console.error(error);
            });


        } else {
        console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });



}


function CurrentBatchesTable(){

    let[data,setData]=useState(undefined);

    useEffect(() => {
        fetchallcourses();
    },
    []);

    function fetchallcourses(){
        let db = getDatabase();
        const dbRef = ref(db, 'batches/');

        onValue(dbRef, (snapshot) => {
            setData(snapshot.val());
        });
    }


    if(data && data !== "null" && data !== "undefined"){
        
        var formdata = Object.keys(data).map((key) => [key, data[key]]);
        return(
            <>
`                <div className="h4 text-info">
                    Current Batches
                </div>
                <table className="table">
                <thead>
                    <tr>
                    <th scope="col">Batch Id</th>
                    <th scope="col">Batch Name</th>
                    <th scope="col">Course Id</th>
                    <th scope="col">Current Semester</th>
                    </tr>
                </thead>
                <tbody>
                    {

                        formdata.map((item)=>(
                                <tr key={item[0]} >
                                <td>{item[0]}</td>
                                <td className="col-6">{item[1].name}</td>
                                <td>{item[1].courseid}</td>
                                <td>{item[1].curr}</td>
                                </tr>
                        ))
                    }
                </tbody>
            </table>
            </>
        );
    }
    else{
        return(
            <div className="h6 mt-3">
            No Batches are currently available
            </div>
        );
    }
}

export { ManageBatches };