import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styles from '../../styles/Edit.module.css'
import Swal from 'sweetalert2';
import style from '../../styles/Edit.module.css'


const ModalEditPorto = ({ id_porto, apk_name, link_repo, type, children }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [data, setData] = useState({
        apk_name,
        link_repo,
        type
    });

    console.log(id_porto);

    // const [photo, setPhoto] = useState(null);
    // const handleUpload = (e) => {
    //     setPhoto(e.target.files[0]);
    // };

    const [preview, setPreview] = useState(null);
    const [foto, setFoto] = useState(null);
    const handleUpload = (e) => {
        const img = e.target.files[0];
        setFoto(img);
        setPreview(URL.createObjectURL(img));
    };

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
        console.log(data);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('apk_name', data.apk_name)
        formData.append('link_repo', data.link_repo)
        formData.append('type', data.type)
        formData.append('photo', foto)
        formData.append('id_worker', data.id_worker)
        axios.put(`${process.env.NEXT_PUBLIC_API}/portofolio/${id_porto}`, formData)
            .then((res) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Successfully',
                    text: 'Update porto success',
                })
                window.location.reload()
            })
            .catch((err) => {
                alert('Update failed');
            });
    };

    const [login, setLogin] = useState()
    useEffect(() => {
        const isLogin = localStorage.getItem("id_worker")
        setLogin(isLogin)
    }, [login])
    return (
        <>
            <Button
                onClick={handleShow}
                className={style['edit-experience']}
            >
                {children}
            </Button>
            <Modal show={show} onHide={handleClose} animation={false} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{children} Update</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <div className="mb-4">
                            <label for="exampleFormControlInput1" className="form-label" id={styles.label}>Nama aplikasi</label>
                            <input type="text" name="apk_name" value={data.apk_name} onChange={handleChange} className="form-control" id="exampleFormControlInput1" style={{ fontSize: "13px", fontWeight: "500", color: "#858D96", height: "40px" }} placeholder="Masukan nama aplikasi" />
                        </div>
                        <div className="mb-4">
                            <label for="exampleFormControlInput1" className="form-label" id={styles.label}>Link repository</label>
                            <input type="text" name='link_repo' value={data.link_repo} onChange={handleChange} className="form-control" id="exampleFormControlInput1" style={{ fontSize: "13px", fontWeight: "500", color: "#858D96", height: "40px" }} placeholder="Masukan link repository" />
                        </div>
                        <div className="mb-5">
                            <div className="mb-4">
                                <p id={styles.label}>Type fortofolio</p>
                            </div>
                            <div className="form-check form-check-inline">
                                <label className="form-check-label" id={styles['label-radio']} for="inlineRadio1">Aplikasi desktop</label>
                                <input className="form-check-input" onChange={handleChange} type="radio" name='type' id="inlineRadio1" value="Aplikasi desktop" />
                            </div>
                            <div className="form-check form-check-inline">
                                <label className="form-check-label" id={styles['label-radio']} for="inlineRadio2">Aplikasi web</label>
                                <input className="form-check-input" onChange={handleChange} type="radio" name='type' id="inlineRadio2" value="Aplikasi web" />
                            </div>
                        </div>
                        <div className="mb-4">
                            <p id={styles.label}>Upload gambar</p>
                        </div>
                        {preview ? <img src={preview} alt="avatar" height={200} width={200} className="m-auto my-3" style={{ width: '100' }} /> : ''}
                        <input className='form-control' type="file" name='photo' onChange={handleUpload} />
                        <input type="hidden" name='id_worker' value={(data.id_worker = login)} />
                        {/* <hr className='mb-5' /> */}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="warning" type='submit'>
                            {children}
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal >
        </>
    )
}

export default ModalEditPorto