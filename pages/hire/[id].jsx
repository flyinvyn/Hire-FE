import React, { useEffect, useState } from 'react'
import Nav from '../../components/navbar/Nav'
import styles from '../../styles/Edit.module.css'
import profile from '../../public/img/noimage.png'
import map from '../../public/img/map.png'
import Image from 'next/image'
import axios from 'axios'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'

const Hire = () => {
    const router = useRouter();
    const [workers, setWorkers] = useState([])
    useEffect(() => {
        if (router.isReady) {
            axios.get(`${process.env.NEXT_PUBLIC_API}/worker/profile/${router.query.id}`)
                .then((res) => {
                    setWorkers(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.isReady]);

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.isReady]);

    const [data, setData] = useState({
        offering: "",
        description: "",
        id_worker: "",
        name: "",
        email: "",
        rec_id: "",
        rec_compname: "",
        rec_email: "",
    });

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
    });

    

    const handleSubmitHire = (e) => {
        e.preventDefault();
        try {
            axios.post(`${process.env.NEXT_PUBLIC_API}/hire`, data).then((res) => {
                if (res.data.statusCode === 201) {
                    Toast.fire({
                        title:
                            "Please check your email for further instructions",
                        icon: "success",
                    }).then(() => {
                        window.location.reload();
                    });
                }
            });
        } catch (err) { }
    };

    const [id, setId] = useState();
    useEffect(() => {
        const login = localStorage.getItem("id_worker")
        setId(login)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const [rec, setRec] = useState();
    useEffect(() => {
        const login = localStorage.getItem("id_worker")
        axios.get(`${process.env.NEXT_PUBLIC_API}/recruiter/profile/${login}`)
            .then((res) => {
                setRec(res.data.data[0]);
            })
            .catch((err) => {
                console.log(err);
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    function simulateNetworkRequest() {
      return new Promise((resolve) => setTimeout(resolve, 2000));
    }

    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
      });
    }
  }, [isLoading]);

    return (
        <>
            <Nav />
            {/* <div className={styles.purples}></div> */}
            <div className="container">
                <div className="row ">
                    <div className="col-lg-4 col-md-4">
                        <div className={styles.wrapperLeft}>
                            {workers.map((worker, index) => (
                                <div key={index}>
                                    <div className='d-flex justify-content-center'>
                                        <Image src={worker.photo === "null" || worker.photo === null ? profile : worker.photo} width={150} height={150} style={{ borderRadius: "50%", marginTop: "20px" }} alt='profile' />
                                    </div>
                                    <div className="container px-5 mt-5">
                                        <div>
                                            <p className={styles.name}>{isLoading ? "Loading.." : worker.name}</p>
                                            <p className={styles.job}>Web dev</p>
                                            <p className={styles.adress}><span><Image src={map} alt='map' /></span>{worker.domisili}</p>
                                            <p className={styles.adress}>{worker.description}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="mt-5">
                                            <h3 className={styles.skill}>Skill</h3>
                                            <div style={{ marginLeft: "18px" }} className="d-flex flex-wrap">
                                                {skils.map((skil, index) => (
                                                    <div key={index} className={styles['skill-item']}>{skil.skill_name}</div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-lg-8 col-md-8">
                        {workers.map((worker, index) => (
                            <div key={worker.id_worker} style={{ marginTop: "100px" }}>
                                <h2 className='ps-5 pt-3' id={styles.titles}>Hubungi {worker.name}</h2>

                                <p className='ps-5'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ipsum et dui rhoncus auctor.</p>
                                <div className="pe-2 pb-5 pt-5">
                                    <div className="container ps-5">
                                        <form onSubmit={handleSubmitHire}>
                                            <div className="mb-4">
                                                <label for="exampleFormControlInput1" className="form-label" id={styles.label}>Untuk posisi</label>
                                                <input type="text" name='offering' onChange={handleChange} className="form-control" id="exampleFormControlInput1" style={{ fontSize: "13px", fontWeight: "500", color: "#858D96", height: "40px" }} placeholder="Fullsatck" />
                                            </div>
                                            <div className="mb-4">
                                                <label for="exampleFormControlInput1" className="form-label" id={styles.label}>Deskripsi</label>
                                                <textarea type="text" name='description' onChange={handleChange} className="form-control" id="exampleFormControlTextarea1" style={{ fontSize: "13px", fontWeight: "500", color: "#858D96", height: "200px" }} placeholder='Membuat fitur dan maintenace untuk dashboard admin dan posisi remote' />
                                            </div>
                                            <div>
                                                <input type="hidden" name='id_worker' value={(data.id_worker = router.query.id)} className="form-control" id="exampleFormControlInput1" />
                                                <input type="hidden" name='name' value={(data.name = worker.name)} className="form-control" id="exampleFormControlInput1" />
                                                <input type="hidden" name='email' value={(data.email = worker.email)} className="form-control" id="exampleFormControlInput1" />
                                                <input type="hidden" name='rec_id' value={(data.rec_id = id)} className="form-control" id="exampleFormControlInput1" />
                                                <input type="hidden" name='rec_compname' value={(data.rec_compname = rec.rec_compname)} className="form-control" id="exampleFormControlInput1" />
                                                <input type="hidden" name='rec_compname' value={isLoading ? "Loading.." :(data.rec_email = rec.rec_email)} className="form-control" id="exampleFormControlInput1" />
                                            </div>
                                            <button type='submit' style={{ backgroundColor: "#FBB017", border: "none", color: "#fff", fontSize: "15px", fontWeight: "700", borderRadius: "4px", marginTop: "30px", width: "100%", height: "40px" }}>Hire</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Hire