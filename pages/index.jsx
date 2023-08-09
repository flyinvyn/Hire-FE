import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import first from '../public/img/first.png'
import second from '../public/img/second.png'
import third from '../public/img/third.png'
// import Navlog from '../components/navbar/Navlog'
import tick from '../public/img/tick 1.png'
import yellowtick from '../public/img/tick 13.png'
import Footer from '../components/footer/Footer'
import { Carousels } from '../components/carousel/Carousel'
import NavbarAuth from './auth/NavbarAuth'
import Link from 'next/link'

// const items = [
//   { title: 'Item 1', description: 'Deskripsi Item 1' },
//   { title: 'Item 2', description: 'Deskripsi Item 2' },
//   { title: 'Item 3', description: 'Deskripsi Item 3' },
//   // Tambahkan lebih banyak item sesuai kebutuhan
// ];

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
      </Head>
      <NavbarAuth />
      <div className="bg-white">
        <div className="container mt-5">
          <div className="row ">
            <div className="col-lg-6 col-md-6">
              <div className={styles.none}>
                <h1 >Talenta terbaik negri untuk perubahan revolusi 4.0</h1>
                <p className={styles.paragraf}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ipsum et dui rhoncus auctor.</p>
                <div className={styles.btn}>
                  <button className={styles.button}><Link href={'/home'}>Mulai Dari Sekarang</Link></button>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 mt-5 pb-5 mb-5 ">
              <Image src={first} className='img-fluid' />
            </div>
          </div>
        </div>
        <div className="container mt-5">
          <div className="row" id={styles.row}>
            <div className="col-lg-6 col-md-5" id={styles.second}>
              <Image src={second} className='img-fluid' />
            </div>
            <div className="col-lg-6 col-md-5">
              <h2>Kenapa harus mencari tallent di peworld</h2>
              <div className='d-flex align-item-center mt-3'>
                <Image src={tick} alt="" />
                <p className={styles.p}>Lorem ipsum dolor sit amet.</p>
              </div>
              <div className='d-flex align-item-center mt-3'>
                <Image src={tick} alt="" />
                <p className={styles.p}>Lorem ipsum dolor sit amet.</p>
              </div>
              <div className='d-flex align-item-center mt-3'>
                <Image src={tick} alt="" />
                <p className={styles.p}>Lorem ipsum dolor sit amet.</p>
              </div>
              <div className='d-flex align-item-center mt-3'>
                <Image src={tick} alt="" />
                <p className={styles.p}>Lorem ipsum dolor sit amet.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="container mt-5">
          <div className="row">
            <div className="col-lg-4 col-md-4 offset-md-2 my-auto">
              <h2 className='mt-5'>Skill Talent</h2>
              <p className={styles.paragraf}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod ipsum et dui rhoncus auctor.</p>
              <div className="d-flex">
                <div className='col'>
                  <div className='d-flex align-item-center mt-3'>
                    <Image src={yellowtick} />
                    <p className={styles.p}>Java</p>
                  </div>
                  <div className='d-flex align-item-center mt-3'>
                    <Image src={yellowtick} />
                    <p className={styles.p}>Kotlin</p>
                  </div>
                  <div className='d-flex align-item-center mt-3'>
                    <Image src={yellowtick} />
                    <p className={styles.p}>PHP</p>
                  </div>
                  <div className='d-flex align-item-center mt-3'>
                    <Image src={yellowtick} />
                    <p className={styles.p}>JavaScript</p>
                  </div>
                </div>
                <div className='col'>
                  <div className='d-flex align-item-center mt-3'>
                    <Image src={yellowtick} />
                    <p className={styles.p}>Golang</p>
                  </div>
                  <div className='d-flex align-item-center mt-3'>
                    <Image src={yellowtick} />
                    <p className={styles.p}>C++</p>
                  </div>
                  <div className='d-flex align-item-center mt-3'>
                    <Image src={yellowtick} />
                    <p className={styles.p}>Ruby</p>
                  </div>
                  <div className='d-flex align-item-center mt-3'>
                    <Image src={yellowtick} />
                    <p className={styles.p}>10+ Bahasa lainnya</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 mt-5 pb-5">
              <Image src={third} className='img-fluid' />
            </div>
          </div>
        </div>
      </div>
      <Carousels />
      <div className="container">
        <div className={styles.foot}>
          <h2 className={styles.text}>Lorem ipsum dolor sit amet</h2>
          <button className={styles.start}><Link href={'/home'}>Mulai dari sekarang</Link></button>
        </div>
      </div>
      <Footer />
    </div>
  )
}
