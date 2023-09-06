import { useEffect, useState } from 'react'
import styles from '../../styles/Edit.module.css'
import axios from 'axios';
import Swal from 'sweetalert2';
import Image from 'next/image';

export const DataWorker = () => {

    const [data, setData] = useState({
        name: "",
        job_desk: "",
        domisili: "",
        work_place: "",
        description: "",
    });

    const [preview, setPreview] = useState(null);
    const [photo, setPhoto] = useState(null);
    const handleUpload = (e) => {
        const img = e.target.files[0];
        setPhoto(img);
        setPreview(URL.createObjectURL(img));
    };


    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    const [login, setLogin] = useState();
    useEffect(() => {
        const isLogin = localStorage.getItem("id_worker");
        setLogin(isLogin)
        axios.get(`${process.env.NEXT_PUBLIC_API}/worker/${isLogin}`)
            .then((res) => {
                setData(res.data.data[0]);
            })
            .catch((err) => {
                console.log(err);
            });
        setLogin(isLogin)
    }, [])

    const handleUpdate = () => {
        // e.preventDefault();
        // const formData = new FormData();
        // formData.append('name', data.name)
        // formData.append('job_desk', data.job_desk)
        // formData.append('domisili', data.domisili)
        // formData.append('work_place', data.work_place)
        // formData.append('description', data.description)
        // formData.append('photo', photo)
        axios.put(`${process.env.NEXT_PUBLIC_API}/worker/${login}`, data)
            .then(() => {
                window.location.reload();
                Swal.fire({
                    icon: 'success',
                    title: 'Successfully',
                    text: 'Update profile success',
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const updatePhoto = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('photo', photo)
        axios.put(`${process.env.NEXT_PUBLIC_API}/worker/update/${login}`, formData)
            .then(() => {
                window.location.reload();
                Swal.fire({
                    icon: 'success',
                    title: 'Successfully',
                    text: 'Update profile success',
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <>
            <div className={styles['wrapper-right']}>
                <h2 className='ps-5 pt-3' id={styles.title}>Data diri</h2>
                <hr />
                <div className="ps-5 pe-5 pb-5">
                    <form>
                        <div className="mb-4">
                            <label for="exampleFormControlInput1" className="form-label" id={styles.label}>Nama lengkap</label>
                            <input type="text" name='name' value={data.name == "undefined" ? "masukan nama lengkap" : data.name} onChange={handleChange} className="form-control" id="exampleFormControlInput1" style={{ fontSize: "13px", fontWeight: "500", color: "#858D96", height: "40px" }} placeholder="Masukan nama lengkap" />
                        </div>
                        <div className="mb-4">
                            <label for="exampleFormControlInput1" className="form-label" id={styles.label}>Job desk</label>
                            <input type="text" name='job_desk' value={data.job_desk == "undefined" ? "" : data.job_desk} onChange={handleChange} className="form-control" id="exampleFormControlInput1" style={{ fontSize: "13px", fontWeight: "500", color: "#858D96", height: "40px" }} placeholder='Masukan job' />
                        </div>
                        <div className="mb-4">
                            <label for="exampleFormControlInput1" className="form-label" id={styles.label}>Domisili</label>
                            <input type="text" name='domisili' value={data.domisili == "undefined" ? "" : data.domisili} onChange={handleChange} className="form-control" id="exampleFormControlInput1" style={{ fontSize: "13px", fontWeight: "500", color: "#858D96", height: "40px" }} placeholder='Masukan domisili' />
                        </div>
                        <div className="mb-4">
                            <label for="exampleFormControlInput1" className="form-label" id={styles.label}>Tempat kerja</label>
                            <input type="text" name='work_place' value={data.work_place == "undefined" ? "" : data.work_place} onChange={handleChange} className="form-control" id="exampleFormControlInput1" style={{ fontSize: "13px", fontWeight: "500", color: "#858D96", height: "40px" }} placeholder='Masukan tempat kerja' />
                        </div>
                        <div className="mb-4">
                            <label for="exampleFormControlTextarea1" className="form-label" id={styles.label}>Deskripsi singkat</label>
                            <textarea className="form-control" name='description' value={data.description == "undefined" ? "" : data.description} onChange={handleChange} id="exampleFormControlTextarea1" style={{ fontSize: "13px", fontWeight: "500", color: "#858D96", height: "100px" }} rows="3" placeholder='Tuliskan deskripsi singkat' />
                        </div>
                        {preview ? <Image src={preview} alt="avatar" height={200} width={200} className="m-auto my-3" style={{ width: '100' }} /> : ''}
                    </form>
                    <input type="hidden" name='id_worker' value={(data.id_worker = login)} />
                    <button type='button' onClick={handleUpdate} style={{ backgroundColor: "#FBB017", border: "none", color: "#fff", fontSize: "12px", fontWeight: "700", borderRadius: "4px", marginTop: "30px" }}>Simpan</button>
                    <form onSubmit={updatePhoto}>
                        <div className="mb-4">
                            <label for="exampleFormControlTextarea1" className="form-label" id={styles.label}>Upload gambar</label>
                            <input className='form-control' name='photo' type="file" onChange={handleUpload} />
                        </div>
                        <button type='submit'>click</button>
                    </form>
                </div>
            </div>
        </>
    )
}
