import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getAuth,onAuthStateChanged} from "firebase/auth";
import { getDatabase , ref, child, get} from "firebase/database";
import {app} from "../../Firebase/firebase";

function StudentContentProfile(){
    
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

    if(role===`student`)
    return(
        <>
        fgsdkgh
        </>
    );
    else if(role===`teacher` || role===`admin`)
        navigate('/',{replace:true});
    else
    return(
        <>
        </>
    );
}


export { StudentContentProfile };
