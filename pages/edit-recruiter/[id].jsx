import Nav from '../../components/navbar/Nav'
import styles from '../../styles/Edit.module.css'
import profile from '../../public/img/noimage.png'
import map from '../../public/img/map.png'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import ModalEditPhotoRecruiter from '../../components/modal/ModalEditPhoto'
import Swal from 'sweetalert2'

const Recruter = () => {
  const router = useRouter()
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

  const [data, setData] = useState({
    rec_jobfield: "",
    rec_province: "",
    rec_city: "",
    rec_desc: "",
    rec_emailcomp: "",
    rec_linkedin: "",
    rec_email: "",
    rec_phone: "",
    rec_compname: ""
  })

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = () => {
    axios.put(`${process.env.NEXT_PUBLIC_API}/recruiter/profile/${router.query.id}`, data)
      .then(() => {
        Toast.fire({
          title:
            "Data profile updated!",
          icon: "success",
        })
        window.location.reload()
      })
      .catch(() => {
        alert('Update failed');
      });
  }

  useEffect(() => {
    if (router.isReady) {
      axios.get(`${process.env.NEXT_PUBLIC_API}/recruiter/profile/${router.query.id}`)
        .then((res) => {
          setData(res.data.data[0]);
        })
        .catch((err) => {
          console.log(err);
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady])

  // const 
  return (
    <>
      <Nav />
      <div className={styles.purples}></div>
      <div className="container">
        <div className="row ">
          <div className="col-lg-4 col-md-4">
            <div className={styles.wrapper}>
              <div className='d-flex justify-content-center'>
                <Image src={data.rec_photo === "null" || data.rec_photo === null ? profile : data.rec_photo} width={150} height={150} style={{ borderRadius: "50%", marginTop: "20px" }} alt='profile' />
              </div>
              <ModalEditPhotoRecruiter rec_id={data.rec_id} />
              <div className="container px-5 mt-5 mb-5">
                <p className={styles.name}>{data.rec_compname === "null" || data.rec_compname === null ? "Nama perusahaan" : data.rec_compname}</p>
                <p className={styles.job}>{data.rec_jobfield === "null" || data.rec_jobfield === null ? "Bidang" : data.rec_jobfield}</p>
                <p className={styles.adress} style={{ paddingBottom: "20px" }}><span><Image src={map} alt='map' /></span>
                  <span style={{ marginLeft: "10px" }}>{data.rec_city === "null" || data.rec_city === null ? "Kota" : data.rec_city}</span>
                  <span>, {data.rec_province === "null" || data.rec_province === null ? "Provinsi" : data.rec_province}</span></p>
              </div>
            </div>
          </div>
          <div className="col-lg-7 col-md-7 offset-md-1">
            <div className={styles['wrapper-right']}>
              <h2 className='ps-5 pt-3' id={styles.title}>Data diri</h2>
              <hr />
              <div className="ps-5 pe-5 pb-5">
                <form>
                  <div className="mb-4">
                    <label for="exampleFormControlInput1" className="form-label" id={styles.label}>Nama perusahaan</label>
                    <input type="text" name='rec_name' onChange={handleChange} value={data.rec_compname == "null" ? "masukan nama lengkap" : data.rec_compname} className="form-control" id="exampleFormControlInput1" style={{ fontSize: "13px", fontWeight: "500", color: "#858D96", height: "40px" }} placeholder="Masukan nama perushaan" />
                  </div>
                  <div className="mb-4">
                    <label for="exampleFormControlInput1" className="form-label" id={styles.label}>Bidang</label>
                    <input type="text" name='rec_jobfield' onChange={handleChange} value={data.rec_jobfield === "null" ? "" : data.rec_jobfield} className="form-control" id="exampleFormControlInput1" style={{ fontSize: "13px", fontWeight: "500", color: "#858D96", height: "40px" }} placeholder='Masukan bidang perusahaan ex:Financial' />
                  </div>
                  <div className="mb-4">
                    <label for="exampleFormControlInput1" className="form-label" id={styles.label}>Provinsi</label>
                    <input type="text" name='rec_province' onChange={handleChange} value={data.rec_province === "null" ? "" : data.rec_province} className="form-control" id="exampleFormControlInput1" style={{ fontSize: "13px", fontWeight: "500", color: "#858D96", height: "40px" }} placeholder='Masukan Provinsi' />
                  </div>
                  <div className="mb-4">
                    <label for="exampleFormControlInput1" className="form-label" id={styles.label}>Kota</label>
                    <input type="text" name='rec_city' onChange={handleChange} value={data.rec_city === "null" ? "" : data.rec_city} className="form-control" id="exampleFormControlInput1" style={{ fontSize: "13px", fontWeight: "500", color: "#858D96", height: "40px" }} placeholder='Masukan kota' />
                  </div>
                  <div className="mb-4">
                    <label for="exampleFormControlTextarea1" className="form-label" id={styles.label}>Deskripsi singkat</label>
                    <textarea className="form-control" name='rec_desc' onChange={handleChange} value={data.rec_desc === "null" ? "" : data.rec_desc} id="exampleFormControlTextarea1" style={{ fontSize: "13px", fontWeight: "500", color: "#858D96", height: "100px" }} rows="3" />
                  </div>
                  <div className="mb-4">
                    <label for="exampleFormControlInput1" className="form-label" id={styles.label}>Email</label>
                    <input type="email" name='rec_name' onChange={handleChange} value={data.rec_email} className="form-control" id="exampleFormControlInput1" style={{ fontSize: "13px", fontWeight: "500", color: "#858D96", height: "40px" }} placeholder='Masukan email' />
                  </div>
                  <div className="mb-4">
                    <label for="exampleFormControlInput1" className="form-label" id={styles.label}>Email perusahaan</label>
                    <input type="email" name='rec_emailcomp' onChange={handleChange} value={data.rec_emailcomp === "null" ? "" : data.rec_emailcomp} className="form-control" id="exampleFormControlInput1" style={{ fontSize: "13px", fontWeight: "500", color: "#858D96", height: "40px" }} placeholder='Masukan email perusahaan' />
                  </div>
                  <div className="mb-4">
                    <label for="exampleFormControlInput1" className="form-label" id={styles.label}>Nomor telepon</label>
                    <input type="email" name='rec_phone' onChange={handleChange} value={data.rec_phone} className="form-control" id="exampleFormControlInput1" style={{ fontSize: "13px", fontWeight: "500", color: "#858D96", height: "40px" }} placeholder='Masukan nomor telepon' />
                  </div>
                  <div className="mb-4">
                    <label for="exampleFormControlInput1" className="form-label" id={styles.label}>Linkedin</label>
                    <input type="email" name='rec_linkedin' onChange={handleChange} value={data.rec_linkedin === "null" ? "" : data.rec_linkedin} className="form-control" id="exampleFormControlInput1" style={{ fontSize: "13px", fontWeight: "500", color: "#858D96", height: "40px" }} placeholder='Masukan nama linkedin' />
                  </div>
                  <button type='button' onClick={handleUpdate} style={{ backgroundColor: "#FBB017", border: "none", color: "#fff", fontSize: "12px", fontWeight: "700", borderRadius: "4px", padding: "10px" }}>Simpan</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Recruter
