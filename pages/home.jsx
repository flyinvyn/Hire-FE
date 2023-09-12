import React, { useEffect, useState } from 'react'
import Nav from '../components/navbar/Nav'
import styles from '../styles/HomePage.module.css'
import Image from 'next/image'
import map from '../public/img/noimage.png'
import Footer from '../components/footer/Footer'
import axios from 'axios'
import Pagination from './pagination'
import Link from 'next/link'
import { DropdownButton, Dropdown } from 'react-bootstrap'

const Home = () => {
  const [loading, isLoading] = useState(false);
  const [search, setSearch] = useState("")
  const [skils, setSkils] = useState([]);
  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API}/worker/profile`)
      .then((res) => {
        setSkils(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = skils.slice(firstPostIndex, lastPostIndex);

  const [sortOption, setSortOption] = useState('');
  const handleSort = (option) => {
    setSortOption(option);
  };


  return (
    <>
      <Nav />
      <div className={styles.header}>
        <div className="container">
          <h3 className={styles.head}>Top Jobs</h3>
        </div>
      </div>
      <div className="container">
        <div className="d-flex my-5" id={styles.wrapper}>
          <input type="text" className="form-control" id={styles.search} placeholder="Recipient's username" aria-label="search for any skill" onChange={(e) => setSearch(e.target.value)} />
          {/* <img src="" className='my-auto me-4' /> <span className={styles.line}></span> */}
          <DropdownButton variant="secondary" id="dropdown-item-button" title="Sort" className="d-flex align-item-bottom">
            <Dropdown.Item as="button" onClick={() => handleSort("name_asc")}>
              Name A-Z
            </Dropdown.Item>
            <Dropdown.Item as="button" onClick={() => handleSort("name_desc")}>
              Name Z-A
            </Dropdown.Item>
          </DropdownButton>
          <button className={styles.srch} type="button">Search</button>
        </div>
      </div>
      {currentPosts.filter((item) => {
        if (search === "") {
          return item
        } else if (item.name.toLowerCase().includes(search.toLowerCase())) {
          return item
        } 
        return false
      })
        .sort((a, b) => {
          switch (sortOption) {
            case 'name_asc':
              return a.name.localeCompare(b.name);
            case 'name_desc':
              return b.name.localeCompare(a.name);
            default:
              return 0;
          }
        })
        .map((item, index) => (
          <div key={index} className="container bg-white" style={{ borderRadius: "4px" }}>
            <div className="row align-items-center">
              <div className="col-lg-2 col-md-2">
                <Image src={item.photo == "null" || item.photo === null ? map : item.photo} width={100} height={100} style={{ borderRadius: "50%" }} alt='photo' />
              </div>
              <div className="col-lg-8 col-md-8 mt-2">
                <div>
                  <h2 style={{ fontWeight: "600", fontSize: "18px", color: "#1F2A36" }}>{item?.name}</h2>
                  <p style={{ fontWeight: "400", fontSize: "13px", color: "#9EA0A5" }}>{item?.job_desk}</p>
                  <div className="d-flex">
                    <p style={{ fontWeight: "400", fontSize: "13px", color: "#9EA0A5" }}>{item?.domisili}</p>
                  </div>
                  {/* <img src={data.photo == "null" ? noimage : data.photo} className='card-img-top' height={200} width={500} quality={100} style={{ objectFit: "cover", borderRadius: "4px" }} /> */}
                </div>
                <div>
                  {item.skills.map((skill, index) => (
                    <button key={index} className={styles.btn}>{skill === "null" ? "skill" : skill}</button>
                  ))}
                </div>
              </div>
              <div className="col-lg-2 col-md-2">
                <Link href={`/profile-worker/${item?.id_worker}`} ><button className={styles.bt}>Lihat profile</button></Link>
              </div>
            </div>
            <hr />
          </div>
        ))}
      <div div className='text-center'>
        <Pagination totalPosts={skils.length} postsPerPage={postsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
      </div >
      <Footer />
    </>
  )
}

export default Home