import React, {Fragment} from "react";
import { Menu, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IsLoginContext } from "../../context/context";
import { UserContext } from "../../context/userContext";
import UserIcon from "../../assets/images/icons/user-icon.png"
import LogoutIcon from "../../assets/images/icons/logout-icon.png"

const DropdownUser = () => {
    let navigate = useNavigate();
    const [isLogin, setIsLogin] = useContext(IsLoginContext)
    const [ state, dispatch ] = useContext(UserContext);

    const logout = () => {
        // console.log(state);
        setIsLogin(!isLogin);
        dispatch({
        type: "LOGOUT",
        });
        navigate("/");
    };
    return (
        <Menu as="div" className="relative z-10 flex items-center gap-4">

            <Link to="/cart">
                <img src="/images/icons/basket.png" alt="cart" />
            </Link>

            <div>
                <div>
                    <Menu.Button>
                    <img
                        src="/images/users/user.png"
                        alt="user"
                        className="h-14 w-14 object-cover rounded-full border-2 border-brand-red"
                    />
                    </Menu.Button>
                </div>

                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">

                        <Menu.Item>
                            <Link
                            to="/profile"
                            className="p-4 flex items-center hover:bg-gray-100"
                            >
                            <img
                                src={UserIcon}
                                className="w-5 mr-2"
                                alt="profile"
                            />
                            My Profile
                            </Link>
                        </Menu.Item>

                    <hr />
                    <Menu.Item>
                        <div onClick={logout}>
                            <div className="p-4 flex items-center hover:bg-gray-100 cursor-pointer">
                            <img src={LogoutIcon} className="w-5 mr-2" alt="logout" />
                            Logout
                            </div>
                        </div>
                    </Menu.Item>
                    </Menu.Items>
                </Transition>
            </div>
        </Menu>
    )
}

export default DropdownUser