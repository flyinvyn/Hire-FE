import React, { useEffect, useState } from 'react'
import Navlog from '../../components/navbar/Navlog';
import Nav from '../../components/navbar/Nav';

const NavbarAuth = () => {
const [login, setLogin] = useState();
useEffect(()=>{
  const isLogin = localStorage.getItem("token");
  setLogin(isLogin)
},[]);

if(!login){
  return <Navlog/>
}
return <Nav/>
}
export default NavbarAuth