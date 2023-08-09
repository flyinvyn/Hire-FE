import Link from "next/link"

export const Porto = (props) => {
    return (
        <>
            <div className="container">
                <div className=''>
                    <p style={{ fontSize: "14px", color: "#46505C" }}>{props.name}</p>
                    <p style={{ fontSize: "14px", color: "#46505C" }}><Link href={props.repo}>{props.repo}</Link></p>
                    <p className='mt-3' style={{ width: "450px" }}>{props.type}</p>
                </div>
            </div>
        </>
    )
}
