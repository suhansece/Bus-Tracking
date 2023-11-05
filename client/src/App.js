import React from 'react';
import {BrowserRouter,Route,Routes}from 'react-router-dom';
import Navbar  from './components/Navbar';
import Main from './components/Main';
import Buslist from './components/Buslist';
import Buslocation from './components/Buslocation';
import Adminmain from './components/adminpage/adminmain';
import Addbus from './components/adminpage/adminaddbus';
import './App.css'
import LocationMap from './components/map';

const App=()=> {
  
  return (
    
     <BrowserRouter>
   <Navbar/>
   <Routes>
   <Route path='/' element={<Main/>}/>
    <Route path='/bus/:id' element={Buslocation}/>
    <Route path='/admin' element={<Adminmain/>}/>
    <Route path='/admin/addbus' element={<Addbus/>}/>
    <Route path='/map' element={<LocationMap/>}/>
   </Routes>
   </BrowserRouter>
   
  
  );
}

export default App;
