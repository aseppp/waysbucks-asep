import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { API } from '../config/api';
import Separator from "format-thousands"
import Toppings from '../components/toppings/Topping';


export default function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [topping, setTopping] = useState([]);

    const path = "http://localhost:5000/uploads/"

    // Fetching detail product data by id from database
    const getProduct = async (id) => {
        try {
        const response = await API.get("/detail/" + id);

        // Store product data to useState variabel
        setProduct(response.data.data);

        } catch (error) {
        console.log(error);
        }
    };

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
        getProduct(id);
        getTopping();
    }, []);


    return (
        <div className='h-4/5 absolute w-full flex items-center'>
            <div className="flex items-center w-9/12 m-auto  justify-between">
                <div className="">
                    <img
                        src={path + product.image}
                        alt="product"
                        className="w-full md:w-full xl:w-96"
                    />
                </div>

                <div className="text">
                    <div className="mb-8">
                        <h1 className="text-red-700 text-5xl font-extrabold font-['Avenir-Black'] mb-4">
                        {product.title}
                        </h1>
                        <p className="text-red-500 text-xl">
                        Rp{Separator(product.price, ".")},-
                        </p>
                    </div>

                    {/* TOPPING */}
                    <div className="mb-8">
                        <h4 className="text-red-700 text-xl font-bold">Topping</h4>


                        {/* <Toppings/> */}

                        <div className="flex flex-wrap items-center text-center text-red-600">
                        {topping.map((item) => (

                            // <div
                            // key={item.id}
                            // className="w-1/4 flex justify-center relative">
                            //     <ToppingActive
                            //     id={item.id}
                            //     title={item.title}
                            //     price={item.price}
                            //     image={item.image}
                            //     />
                            // </div>

                            <button
                            type="button"
                            className=" w-1/2 lg:w-1/4 mt-10 flex flex-col items-center relative"
                            key={item.index}
                            >
                            <img src={item.image} alt="" className="hover:opacity-75" />
                            <h4 className="mt-3 text-sm md:text-base">{item.title}</h4>
                            </button>
                        ))}
                        </div>
                    </div>

                    <div className="text-xl flex justify-between font-bold mb-8 text-red-800">
                        <span>Total</span>
                        <span>Rp ,-</span>
                    </div>

                    <button className="w-full bg-red-700 text-white py-4 rounded-md hover:bg-brand-red">
                        Add Cart
                    </button>
                </div>
            </div>
        </div>
    )
}
