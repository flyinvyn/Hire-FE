import React, { useEffect, useState } from 'react';
import foto from '../../public/img/profile.png'
import Image from 'next/image'
import style from './Carousel.module.css'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import axios from 'axios';

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
        slidesToSlide: 3, // Jumlah item yang ditampilkan per geseran
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        slidesToSlide: 2,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1,
    },
};


export const Carousels = () => {
    const [datas, setDatas] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:5000/worker`)
            .then((res) => {
                setDatas(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])
    return (
        <>
            <div className="container">
                <Carousel responsive={responsive} >
                    {datas.map((data => (
                        <div className={style.wrapper}>
                            <img src={data.photo} className={style.image} />
                            <h2>{data?.name}</h2>
                            <p>{data?.job_desk}</p>
                            <p>{data?.description}</p>
                            <p style={{ width: "150px" }}>{data?.description}</p>
                        </div>
                    )))}
                </Carousel>
            </div>
        </>
    )
}
