import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";

const DisplayDetails = (props) => {

    const {itemId} = useParams();
    const [id, setId] = useState();
    const history = useHistory();

    useEffect ( () => {
        setId(itemId);
    }, [itemId])

    const handleBuyButton = (buyedItem) => {

        fetch ('http://127.0.0.1:5000/delete-item', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(buyedItem),
        })
        .then ( (res) => {
            if (!res.ok) {
                throw new Error("Removal is failed");
            }

            console.log("Removed successfully");
        })
        .catch( (e) => {
            console.log(e.message);
        })

        history.push("/inventory");
    }

    return (
        <div className=" w-full h-screen flex justify-center items-center bg-blue-gray-100 text-black" >

            <div className= " w-3/5 h-3/5 flex display-item bg-blue-gray-200 p-6">
                <div className="image w-64 h-56 mt-6 ml-10 rounded-lg">
                    <img src={props.displayItems.items[itemId].item_image} style={ {
                        width: "100%",
                        height: "100%",
                        borderRadius: "12px",
                        boxShadow: "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
                    }}></img>
                    <h2 className=" text-center text-3xl mt-4">{props.displayItems.items[itemId].item}</h2>
                </div>
                <div className=" flex flex-col w-3/5 h-full   ml-10 mr-4">

                    <div className=" mt-24"> 
                        <p className=" text-xl"><span className=" mr-1">Description:</span>{props.displayItems.items[itemId].prod_desc}</p>
                    </div>
                    <div className="">
                        <Button color="white" className=" button-config w-20 mt-5" onClick={ () => {
                            console.log(props.displayItems.items[itemId]);
                            handleBuyButton(props.displayItems.items[itemId]);
                            
                        }}>Buy</Button>
                    </div>
                </div>
                
            </div>
            
        </div>
    );
}

export default DisplayDetails;
