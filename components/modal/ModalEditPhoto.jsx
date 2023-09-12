import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styles from '../../styles/Edit.module.css'
import Swal from 'sweetalert2';
import style from '../../styles/Edit.module.css'
import Image from 'next/image';
import pencil from '../../public/img/pencil.png'


const ModalEditPhotoRecruiter = ({ rec_id }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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

    const [preview, setPreview] = useState(null);
    const [foto, setFoto] = useState(null);
    const handleUpload = (e) => {
        const img = e.target.files[0];
        setFoto(img);
        setPreview(URL.createObjectURL(img));
    };



    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('rec_photo', foto)
        axios.put(`${process.env.NEXT_PUBLIC_API}/recruiter/profilephoto/${rec_id}`, formData)
            .then(() => {
                Toast.fire({
                    title:
                        "Foto profile updated!",
                    icon: "success",
                })
                window.location.reload()
            })
            .catch(() => {
                alert('Update failed');
            });
    };
    return (
        <>
            <div className='text-center'>
                <Image src={pencil} alt='pencil' />
                <Button
                    onClick={handleShow}
                    className={style['edit-photo']}
                >
                    Edit foto profile
                </Button>
            </div>
            <Modal show={show} onHide={handleClose} animation={false} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Update foto</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <div>
                            <p id={styles.label}>Upload gambar</p>
                        </div>
                        {preview ? <Image src={preview} alt="avatar" height={200} width={200} className="m-auto my-3" style={{ width: '100' }} /> : ''}
                        <input className='form-control' type="file" name='rec_photo' onChange={handleUpload} />
                        {/* <input type="hidden" name='id_worker' value={(data.id_worker = login)} /> */}
                        {/* <hr className='mb-5' /> */}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="warning" type='submit'>
                            Edit
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal >
        </>
    )
}

export default ModalEditPhotoRecruiter