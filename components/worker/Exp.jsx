import styles from '../../styles/Edit.module.css'


export const Exp = (props) => {
    
    return (
        <>
            <div className="container">

                <div className='ps-5'>
                    <div className="">
                        <p id={styles.title}>{props.pos}</p>
                    </div>
                    <p style={{ fontSize: "14px", color: "#46505C" }}>{props.name}</p>
                    <div className="d-flex gap-3">
                    <p style={{ fontSize: "12px", color: "#9EA0A5" }}>{props.start}</p>
                    <p style={{ fontSize: "12px", color: "#9EA0A5" }}>{props.slice}</p>
                    <p style={{ fontSize: "12px", color: "#9EA0A5" }}>{props.end}</p>
                    </div>
                    <p className='mt-3' style={{ width: "450px" }}>{props.description}</p>
                </div>
            </div>
        </>
    )
}
