import { useEffect, useState } from 'react';
import styles from '../../styles/Edit.module.css'
import axios from 'axios';
import { useRouter } from 'next/router';
import ModalDeleteSkill from '../modal/ModalDeleteSkil';
import Swal from 'sweetalert2';

export const Skill = () => {
    const router = useRouter();
    const [skill, setSkill] = useState([]);
    const [login, setLogin] = useState();

    const [data, setData] = useState({
        skill_name: "",
        id_worker: ""
    });

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${process.env.NEXT_PUBLIC_API}/skill`, data)
            .then((res) => {
                Swal.fire({
                    icon: 'success',
                    title: 'create successfully'
                  })
                window.location.reload()
            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        if (router.isReady) {
            const isLogin = localStorage.getItem("id_worker");
            setLogin(isLogin);
        }
    }, [router.isReady]);

    useEffect(() => {
        if (router.isReady) {
            axios.get(`${process.env.NEXT_PUBLIC_API}/skill/${router.query.id}`)
                .then((res) => {
                    setSkill(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }, [router.isReady])

    return (
        <>
            <div className='mt-5' id={styles['wrapper-right']}>
                <h2 className='ps-5 pt-3' id={styles.title}>Skil</h2>
                <hr />
                <div className="ps-5 mb-5 d-flex flex-wrap gap-3">
                    {skill.map((skil => (
                        // <ModalDeleteSkill id={skil.id_skil}>
                            <button className={styles['item-skill']}>{skil?.skill_name}
                            <ModalDeleteSkill id_skill={skil.id_skill} ></ModalDeleteSkill>
                            </button>
                        // {/* </ModalDeleteSkill> */}
                    )))}
                </div>
                <div className="ps-5 pe-5 pb-5">
                    <form>
                        <div className="gap-5 d-flex">
                            <input type="text" className="form-control" value={data?.skill_name} name='skill_name' onChange={handleChange} id="exampleFormControlInput1" style={{ fontSize: "13px", fontWeight: "500", color: "#858D96", height: "40px" }} placeholder="Javascript,Html,Css" />
                            <input type="hidden" name='id_worker' value={data.id_worker = login} />
                            <button type='button' onClick={handleSubmit} className={styles['skill-button']}>Simpan</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
