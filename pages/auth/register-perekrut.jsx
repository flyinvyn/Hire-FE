import Head from "next/head"
import styles from '../../styles/login.module.css'
import Image from "next/image"
import main from '../../public/img/first.png'
import logo from '../../public/logo/white.png'
import Link from "next/link"
import { useState } from "react"
import axios from "axios"
import Swal from "sweetalert2"

const RegisterPerekrut = () => {
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
  const [data,setData] = useState({
    rec_name: "",
    rec_email: "",
    rec_compname: "",
    rec_position: "",
    rec_phone: "",
    rec_password: "",
    rec_confirmpassword: ""
  })

  const onChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    axios
        .post(`${process.env.NEXT_PUBLIC_API}/recruiter/register`, data)
        .then((res) => {
            if (res.data.statusCode === 201) {
                Toast.fire({
                    title:
                        "Sign up Succesfuly! Please check your email for further instructions",
                    icon: "success",
                }).then(function () {
                    // Redirect the user
                    window.location.href = "/login-perekrut";
                });
            } else {
                Toast.fire({
                    title: "Sorry, this email is already registered.",
                    icon: "error",
                }).then(function () {
                    // Redirect the user
                    window.location.href = "/register-perekrut";
                });
            }
        })
        .catch((err) => {
            console.log(err.response);
            alert("gagal register");
        });
};
  return (
    <>
      <Head>
        <title>Login</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous" />
      </Head>
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-6 col-md-6">
            <div className={styles.box}>
              <Image src={main} width={500} height={570} alt="thumb" />
              <div className={styles.boxImage}>
                <Image src={logo} width={86} height={24} className={styles.logo} alt="logo" />
                <div className={styles.wrapper}>
                  <h1 className={styles.title}>Temukan developer berbakat & terbaik di berbagai bidang keahlian</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6">
            <div className="container mt-5">
              <div className="">
                <h1 className={styles.titles}>Halo, Pewpeople</h1>
                <p className={styles.p}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ipsum et dui rhoncus auctor.</p>
                <form>
                  <div className="mt-5">
                    <div className="mb-3">
                      <label for="exampleFormControlInput1" className="form-label" id={styles.label}>Nama </label>
                      <input type="email" className="form-control text-secondary" name="rec_name" onChange={onChange} id="exampleFormControlInput1" placeholder="Masukan nama panjang"/>
                    </div>
                    <div className="mb-3">
                      <label for="exampleFormControlInput1" className="form-label" id={styles.label}>Email address</label>
                      <input type="email" className="form-control text-secondary" name="rec_email" onChange={onChange} id="exampleFormControlInput1" placeholder="Masukan alamat email"/>
                    </div>
                    <div className="mb-3">
                      <label for="exampleFormControlInput1" className="form-label" id={styles.label}>Perusahaan</label>
                      <input type="email" className="form-control text-secondary" name="rec_compname" onChange={onChange} id="exampleFormControlInput1" placeholder="Masukan nama perusahaan"/>
                    </div>
                    <div className="mb-3">
                      <label for="exampleFormControlInput1" className="form-label" id={styles.label}>Jabatan</label>
                      <input type="email" className="form-control text-secondary" name="rec_position" onChange={onChange} id="exampleFormControlInput1" placeholder="Posisi di perusahaan Anda"/>
                    </div>
                    <div className="mb-3">
                      <label for="exampleFormControlInput1" className="form-label" id={styles.label}>No handphone</label>
                      <input type="email" className="form-control text-secondary" name="rec_phone" onChange={onChange} id="exampleFormControlInput1" placeholder="Masukan no handphone"/>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label for="exampleFormControlInput1" className="form-label" id={styles.label}>Kata sandi</label>
                    <input type="password" className="form-control text-secondary" name="rec_password" onChange={onChange} id="exampleFormControlInput1" placeholder="Masukan kata sandi"/>
                  </div>
                  <div className="mb-3">
                    <label for="exampleFormControlInput1" className="form-label" id={styles.label}>Konfirmasi sandi</label>
                    <input type="password" className="form-control text-secondary" name="rec_confirmpassword" onChange={onChange} id="exampleFormControlInput1" placeholder="Masukan konfirmasi kata sandi"/>
                  </div>
                  <div className="d-grid">
                    <button className={styles.login} onClick={handleRegister} type="button">Masuk</button>
                  </div>
                </form>
                  <div className={styles.sign}>
                    <p className={styles.auth}>Sudah punya akun?<span className={styles.span}><Link href={'/auth/login-perekrut'}>Masuk disini</Link></span></p>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RegisterPerekrut