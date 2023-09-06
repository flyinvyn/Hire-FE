import Head from "next/head"
import styles from '../../styles/login.module.css'
import Image from "next/image"
import main from '../../public/img/first.png'
import logo from '../../public/logo/white.png'
import Link from "next/link"
import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/router"
import Swal from "sweetalert2"

const RegisterUser = () => {
  const router = useRouter()
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    phone_number: "",
    role:"worker"
  });

  const onChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', data.name)
    formData.append('email', data.email)
    formData.append('password', data.password)
    formData.append('phone_number', data.phone_number)
    formData.append('role', data.role)
    axios.post(`${process.env.NEXT_PUBLIC_API}/worker/register`, data)
      .then((res) => {
        Swal.fire({
          icon: 'success',
          title: 'Successfully',
          text: 'Data worker created'
        })
        router.push("/Login");
      })
      .catch((err) => {
        alert("Signup Failed")
      })
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
              <Image src={main} width={500} height={570} alt="image" />
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
                <form onSubmit={handleSubmit}>
                  <div className="mt-5">
                    <div className="mb-3">
                      <label for="exampleFormControlInput1" className="form-label" id={styles.label}>Nama </label>
                      <input type="text" name="name" onChange={onChange} className="form-control text-secondary" id="exampleFormControlInput1" placeholder="Masukan nama panjang" />
                    </div>
                    <div className="mb-3">
                      <label for="exampleFormControlInput1" className="form-label" id={styles.label}>Email address</label>
                      <input type="email" name="email" onChange={onChange} className="form-control text-secondary" id="exampleFormControlInput1" placeholder="Masukan alamat email" />
                    </div>
                    <div className="mb-3">
                      <label for="exampleFormControlInput1" className="form-label" id={styles.label}>No handphone</label>
                      <input type="text" name="phone_number" onChange={onChange} className="form-control text-secondary" id="exampleFormControlInput1" placeholder="Masukan no handphone" />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label for="exampleFormControlInput1" className="form-label" id={styles.label}>Kata sandi</label>
                    <input type="password" name="password" onChange={onChange} className="form-control text-secondary" id="exampleFormControlInput1" placeholder="Masukan kata sandi" />
                  </div>
                  <div className="mb-3">
                    <label for="exampleFormControlInput1" className="form-label" id={styles.label}>Konfirmasi sandi</label>
                    <input type="password" className="form-control text-secondary" id="exampleFormControlInput1" placeholder="Masukan konfirmasi kata sandi" />
                  </div>
                  <div className="d-grid">
                    <button className={styles.login} type="submit">Masuk</button>
                  </div>
                </form>
                <div className={styles.sign}>
                  <p className={styles.auth}>Sudah punya akun?<span className={styles.span}><Link href={'/login'}>Masuk disini</Link></span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RegisterUser