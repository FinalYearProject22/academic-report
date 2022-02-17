import { getAuth,onAuthStateChanged} from "firebase/auth";
import { getDatabase , ref, child, get} from "firebase/database";
import {app} from "../../Firebase/firebase";
import { useEffect } from 'react'
import { useState } from "react";
import { AdminContent } from "../AdminContent/AdminContent"
import { StudentContent } from "../StudentContent/StudentContent"
import { TeacherContent } from "../TeacherContent/TeacherContent";

function ProfileContent(){

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
                <AdminContent/>
            </>
        );
    else if(role===`student`)
        return(
            <>
                <StudentContent/>
            </>
        );
    else if(role===`teacher`)
        return(
            <>
                <TeacherContent/>
            </>
        ); 
    else
        return(
            <>
            </>
        );
}


export { ProfileContent };
