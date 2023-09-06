import Nav from '../../components/navbar/Nav'
import styles from '../../styles/Edit.module.css'
import profile from '../../public/img/profile.png'
import pencil from '../../public/img/pencil.png'
import map from '../../public/img/map.png'
import Image from 'next/image'

const recruter = () => {
  return (
    <>
      <Nav />
      <div className={styles.purples}></div>
      <div className="container">
        <div className="row ">
          <div className="col-lg-4 col-md-4">
            <div className={styles.wrapper}>
              <div className='d-flex justify-content-center'>
                <Image src={profile} className={styles.image} alt='profile' />
              </div>
              <div className={styles.wrapp}>
                <Image src={pencil} alt='pencil' />
                <p className={styles.edit}>Edit</p>
              </div>
              <div className="container px-5 mt-5">
                <p className={styles.name}>nama</p>
                <p className={styles.job}>bidang</p>
                <p className={styles.adress}><span><Image src={map} alt='map' /></span><span style={{ marginLeft: "10px" }}>wwfww</span></p>
              </div>
              {/* <div className="d-grid gap-2 mt-5">
                <button className={styles.simpan} type="button">Simpan</button>
                <button className={styles.batal} type="button">Batal</button>
              </div> */}
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
                    <input type="text" name='name' className="form-control" id="exampleFormControlInput1" style={{ fontSize: "13px", fontWeight: "500", color: "#858D96", height: "40px" }} placeholder="Masukan nama perushaan" />
                  </div>
                  <div className="mb-4">
                    <label for="exampleFormControlInput1" className="form-label" id={styles.label}>Bidang</label>
                    <input type="text" name='job_desk'  className="form-control" id="exampleFormControlInput1" style={{ fontSize: "13px", fontWeight: "500", color: "#858D96", height: "40px" }} placeholder='Masukan bidang perusahaan ex:Financial' />
                  </div>
                  <div className="mb-4">
                    <label for="exampleFormControlInput1" className="form-label" id={styles.label}>Provinsi</label>
                    <input type="text" name='domisili' className="form-control" id="exampleFormControlInput1" style={{ fontSize: "13px", fontWeight: "500", color: "#858D96", height: "40px" }} placeholder='Masukan Provinsi' />
                  </div>
                  <div className="mb-4">
                    <label for="exampleFormControlInput1" className="form-label" id={styles.label}>Kota</label>
                    <input type="text" name='work_place' className="form-control" id="exampleFormControlInput1" style={{ fontSize: "13px", fontWeight: "500", color: "#858D96", height: "40px" }} placeholder='Masukan kota' />
                  </div>
                  <div className="mb-4">
                    <label for="exampleFormControlTextarea1" className="form-label" id={styles.label}>Deskripsi singkat</label>
                    <textarea className="form-control" name='description' id="exampleFormControlTextarea1" style={{ fontSize: "13px", fontWeight: "500", color: "#858D96", height: "100px" }} rows="3" />
                  </div>
                  <div className="mb-4">
                    <label for="exampleFormControlInput1" className="form-label" id={styles.label}>Email</label>
                    <input type="email" name='work_place' className="form-control" id="exampleFormControlInput1" style={{ fontSize: "13px", fontWeight: "500", color: "#858D96", height: "40px" }} placeholder='Masukan email' />
                  </div>
                  <div className="mb-4">
                    <label for="exampleFormControlInput1" className="form-label" id={styles.label}>Email perusahaan</label>
                    <input type="email" name='work_place' className="form-control" id="exampleFormControlInput1" style={{ fontSize: "13px", fontWeight: "500", color: "#858D96", height: "40px" }} placeholder='Masukan email perusahaan' />
                  </div>
                  <div className="mb-4">
                    <label for="exampleFormControlInput1" className="form-label" id={styles.label}>Nomor telepon</label>
                    <input type="email" name='work_place' className="form-control" id="exampleFormControlInput1" style={{ fontSize: "13px", fontWeight: "500", color: "#858D96", height: "40px" }} placeholder='Masukan nomor telepon' />
                  </div>
                  <div className="mb-4">
                    <label for="exampleFormControlInput1" className="form-label" id={styles.label}>Linkedin</label>
                    <input type="email" name='work_place' className="form-control" id="exampleFormControlInput1" style={{ fontSize: "13px", fontWeight: "500", color: "#858D96", height: "40px" }} placeholder='Masukan nama linkedin' />
                  </div>
                  <button type='submit' style={{ backgroundColor: "#FBB017", border: "none", color: "#fff", fontSize: "12px", fontWeight: "700", borderRadius: "4px",padding:"10px" }}>Simpan</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default recruter
