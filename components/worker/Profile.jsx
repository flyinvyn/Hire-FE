import styles from '../../styles/Edit.module.css'
import profile from '../../public/img/profile.png'
import pencil from '../../public/img/pencil.png'
import map from '../../public/img/map.png'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

export const Profile = () => {
    const router = useRouter();
    const [data, setData] = useState([]);
    useEffect(() => {
        if (router.isReady) {
            axios.get(`${process.env.NEXT_PUBLIC_API}/worker/${router.query.id}`)
                .then((res) => {
                    setData(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }, [router.isReady])

    return (
        <>
            {data.map((item) => (
                <div className={styles.wrapper}>
                    <div className='d-flex justify-content-center'>
                        <img src={item.photo == "null" ? profile : item.photo} className={styles.image} />
                    </div>
                    <div className={styles.wrapp}>
                        <Image src={pencil} />
                        <p className={styles.edit}>Edit</p>
                    </div>
                    <div className="container px-5 mt-5">
                        <p className={styles.name}>{item.name}</p>
                        <p className={styles.job}>{item.job_desk}</p>
                        <p className={styles.adress}><span><Image src={map} /></span><span style={{ marginLeft: "10px" }}>{item.domisili}</span></p>
                        <p className={styles.work}>{item.work_place}</p>
                    </div>
                        <div className="d-grid gap-2 mt-5">
                            <button className={styles.simpan} type="submit">Simpan</button>
                            <button className={styles.batal} type="submit">Batal</button>
                        </div>
                </div>
            ))}
        </>
    )
}
