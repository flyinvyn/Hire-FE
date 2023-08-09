import React, { useEffect, useState } from 'react'
import Nav from '../../components/navbar/Nav'
import styles from '../../styles/HomePage.module.css'
import Image from 'next/image'
import profile from '../../public/img/profile.png'
import map from '../../public/img/map.png'
import Footer from '../../components/footer/Footer'
import axios from 'axios'
import Pagination from '../pagination'
import Link from 'next/link'

export async function getServerSideProps() {
    const res = await axios.get(`http://localhost:5000/worker`);
    return {
        props: { worker: res.data.data },
    };
}
// const home = () => {
//   const [workers, setWorkers] = useState([]);
//   useEffect(() => {
//     axios.get(`http://localhost:5000/users`)
//       .then((res) => {
//         setWorkers(res.data.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       })
//   }, [])


function SSR({ worker }) {
    // const [workers, setWorkers] = useState([]);
    const [search, setSearch] = useState("")
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(3);
    const [sort, setSort] = useState();
    const onSelectionChange = (e) => {
        const sortDirection = e.target.value;
        setSort(sortDirection);
    };




// const [skills, setSkills] = useState({
//   id_worker:""
// });
// useEffect(() => {
//   const id = skills.id_worker
//   axios.get(`http://localhost:5000/users/${id}`)
//     .then((res) => {
//       setSkills(res.data.data);
//     })
//     .catch((err) => {
//       console.log(err);
//     })
// }, [])
const [order, setOrder] = useState("ASC")
const [data, setData] = useState()

const sorting = (col) => {
    if (order === "ASC") {
        const sorted = [...data].sort((a, b) =>
            a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
        );
        setData(sorted)
        setOrder("DSC")
    }
    if (order === "DSC") {
        const sorted = [...data].sort((a, b) =>
            a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
        );
        setData(sorted)
        setOrder("ASC")
    }
}


const [skils, setSkils] = useState([]);
const [login, setLogin] = useState()
useEffect(() => {
    const isLogin = localStorage.getItem("id_worker")
    setLogin(isLogin)
    axios.get(`http://localhost:5000/skill/${login}`)
        .then((res) => {
            setSkils(res.data.data);
        })
        .catch((err) => {
            console.log(err);
        })
}, [])



const lastPostIndex = currentPage * postsPerPage;
const firstPostIndex = lastPostIndex - postsPerPage;
const currentPosts = worker.slice(firstPostIndex, lastPostIndex);


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
                <select
                    className="form-select w-25"
                    aria-label="Default select example"
                    onChange={onSelectionChange}
                >
                    <option selected>Sort</option>
                    <option value="asc">Sort by name</option>
                    <option value="desc">Sort by place</option>
                </select>
                <button className={styles.srch} type="button">Search</button>
            </div>
        </div>
        {currentPosts.filter((worker) => {
            if (search === "") {
                return worker
            } else if (worker.name.toLowerCase().includes(search.toLowerCase())) {
                return worker
            }
        }).map((worker => (
            <div className="container bg-white" style={{ borderRadius: "4px" }}>
                <div className="row">
                    <div className="col-lg-1 col-md-1">
                        <img src={worker.photo == "null" ? map : worker.photo} style={{ borderRadius: "50%", width: "100px", height: "100px" }} />
                    </div>
                    <div className="col-lg-3 col-md-3 mx-5">
                        <div>
                            <h2 style={{ fontWeight: "600", fontSize: "18px", color: "#1F2A36" }}>{worker?.name}</h2>
                            <p style={{ fontWeight: "400", fontSize: "13px", color: "#9EA0A5" }}>{worker?.job_desk}</p>
                            <div className="d-flex">
                                <Image src={map} />
                                <p style={{ fontWeight: "400", fontSize: "13px", color: "#9EA0A5" }}>{worker?.domisili}</p>
                            </div>
                            {/* <img src={data.photo == "null" ? noimage : data.photo} className='card-img-top' height={200} width={500} quality={100} style={{ objectFit: "cover", borderRadius: "4px" }} /> */}
                        </div>
                        <div>
                            {skils.map((skil => (
                                <button className={styles.btn}>{skil.skill_name}</button>
                            )))}
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-2 offset-md-5">
                        <Link href={`/profile-worker/${worker?.id_worker}`} ><button className={styles.bt}>Lihat profile</button></Link>
                    </div>
                </div>
                <hr />
            </div>
        )))}
        <div className='text-center'>
            <Pagination totalPosts={worker.length} postsPerPage={postsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
        </div>
        <Footer />
    </>
)
};

export default SSR