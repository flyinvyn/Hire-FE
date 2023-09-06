import { useRouter } from 'next/router';
import styles from '../../styles/Edit.module.css'
import { Exp } from './Exp'
import { useEffect, useState } from 'react';
import axios from 'axios';
// import DatePicker from 'react-date-picker';
// import 'react-date-picker/dist/DatePicker.css';
// import 'react-calendar/dist/Calendar.css';
import Swal from 'sweetalert2'
import ModalDelete from '../modal/ModalDelete';
import ModalEditExp from '../modal/ModalEditExp';

export const Experience = () => {
    const router = useRouter();

    const [sign, setSign] = useState()
    console.log(sign);
    useEffect(() => {
        if (router.isReady) {
            const isSign = localStorage.getItem("id_worker");
            setSign(isSign)
        }
    }, [router.isReady]);

    const [datas, setDatas] = useState({
        position: "",
        company_name: "",
        work_start: "",
        work_end: "",
        description: "",
        id_worker: ""
    })
    const handleChange = (e) => {
        setDatas({
            ...datas,
            [e.target.name]: e.target.value
        })
        console.log(datas);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${process.env.NEXT_PUBLIC_API}/experience`, datas)
            .then((res) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Successfully',
                    text: 'Experience created',
                })
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const [portos, setPortos] = useState([]);
    // useEffect(() => {
    //     const isLogin = localStorage.getItem("id_worker")
    //     setPortos(isLogin)
    // }, []);
    useEffect(() => {
        if (router.isReady) {
            axios.get(`${process.env.NEXT_PUBLIC_API}/experience/${router.query.id}`)
                .then((res) => {
                    setPortos(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }, [router.isReady])
    // const [startDate, setStartdate] = useState(new Date())
    // const onChangeDateHandler = (value) =>{
    //     setStartdate(value);
    // }
    return (
        <>
            <div className='mt-5' id={styles['wrapper-right']}>
                <h2 className='ps-5 pt-3' id={styles.title}>Pengalaman kerja</h2>
                <hr />
                <div className="container">
                    {portos.map((item) => (
                        <div className="row">
                            <div className="col-lg-8 col-md-8">
                                <div className='ps-5'>
                                    <div className="">
                                        <p id={styles.title}>{item?.position}</p>
                                    </div>
                                    <p style={{ fontSize: "14px", color: "#46505C" }}>{item?.company_name}</p>
                                    <div className="d-flex gap-3">
                                        <p style={{ fontSize: "12px", color: "#9EA0A5" }}>{item?.work_start}</p>
                                        <p style={{ fontSize: "12px", color: "#9EA0A5" }}>-</p>
                                        <p style={{ fontSize: "12px", color: "#9EA0A5" }}>{item?.work_end}</p>
                                    </div>
                                    <p className='mt-3' style={{ width: "450px" }}>{item?.description}</p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4">
                                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <ModalEditExp id_exp={item.id_exp}
                                                position={item.position}
                                                company_name={item.company_name}
                                                work_start={item.work_start}
                                                work_end={item.work_end}
                                                description={item.description}
                                                id_worker={item.id_worker}
                                                 >Update</ModalEditExp>
                                    <ModalDelete id={item.id_exp}>Delete</ModalDelete>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <hr />
                <div className="ps-5 pe-5 pb-5">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <input type="hidden" name='id_worker' value={(datas.id_worker = sign)} />
                        </div>
                        <div className="mb-4">
                            <label for="exampleFormControlInput1" className="form-label" id={styles.label}>Posisi</label>
                            <input type="text" name='position' onChange={handleChange} className="form-control" id="exampleFormControlInput1" style={{ fontSize: "13px", fontWeight: "500", color: "#858D96", height: "40px" }} placeholder="Web developer" required />
                        </div>
                        <div className="row">
                            <div className="col-lg-6 col-md-6">
                                <div className="mb-4">
                                    <label for="exampleFormControlInput1" className="form-label" id={styles.label}>Nama perusahaan</label>
                                    <input type="text" name='company_name' onChange={handleChange} className="form-control" id="exampleFormControlInput1" style={{ fontSize: "13px", fontWeight: "500", color: "#858D96", height: "40px" }} placeholder="PT Karya Guna Jaya" required />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3">
                                <div className="mb-4">
                                    {/* <p id={styles.label}>Dari bulan/tahun</p> */}
                                    {/* <DatePicker selected={startDate} onChange={onChangeDateHandler} /> */}
                                    <label for="exampleFormControlInput1" className="form-label" id={styles.label}>Dari Bulan/tahun</label>
                                    <input type="date" name='work_start' onChange={handleChange} className="form-control" id="exampleFormControlInput1" style={{ fontSize: "13px", fontWeight: "500", color: "#858D96", height: "40px" }} placeholder="Januari 2018" required />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3">
                                <div className="mb-4">
                                    {/* <p id={styles.label}>Sampai bulan/tahun</p> */}
                                    {/* <DatePicker  /> */}
                                    <label for="exampleFormControlInput1" className="form-label" id={styles.label}>Sampai Bulan/tahun</label>
                                    <input type="date" name='work_end' onChange={handleChange} className="form-control" id="exampleFormControlInput1" style={{ fontSize: "13px", fontWeight: "500", color: "#858D96", height: "40px" }} placeholder="Januari 2019" required />
                                </div>
                            </div>
                        </div>
                        <div className="mb-5">
                            <label for="exampleFormControlTextarea1" className="form-label" id={styles.label}>Deskripsi singkat</label>
                            <textarea className="form-control" name='description' onChange={handleChange} id="exampleFormControlTextarea1" style={{ fontSize: "13px", fontWeight: "500", color: "#858D96", height: "100px" }} rows="3" placeholder='Deskripsikan pekerjaan anda' required />
                        </div>
                        <hr className='mb-5' />
                        <div className="d-grid">
                            <button className={styles['save-experience']} type="submit">Tambah pengalaman kerja</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
