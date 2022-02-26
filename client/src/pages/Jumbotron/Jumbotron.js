import React from "react";

const Jumbotron = () => {
    return (
        <div>
            <div className="wrappJumbotron  relative ">
                <div className="jumbotronContainer flex flex-col-reverse justify-center items-center p-2.5 md:flex-row md:w-6/12 md:m-auto md:mt-5 md:gap-4 md:relative custom-bg md:h-96 md:rounded-xl">
                    <div className="leftJumbotron mb-5 flex-1 md:mt-7">
                        <h1 className="heading1 font-extrabold text-4xl mb-2 text-white">WAYSBUCKS</h1>
                        <h2 className="subheading1 mb-2 font-semibold text-white font-['Avenir-Book']">Things are changing, but we’re still here for you</h2>
                        <p className="desc1 mb-6 md:w-full text-white font-light font-['Avenir-Book']">We have temporarily closed our in-store cafes, <br /> but select grocery and drive-thru locations remaining open. <br /> Waysbucks Drivers is also available
                        </p>
                        <button className="ctaHome bg-red-strong px-1 py-2 text-white font-bold rounded">Let's Order</button>
                    </div>

                    <div className="rightJumbotron mb-5 flex justify-center items-center md:absolute md:-right-14 md:top-8">
                        <img src="/images/jumbotron/jumbotron-img.png" alt=""  className="w-full md:w-full rounded-xl"/>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Jumbotron