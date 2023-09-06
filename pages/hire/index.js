import React, { useEffect, useState } from 'react'
import Nav from '../../components/navbar/Nav'
import styles from '../../styles/Edit.module.css'
import profile from '../../public/img/profile.png'
// import porto from '../../public/img/porto1.png'
import map from '../../public/img/map.png'
// import mail from '../../public/img/mail.png'
// import github from '../../public/img/github.png'
// import instagram from '../../public/img/instagram.png'
import Image from 'next/image'
import axios from 'axios'
import { useRouter } from 'next/router'

const Hire = () => {
    const router = useRouter();
    const [login, setlogin] = useState();
    useEffect(() => {
        const isLogin = localStorage.getItem("id_worker");
        setlogin(isLogin)
    })
    const [workers, setWorkers] = useState([]);
    useEffect(() => {
        if (router.isReady) {
            axios.get(`${process.env.NEXT_PUBLIC_API}/worker/${router.query.id}`)
                .then((res) => {
                    setWorkers(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }, [router.isReady]);

    //get skill
    const [skils, setSkils] = useState([]);
    useEffect(() => {
        if (router.isReady) {
            axios.get(`${process.env.NEXT_PUBLIC_API}/skill/${router.query.id}`)
                .then((res) => {
                    setSkils(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }, [router.isReady]);

    //get skill
    const [portos, setPortos] = useState([]);
    useEffect(() => {
        if (router.isReady) {
            axios.get(`${process.env.NEXT_PUBLIC_API}/portofolio/${router.query.id}`)
                .then((res) => {
                    setPortos(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }, [router.isReady]);

    //get experience
    const [experiences, setExperiences] = useState([]);
    useEffect(() => {
        if (router.isReady) {
            axios.get(`${process.env.NEXT_PUBLIC_API}/experience/${router.query.id}`)
                .then((res) => {
                    setExperiences(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }, [router.isReady]);
    return (
        <>
            <Nav />
            {/* <div className={styles.purples}></div> */}
            <div className="container">
                <div className="row ">
                    <div className="col-lg-4 col-md-4">
                        <div className={styles.wrapperLeft}>
                            {/* {workers.map((worker => ( */}
                            <div>
                                <div className='d-flex justify-content-center'>
                                    <Image src={profile} className={styles.image} alt='image' />
                                </div>
                                <div className="container px-5 mt-5">
                                    <div>
                                        <p className={styles.name}>Louist91</p>
                                        <p className={styles.job}>Web dev</p>
                                        <p className={styles.adress}><span><Image src={map} /></span>Ganeas</p>
                                        <p className={styles.adress}>lorem ipsum dolor sit amet.</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="mt-5">
                                        <h3 className={styles.skill}>Skill</h3>
                                        <div className="d-flex flex-wrap">
                                            {/* {skils.map((skil => ( */}
                                            <div className={styles['skill-item']}>skill</div>
                                            {/* )))} */}
                                        </div>
                                    </div>
                                    {/* <div className="mt-5">
                                            <div className="d-flex gap-3">
                                                <Image src={mail} className='mt-3' />
                                                <p className='mt-4' style={{ color: "#9EA0A5", fontSize: "12px", fontWeight: "400" }}>Louistommo@gmail.com</p>
                                            </div>
                                            <div className="d-flex gap-3">
                                                <Image src={instagram} className='mt-3' />
                                                <p className='mt-4' style={{ color: "#9EA0A5", fontSize: "12px", fontWeight: "400" }}>@Louist91</p>
                                            </div>
                                            <div className="d-flex gap-3">
                                                <Image src={github} className='mt-3' />
                                                <p className='mt-4' style={{ color: "#9EA0A5", fontSize: "12px", fontWeight: "400" }}>@Louistommo</p>
                                            </div>
                                        </div> */}
                                </div>
                            </div>
                            {/* )))} */}
                        </div>
                    </div>
                    <div className="col-lg-8 col-md-8">
                        <div style={{ marginTop: "100px" }}>
                            <h2 className='ps-5 pt-3' id={styles.titles}>Hubungi Louis</h2>
                            <p className='ps-5'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ipsum et dui rhoncus auctor.</p>
                            <div className="pe-2 pb-5 pt-5">
                                <div className="container ps-5">
                                    <form>
                                        <div className="mb-4">
                                            <label for="exampleFormControlInput1" className="form-label" id={styles.label}>Untuk posisi</label>
                                            <input type="text" name='name' className="form-control" id="exampleFormControlInput1" style={{ fontSize: "13px", fontWeight: "500", color: "#858D96", height: "40px" }} placeholder="Fullsatck" />
                                        </div>
                                        <div className="mb-4">
                                            <label for="exampleFormControlInput1" className="form-label" id={styles.label}>Deskripsi</label>
                                            <textarea type="text" name='description' className="form-control" id="exampleFormControlTextarea1" style={{ fontSize: "13px", fontWeight: "500", color: "#858D96", height: "200px" }} placeholder='Membuat fitur dan maintenace untuk dashboard admin dan posisi remote' />
                                        </div>
                                        <button type='submit' style={{ backgroundColor: "#FBB017", border: "none", color: "#fff", fontSize: "15px", fontWeight: "700", borderRadius: "4px", marginTop: "30px", width:"100%",height:"40px" }}>Hire</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Hire