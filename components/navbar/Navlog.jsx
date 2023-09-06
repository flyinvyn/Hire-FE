import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import logo from '../../public/logo/purple.png'
import style from './Nav.module.css'
import Link from 'next/link'

const Navlog = () => {
    return (
        <>
            <Head>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossorigin="anonymous" />
            </Head>

            <div className="container-fluid bg-white fixed-top">
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-light">
                        <div className="container-fluid ">
                            <Link className="navbar-brand" href="/"><Image src={logo} alt='logo' /></Link>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                                <div className="navbar-nav mx-auto">
                                    <div className="">
                                    </div>
                                </div>
                                <Link href={'/login'}>
                                    <button className={style.hire} type="button">
                                        Login
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </>

    )
}

export default Navlog