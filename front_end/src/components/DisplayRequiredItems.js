import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";


const DisplayRequiredItems = () => {

    const history = useHistory();
    const [data, setData] = useState(null);

    useEffect ( () => {
        fetch ('http://127.0.0.1:5000/get-request-item', { 
        method: 'GET',
        
    })
    .then ( (res) => {
        if (!res.ok) {
            throw new Error("Can't fetch requested items");
        }

        console.log("requested item fetched");

        return res.json();
    })
    .then ( (list) => {
        setData(list);
        console.log(list);
    })
    },[])

    const handleAccept = (eachItem) => {

        fetch('http://127.0.0.1:5000/delete-request', {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(eachItem.item),
            
        })
        .then( (res) => {
            if (!res.ok) {
                throw new Error("Failed to fetch");
            }
            console.log("deleted successfully");
        })
        .catch ( (e) => {
            console.log(e.message);
        })

    }

    return(
        <div className=" w-full flex justify-center items-center bg-blue-gray-200 h-screen">
            {data && <div className=" w-full flex gap-10 flex-wrap  h-full p-10 ">
                {data.map( (eachItem) => (
                    <div className="card w-96 h-52 bg-base-100 shadow-xl" key={eachItem.id}>
                    <div className="card-body">
                        <h2 className="card-title">{eachItem.item}</h2>
                        <p>{eachItem.prod_desc}</p>
                        <div className=" mt-1 card-actions justify-between">
                            <Link to="/contribute"><button className="btn btn-outline btn-accent" onClick={()=>{
                                handleAccept(eachItem);
                                history.push("/contribute");
                            }}>Accept</button></Link>
                            <button className="btn btn-outline">Wait</button>
                        </div>
                    </div>
                </div>
                ))}
            </div>}
        </div>
    );

}

export default DisplayRequiredItems;