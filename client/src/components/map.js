// src/App.js
import React, { useEffect, useState } from 'react';
import firebase from '../firebase';


function LocationApp() {
  const [data, setData] = useState({});
  console.log(data);
  useEffect(() => {
    const fireDb=firebase.database().ref('/location');
    fireDb.on("value",(snapshot)=>{
      const newData = snapshot.val();
      if(newData){
        setData(newData)
      }else{
        setData({});
      }
    });
   
  }, []);

  return (
    <div className="App">
      <h1>Realtime Database Data:</h1>
      <pre>d</pre>
    </div>
  );
}

export default LocationApp;
