import {initializeApp} from 'firebase/app';
import {getDatabase}from'firebase/database';

function StartFireBase(){
  const firebaseConfig = {
    apiKey: "AIzaSyA04WDsGeZoDb7tP7Lc9rlAYAc7GEurIY4",
    authDomain: "bust-dd7c3.firebaseapp.com",
    projectId: "bust-dd7c3",
    storageBucket: "bust-dd7c3.appspot.com",
    messagingSenderId: "491403132071",
    appId: "1:491403132071:web:b40b54db5115d6c4c42f82",
    measurementId: "G-NLW1NM5WBQ"
  };
  
  const app=initializeApp(firebaseConfig);
  return getDatabase(app)
}


export default StartFireBase;
