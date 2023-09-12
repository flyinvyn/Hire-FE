import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import logo from '../../public/logo/purple.png'
import style from './Nav.module.css'
import Link from 'next/link'
import bell from '../../public/img/bel.png'
import mail from '../../public/img/mail.png'
import profile from '../../public/img/noimage.png'
import { useRouter } from 'next/router'

const Nav = () => {
    const router = useRouter();
    const [login, setLogin] = useState();
    useEffect(()=>{
        const isLogin = localStorage.getItem("id_worker");
        setLogin(isLogin);
    },[])
    
    const [auth,setAuth] = useState();
    useEffect(()=>{
        const isAuth = localStorage.getItem("role")
        setAuth(isAuth)
    })
    return (
        <>
            <div className="container-fluid bg-white fixed-top">
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-light">
                        <div className="container-fluid">
                            <Link className="navbar-brand" href="/"><Image src={logo} alt='logo' /></Link>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                                <div className="navbar-nav mx-auto">
                                    <div className="">
                                    </div>
                                </div>
                                <div className="">
                                    <button className={style.bell} type="button">
                                        <Image src={bell} alt='bell' />
                                    </button>
                                    <button className={style.bell} type="button">
                                        <Image src={mail} alt='mail' />
                                    </button>
                                    <div className="btn-group">
                                            <div
                                                className="ms-md-5 ms-4"
                                                data-bs-toggle="dropdown"
                                                data-bs-display="static"
                                                aria-expanded="false"
                                            >
                                                <Image src={ profile } width={30} height={30} className={style.img} alt='profile' />
                                            </div>
                                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-lg-start">
                                            <li>
                                                    <button
                                                        className="dropdown-item"
                                                        type="button"
                                                        style={{ display: "inline-block" }}
                                                        onClick={() => {  
                                                            router.push(auth === "worker" ? `/edit-profile/${login}` : `edit-recruiter/${login}`);
                                                        }}
                                                    >
                                                        Profile
                                                    </button>
                                            </li>
                                            <li>
                                                <button
                                                    className="dropdown-item"
                                                    type="button"
                                                    onClick={() => {
                                                        localStorage.clear();
                                                        router.push("/");
                                                        setTimeout(function () {
                                                            window.location.reload();
                                                        }, 1000);
                                                    }}
                                                >
                                                    Logout
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </>

    )
}

export default Nav