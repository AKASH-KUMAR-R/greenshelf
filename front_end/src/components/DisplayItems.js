import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useState } from "react";


const DisplayItems = (props) => {

    const [displayItems, setDisplayItems] = useState(null);

    useEffect ( () => {

        fetch ('http://127.0.0.1:5000/home', {
        method: "GET",
        
    })
    .then ( (res) => {
        if (!res.ok) {
            throw new Error("Can't fetch data");
        }
        console.log("Data fetched successfully");
        return res.json();
    })
    .then ( (data) => {
        setDisplayItems(data);
        props.setData(data);
        console.log(data);
    })
    .catch ( (e) => {
        console.log(e.message); 
    })
    
    }, []);
 

    return (
        <div 
        className="  flex  flex-wrap gap-10 p-16"  
        style={{
            width: "100%",
            
        }}>
            {displayItems && displayItems.items.map( (eachItem,index) => (
                <div 
                className="card w-60   bg-base-100 shadow-xl overflow-hidden" 
                key={eachItem.id}>
                <figure><img src={eachItem.item_image} alt="Capture1" border="0" style={{
                    width: "150px",
                    height: "150px",
                    marginTop: "10px",
                    borderRadius: "12px",
                }}></img></figure>
                <div className="card-body overflow-hidden  whitespace-nowrap ">
                    <h2 className="card-title">{eachItem.item}</h2>
                    <p className="text ">{eachItem.prod_desc}</p>
                    <div className="card-actions justify-end">
                    <Link to={`/itemDetails/${index}`}><button className="btn btn-primary btn-sm">Details</button></Link>
                    </div>
                </div>
            </div>
            )) }
        </div>
    );
}

export default DisplayItems;