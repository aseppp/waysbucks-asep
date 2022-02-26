import React, {useState, useEffect} from "react";
import { API } from "../../config/api";

const Toppings = () => {
    const [topping, setTopping] = useState([])

    // Fetching Topping
    const getTopping = async () => {
        try {
            const response = await API.get('/getTopping')
            setTopping(response.data.data.topping)

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getTopping();
    }, []);

    return (
        <div>
            {topping.map((item) => {
                <div>{item.title}</div>
            })}
        </div>
    )
}

export default Toppings