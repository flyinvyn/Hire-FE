import React from 'react'
import Nav from '../../components/navbar/Nav'
import styles from '../../styles/Edit.module.css'
import { Profile } from '../../components/worker/Profile'
import { DataWorker } from '../../components/worker/DataWorker'
import { Skill } from '../../components/worker/Skill'
import { Experience } from '../../components/worker/Experience'
import { Portofolio } from '../../components/worker/Portofolio'

const editWorker = () => {
    return (
        <>
            <Nav />
            <div className={styles.purples}></div>
            <div className="container">
                <div className="row ">
                    <div className="col-lg-4 col-md-4">
                        <Profile />
                    </div>
                    <div className="col-lg-7 col-md-7 offset-md-1">
                        <DataWorker />
                        <Skill/>
                        <Experience/>
                        <Portofolio/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default editWorker