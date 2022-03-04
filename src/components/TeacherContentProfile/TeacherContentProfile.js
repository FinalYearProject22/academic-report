import './TeacherContentProfile.css'
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getAuth,onAuthStateChanged} from "firebase/auth";
import { getDatabase , ref, child, get,onValue} from "firebase/database";
import {app} from "../../Firebase/firebase";


function TeacherContentProfile(){
    
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
    
        if(role===`teacher`)


        return(
            <>   <div className='container-fluid'>
                    <div className='container d-inline-block h1 ms-4 text-primary my-3 mb-4'>
                    <em> Allocate Marks</em>
                    </div>
                </div>
                <div className="container-fluid p-3 px-5">
                    <div className="container-fluid">
                        <div className="accordion accordion-flush" id="marksaccordion">
                            <BatchMarks/>
                        </div>
                    </div>      
                </div>
            
            </>
        );
        else if(role===`student` || role===`admin`)
            navigate('/',{replace:true});
        else
        return(
            <>
            </>
        );
}
    

function BatchMarks(){
    let[classes,setClasses]=useState(undefined);
    let[subdata,setSubData]=useState([]);

    useEffect(() => {
        fetchalldata();
    },
    []);

//try with option menu
    function fetchalldata(){
        let db = getDatabase();
        const auth = getAuth();
        let db1=ref(getDatabase(app));
        get(child(db1, `users/${auth.currentUser.uid}`)).then((snapshot) => {
            const dbRef = ref(db, `teachers/${snapshot.val().roll}/classes`);
            onValue(dbRef, (snapshot) => {
                // getclassdata(snapshot.val());
                setClasses(snapshot.val());
                let classess=snapshot.val();
                     var classdata = Object.keys(classess).map((key) => [key]);
        let datat=[];
        for (let index = 0; index < classdata.length; index++) {
            let tempobj={};
            let temparr='';
            temparr=temparr+classdata[index]
            let temp=temparr.split("\\")
            let batchid=`${temp[0]}\\${temp[1]}\\${temp[2]}\\${temp[3]}`
            let sem=('Semester'+temp[5].split("sem")).split(",").join(" ");
            let subcode=`${temp[7]}`
            let clas=`${temp[0]}\\${temp[1]}\\${temp[2]}\\${temp[3]}/${temp[4]}/${temp[5]}/${temp[6]}/${temp[7]}`
            let db = getDatabase();
            const dbRef = ref(db, `batches/${clas}`);
            onValue(dbRef, (snapshot) => {
                let subdata=snapshot.val();
                let subcredits=subdata.credits;
                let subname=subdata.name;
                let subtype=subdata.type;
                console.log(`${batchid}`)
                console.log(`${sem}`)
                console.log(`${subcode}`)
                console.log(subdata)
                console.log(`${subcredits}`)
                console.log(`${subname}`)
                console.log(`${subtype}`)
                tempobj={
                    batchid:batchid,
                    sem:sem,
                    subcode:subcode,
                    subdata:subdata,
                    subcredits:subcredits,
                    subname:subname,
                    subtype:subtype
                }
            });
            datat.push(tempobj);
        }
        setSubData(datat);
                
            });
        }).catch((error) => {
            console.error(error);
        });
    }
    // function getclassdata(classes){
    //     var classdata = Object.keys(classes).map((key) => [key]);
    //     let datat=[];
    //     for (let index = 0; index < classdata.length; index++) {
    //         let tempobj={};
    //         let temparr='';
    //         temparr=temparr+classdata[index]
    //         let temp=temparr.split("\\")
    //         let batchid=`${temp[0]}\\${temp[1]}\\${temp[2]}\\${temp[3]}`
    //         let sem=('Semester'+temp[5].split("sem")).split(",").join(" ");
    //         let subcode=`${temp[7]}`
    //         let clas=`${temp[0]}\\${temp[1]}\\${temp[2]}\\${temp[3]}/${temp[4]}/${temp[5]}/${temp[6]}/${temp[7]}`
    //         let db = getDatabase();
    //         const dbRef = ref(db, `batches/${clas}`);
    //         onValue(dbRef, (snapshot) => {
    //             let subdata=snapshot.val();
    //             let subcredits=subdata.credits;
    //             let subname=subdata.name;
    //             let subtype=subdata.type;
    //             console.log(`${batchid}`)
    //             console.log(`${sem}`)
    //             console.log(`${subcode}`)
    //             console.log(subdata)
    //             console.log(`${subcredits}`)
    //             console.log(`${subname}`)
    //             console.log(`${subtype}`)
    //             tempobj={
    //                 batchid:batchid,
    //                 sem:sem,
    //                 subcode:subcode,
    //                 subdata:subdata,
    //                 subcredits:subcredits,
    //                 subname:subname,
    //                 subtype:subtype
    //             }
    //         });
    //         datat.push(tempobj);
    //     }
    //     setSubData(datat);
    // }

    if(classes && classes !== "null" && classes !== "undefined"){
        
        function insertbatch(){
            
            let batchlist=[];
            for (let index = 0; index < subdata.length; index++) {
                let data=(subdata[index]);
                let batchid=data.batchid;
                let sem=data.sem;
                let subcode=data.subcode;
                let subdataa=data.subdata;
                let subcredits=data.subcredits;
                let subname=data.subname;
                let subtype=data.subtype;
                
                    batchlist.push(
                        <div key={index} className="accordion-item mb-5">
                        <h2 className="accordion-header" id={`BatchHeader${index}`}>
                        <button className="accordion-button teacherbut collapsed border border-info rounded-3 fs-5 " type="button" data-bs-toggle="collapse" data-bs-target={`#BatchBody${index}`} aria-expanded="false" aria-controls={`BatchBody${index}`}>
                        <div className='col-md-10'>
                            <div className='row mb-1 ms-3 h5'><span><em>Batch Id:</em> &nbsp;<span id="user-name">{batchid}</span></span></div>
                            <div className='row mb-1 ms-3 h5'><span><em>Sem:</em> &nbsp;<span id="user-dep"></span>{sem}</span></div>
                            <div className='row mb-1 ms-3 h5'><span><em>Subject Code:</em> &nbsp;<span id="user-role">{subcode}</span></span></div>
                            <div className='row mb-1 ms-3 h5'><span><em>Name:</em> &nbsp;<span id="user-id"></span>{subname}</span></div>
                            <div className='row mb-1 ms-3 h5'><span><em>Type:</em> &nbsp;<span id="user-id"></span>{subtype}</span></div>
                            <div className='row mb-1 ms-3 h5'><span><em>Credits:</em> &nbsp;<span id="user-email"></span></span></div>
                        </div>
                        </button>
                        </h2>
                        <div id={`BatchBody${index}`} className="accordion-collapse collapse" aria-labelledby={`BatchHeader${index}`} data-bs-parent="#marksaccordion">
                            <div className="accordion-body teacherbut">
                            </div>
                        </div>
                    </div>
                    )
            }
            
            return(batchlist);
        }
        return(
            <>
            {
                insertbatch()
            }

            </>
        );
    }
    else{
        return(
            <div className="h6 mt-3">
                No Classes are assigned to you.
            </div>
        );
    }
}




export { TeacherContentProfile };