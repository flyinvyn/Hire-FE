import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styles from '../../styles/Edit.module.css'
import Swal from 'sweetalert2';

const ModalEditExp = ({ id_exp, id_worker, position, company_name, work_start, work_end, description, children }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [data, setData] = useState({
        position,
        company_name,
        work_start,
        work_end,
        description,
        id_worker
    });

    const [login, setLogin] = useState()
    useEffect(() => {
        const isLogin = localStorage.getItem("id_worker")
        setLogin(isLogin)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`${process.env.NEXT_PUBLIC_API}/experience/${id_exp}`, data)
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Successfully',
                    text: 'Update exp success',
                })
                window.location.reload()
            })
            .catch(() => {
                alert('Update failed');
            });
    };
    return (
        <>
            <Button
                onClick={handleShow}
                style={{ background: "#FBB017", border: "none",color:"#fff",fontSize:"12px",borderRadius:"4px" }}
            >
                {children}
            </Button>
            <Modal show={show} onHide={handleClose} animation={false} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{children} Update</Modal.Title>
                </Modal.Header>
                <form>
                    <Modal.Body>
                        <div className="mb-4">
                            <input type="hidden" name='id_worker' onChange={handleChange} value={data.id_worker = login} />
                        </div>
                        <div className="mb-4">
                            <label for="exampleFormControlInput1" className="form-label" id={styles.label}>Posisi</label>
                            <input type="text" name='position' onChange={handleChange} value={data.position} className="form-control" id="exampleFormControlInput1" style={{ fontSize: "13px", fontWeight: "500", color: "#858D96", height: "40px" }} placeholder="Web developer" />
                        </div>
                        <div className="row">
                            <div className="col-lg-6 col-md-6">
                                <div className="mb-4">
                                    <label for="exampleFormControlInput1" className="form-label" id={styles.label}>Nama perusahaan</label>
                                    <input type="text" name='company_name' onChange={handleChange} value={data.company_name} className="form-control" id="exampleFormControlInput1" style={{ fontSize: "13px", fontWeight: "500", color: "#858D96", height: "40px" }} placeholder="PT Harus bisa" />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3">
                                <div className="mb-4">
                                    <label for="exampleFormControlInput1" className="form-label" id={styles.label}>Dari Bulan/tahun</label>
                                    <input type="date" name='work_start' onChange={handleChange} value={data.work_start} className="form-control" id="exampleFormControlInput1" style={{ fontSize: "13px", fontWeight: "500", color: "#858D96", height: "40px" }} placeholder="Januari 2018" />
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-3">
                                <div className="mb-4">
                                    <label for="exampleFormControlInput1" className="form-label" id={styles.label}>Sampai Bulan/tahun</label>
                                    <input type="date" name='work_end' onChange={handleChange} value={data.work_end} className="form-control" id="exampleFormControlInput1" style={{ fontSize: "13px", fontWeight: "500", color: "#858D96", height: "40px" }} placeholder="Januari 2019" />
                                </div>
                            </div>
                        </div>
                        <div className="mb-5">
                            <label for="exampleFormControlTextarea1" className="form-label" id={styles.label}>Deskripsi singkat</label>
                            <textarea className="form-control" name='description' onChange={handleChange} value={data.description} id="exampleFormControlTextarea1" style={{ fontSize: "13px", fontWeight: "500", color: "#858D96", height: "100px" }} rows="3" placeholder='Deskripsikan pekerjaan anda' />
                        </div>
                        <hr className='mb-5' />
                        <div className="d-grid">
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="warning" onClick={handleSubmit}>
                        {children}
                    </Button>
                    </Modal.Footer>
                </form>
            </Modal >
        </>
    )
}

export default ModalEditExp