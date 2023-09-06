import Head from "next/head"
import styles from '../../styles/login.module.css'
import Image from "next/image"
import main from '../../public/img/first.png'
import logo from '../../public/logo/white.png'
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import Swal from "sweetalert2"

const login = () => {
  const router = useRouter();
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const onChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };
  const onClick = (e) => {
    e.preventDefault();
    axios.post(`${process.env.NEXT_PUBLIC_API}/worker/login`, data)
      .then((res) => {
        Swal.fire({
          icon: 'success',
          title: 'Successfully'
        })
        localStorage.setItem("token", res.data.data.token)
        localStorage.setItem("id_worker", res.data.data.id_worker)
        localStorage.setItem("name", res.data.data.name)
        localStorage.setItem("photo", res.data.data.photo)
        router.push("/");
      })
      .catch((err) => {
        alert("Email/Password Wrong");
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
                <form>
                  <div className="mt-5">
                    <div className="mb-3">
                      <label for="exampleFormControlInput1" className="form-label" id={styles.label}>Email address</label>
                      <input type="email" name="email" onChange={onChange} className="form-control text-secondary" id="exampleFormControlInput1" placeholder="Masukan alamat email" required />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label for="exampleFormControlInput1" className="form-label" id={styles.label}>Kata sandi</label>
                    <input type="password" name="password" onChange={onChange} className="form-control text-secondary" id="exampleFormControlInput1" placeholder="Masukan kata sandi" required />
                  </div>
                  <div className={styles.boxForgot}>
                    <Link href={'./'} className={styles.forgot}>Lupa Kata Sandi?</Link>
                  </div>
                  <div className="d-grid">
                    <button className={styles.login} onClick={onClick}>Masuk</button>
                  </div>
                </form>
                <div className={styles.sign}>
                  <p className={styles.auth}>Anda belum punya akun?
                    <span className={styles.span}><Link href={'/register-user'}>pekerja</Link></span><span> / </span>
                    <span className={styles.span}><Link href={'/register-perekrut'}>Perekrut</Link></span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default login