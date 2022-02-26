import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { API } from "../../config/api";
import MenuProduct from "../../components/MenuProduct"
import thousandSeparator from "../../utilities/thousandSeparator"


const Menu = () => {
    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        try {
            const response = await API.post("/getProduct")
            setProducts(response.data.data.products)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getProducts();
      }, []);

    return (
        <div className="mx-5 my-4 relative md:w-8/12 md:m-auto md:mt-28">
        <h1 className="mb-6 text-red-600 font-['Avenir-Black'] text-4xl md:text-5xl md:mb-10 ">
          Let&#39;s Order
        </h1>
        <div className="product-list block sm:flex sm:flex-wrap sm:justify-between md:flex md:flex-wrap md:justify-between ">
          {products.map((items, index) => (
            <Link key={index} to={`/detail/${items.id}`}>
              <MenuProduct
                name={items.title}
                image={items.image}
                price={thousandSeparator(items.price)}
              />
            </Link>
          ))}
        </div>
      </div>
    )
}

export default Menu