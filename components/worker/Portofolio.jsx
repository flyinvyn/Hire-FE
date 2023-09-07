import { useRouter } from 'next/router'
import styles from '../../styles/Edit.module.css'
import { Porto } from './Porto'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
// import ModalDelete from '../modal/ModalDelete';
import profile from '../../public/img/profile.png'
import ModalDeletePorto from '../modal/ModalDeletePorto';
import Image from 'next/image';
// import ModalEditExp from '../modal/ModalEditExp';
import ModalEditPorto from '../modal/ModalEditPorto';

export const Portofolio = () => {
    const router = useRouter();
    const [datas, setDatas] = useState([]);
    const [login, setLogin] = useState()
    useEffect(() => {
        const isLogin = localStorage.getItem("id_worker")
        setLogin(isLogin)
    }, []);


    useEffect(() => {
        if (router.isReady) {
            axios.get(`${process.env.NEXT_PUBLIC_API}/portofolio/${router.query.id}`)
                .then((res) => {
                    setDatas(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.isReady])

    const [porto, setPorto] = useState({
        apk_name: "",
        link_repo: "",
        type: "",
        id_worker: ""
    })

    const [preview, setPreview] = useState(null);
    const [photo, setPhoto] = useState(null);
    const handleUpload = (e) => {
        const img = e.target.files[0];
        setPhoto(img);
        setPreview(URL.createObjectURL(img));
    };

    const handleChange = (e) => {
        setPorto({
            ...porto,
            [e.target.name]: e.target.value
        })
        console.log(porto);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('apk_name', porto.apk_name)
        formData.append('link_repo', porto.link_repo)
        formData.append('type', porto.type)
        formData.append('photo', photo)
        formData.append('id_worker', porto.id_worker)
        axios.post(`${process.env.NEXT_PUBLIC_API}/portofolio`, formData)
            .then((res) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Successfully',
                    text: 'Portofolio created'
                })
                window.location.reload()

            })
            .catch((err) => {
                console.log("failed", err);
            })
    }
    return (
        <>
            <div className='mt-5' id={styles['wrapper-right']}>
                <h2 className='ps-5 pt-3' id={styles.title}>Portofolio</h2>
                <hr />
                <div className="container">
                    {datas.map((data, index) => (
                        <div key={index} className="row">
                            <div className="col-lg-4 col-md-4 mb-5">
                                <div className="card p-0" style={{ border: "none" }}>
                                    {data.photo && <Image src={data.photo === "null" ? profile : data.photo} alt='profile' className='card-img-top' height={200} width={50} quality={100} style={{ objectFit: "cover", borderRadius: "4px" }} />}
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                                <Porto name={data?.apk_name} repo={data?.link_repo} type={data?.type} />
                            </div>
                            <div className="col-lg-2 col-md-2">
                                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <ModalEditPorto
                                        apk_name={data.apk_name}
                                        link_repo={data.link_repo}
                                        type={data.type}
                                        photo={data.photo}
                                        id_worker={data.id_worker}
                                        id_porto={data.id_porto}
                                    >Update</ModalEditPorto>
                                    <ModalDeletePorto id={data.id_porto}>Delete</ModalDeletePorto>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <hr />
                <div className="ps-5 pe-5 pb-5">
                    <form onSubmit={handleSubmit}>

                        {/* borderRadius: '50%', */}
                        <div className="mb-4">
                            <label for="exampleFormControlInput1" className="form-label" id={styles.label}>Nama aplikasi</label>
                            <input type="text" name='apk_name' onChange={handleChange} className="form-control" id="exampleFormControlInput1" style={{ fontSize: "13px", fontWeight: "500", color: "#858D96", height: "40px" }} placeholder="Masukan nama aplikasi" required />
                        </div>
                        <div className="mb-4">
                            <label for="exampleFormControlInput1" className="form-label" id={styles.label}>Link repository</label>
                            <input type="text" name='link_repo' onChange={handleChange} className="form-control" id="exampleFormControlInput1" style={{ fontSize: "13px", fontWeight: "500", color: "#858D96", height: "40px" }} placeholder="Masukan link repository" required />
                        </div>
                        <div className="mb-5">
                            <div className="mb-4">
                                <p id={styles.label}>Type fortofolio</p>
                            </div>
                            <div className="form-check form-check-inline">
                                <label className="form-check-label" id={styles['label-radio']} for="inlineRadio1">Aplikasi desktop</label>
                                <input className="form-check-input" onChange={handleChange} type="radio" name='type' id="inlineRadio1" value="Aplikasi desktop" required />
                            </div>
                            <div className="form-check form-check-inline">
                                <label className="form-check-label" id={styles['label-radio']} for="inlineRadio2">Aplikasi web</label>
                                <input className="form-check-input" onChange={handleChange} type="radio" name='type' id="inlineRadio2" value="Aplikasi web" required />
                            </div>
                        </div>
                        <div className="mb-4">
                            <p id={styles.label}>Upload gambar</p>
                        </div>
                        {preview ? <Image src={preview} alt="avatar" height={200} width={200} className="m-auto my-3" style={{ width: '100' }} /> : ''}
                        <input className='form-control' type="file" onChange={handleUpload} />
                        <input type="hidden" name='id_worker' value={porto.id_worker = login} />
                        <hr className='mb-5' />
                        <div className="d-grid">
                            <button className={styles['save-experience']} type="submit">Tambah portofolio</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
