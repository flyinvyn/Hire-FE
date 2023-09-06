import React from 'react'
import style from './Footer.module.css'
import Image from 'next/image'
import logo from '../../public/logo/white.png'


const Footer = () => {
    return (
        <>
            <div className={style.footer}>
                <div className="container">
                    <Image src={logo} className='my-5' alt='logo' />
                    <div style={{width:300}}>
                    <p className={style.p}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ipsum et dui rhoncus auctor.</p>
                    </div>
                    <div style={{background:"white",width:"100%",height:"1px"}}></div>
                    <div className='mt-5 d-flex justify-content-between'>
                        <p className={style.p}>2020 Pewworld. All right reserved</p>
                        <div>
                            <button className={style.btn}>Telepon</button>
                            <button className={style.button}>Email</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer