import styles from '../../styles/Edit.module.css'
import noimage from '../../public/img/noimage.png'
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.isReady])

    return (
        <>
            {data.map((item,index) => (
                <div key={index} className={styles.wrapper}>
                    <div className='d-flex justify-content-center'>
                        <Image src={item.photo == "null" ? noimage : item.photo} width={150} height={150} className={styles.image} alt='profile' />
                    </div>
                    {/* <div className={styles.wrapp}>
                        <Image src={pencil} />
                        <p className={styles.edit}>Edit</p>
                    </div> */}
                    <div className="container px-5 mt-5">
                        <p className={styles.name}>{item.name == "undefined" ? "user name" : item.name}</p>
                        <p className={styles.job}>{item.job_desk == "undefined" ? "...." : item.job_desk}</p>
                        <p className={styles.adress}><span><Image src={map} alt='map' /></span><span style={{ marginLeft: "10px" }}>{item.domisili == "undefined" ? "...." : item.domisili}</span></p>
                        <p className={styles.work}>{item.work_place == "undefined" ? "...." : item.work_place}</p>
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
