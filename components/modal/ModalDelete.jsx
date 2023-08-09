import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';
import styles from '../../styles/Edit.module.css'


const ModalDelete = ({ id }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .delete(`${process.env.NEXT_PUBLIC_API}/experience/${id}`)
            .then((res) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Successfully',
                    text: 'Delete Experience success',
                })
                setTimeout(function () {
                    handleClose();
                    window.location.reload();
                },1500);
            })
            .catch((err) => {
                alert("gagal")
            })
    };
    return (
        <>
            <Button
                onClick={handleShow}
                className={styles['cancel-experience']}
            >
                Delete
            </Button>
            <Modal show={show} onHide={handleClose} animation={false} size="sm">
                <Modal.Header closeButton>
                    <Modal.Title>Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are sure want to delete?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleSubmit}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalDelete