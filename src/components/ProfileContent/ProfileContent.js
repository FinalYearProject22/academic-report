import { getAuth,onAuthStateChanged} from "firebase/auth";
import { getDatabase , ref, child, get} from "firebase/database";
import {app} from "../../Firebase/firebase";
import { useEffect } from 'react'
import { useRef } from "react";



// try using promise



function ProfileContent(){
    // let userrole=useRef(0);
    // useEffect(() => {
    //     const auth = getAuth();
    //     onAuthStateChanged(auth, (user) => {
    //       if (user) {
    //         const uid = user.uid;
    //         let db=ref(getDatabase(app));
    //         get(child(db, `users/${uid}`)).then((snapshot) => {
    //             if (snapshot.exists()) {
    //                 console.log(snapshot.val().role);
    //                 userrole=snapshot.val().role;
    //             } else {
    //             console.log("No data available");
    //             }
    //         }).catch((error) => {
    //             console.error(error);
    //         });

    //       } else {
    //       }
    //     });
    // },
    // [])
    // console.log(userrole.current);
    return(
        <>

        </>
    );
}


export { ProfileContent };