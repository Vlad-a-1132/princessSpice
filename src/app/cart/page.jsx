"use client"
import Link from 'next/link';
import Rating from '@mui/material/Rating';
import QuantityBox from '@/Components/QuantityBox';
import { IoIosClose } from "react-icons/io";
import Button from '@mui/material/Button';
import Image from 'next/image';

import emprtCart from '../../assets/images/emptyCart.png';
import { MyContext } from '@/context/ThemeContext';
import { useContext, useEffect, useState } from "react";
import { IoBagCheckOutline } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/navigation';
import { deleteData, editData, fetchDataFromApi } from '@/utils/api';

//import { Modal, Box } from '@mui/material';
import Modal from './../../Components/Modal'

const Cart = () => {

    const [cartData, setCartData] = useState([]);
    const [productQuantity, setProductQuantity] = useState();
    let [cartFields, setCartFields] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [selectedQuantity, setSelectedQuantity] = useState();
    const [changeQuantity, setChangeQuantity] = useState(0);
    const [isLogin, setIsLogin] = useState(false);

    const context = useContext(MyContext);
    const history = useRouter();

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0)
        const token = localStorage.getItem("token");
        if (token !== "" && token !== undefined && token !== null) {
            setIsLogin(true);
        } else {
            history.push("/signIn");
        }

        const user = JSON.parse(localStorage.getItem("user"));
        fetchDataFromApi(`/api/cart?userId=${user?.userId}`).then((res) => {
            setCartData(res);
            setSelectedQuantity(res?.quantity)
        })
    }, [history]);

    const quantity = (val) => {
        setProductQuantity(val);
        setChangeQuantity(val);
    }

    const selectedItem = (item, quantityVal) => {
        if (changeQuantity !== 0) {
            setIsLoading(true);
            const user = JSON.parse(localStorage.getItem("user"));
            cartFields.productTitle = item?.productTitle;
            cartFields.image = item?.image;
            cartFields.rating = item?.rating;
            cartFields.price = item?.price;
            cartFields.quantity = quantityVal;
            cartFields.subTotal = parseInt(item?.price * quantityVal);
            cartFields.productId = item?.id;
            cartFields.userId = user?.userId;

            editData(`/api/cart/${item?._id}`, cartFields).then((res) => {
                setTimeout(() => {
                    setIsLoading(false);
                    fetchDataFromApi(`/api/cart?userId=${user?.userId}`).then((res) => {
                        setCartData(res);
                    })
                }, 1000)
            })
        }
    }

    const goToCheckout = () => {
        // INFO: this is temporary code
        setIsModalOpen(true)
        // INFO_END

        //history.push("/checkout")
    }

    const removeItem = (id) => {
        setIsLoading(true);
        deleteData(`/api/cart/${id}`).then((res) => {
            context.setAlertBox({
                open: true,
                error: false,
                msg: "item removed from cart!"
            });

            const user = JSON.parse(localStorage.getItem("user"));
            fetchDataFromApi(`/api/cart?userId=${user?.userId}`).then((res) => {
                setCartData(res);
                setIsLoading(false);
            });

            context.getCartData();
        })
    }

    return (
        <>
            <Modal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                content="На данный момент сервис не предоставляет возможности для автоматической обработки заказов, после отправки формы заказа с вами свяжутся представители компании. Приносим извинения за доставленные неудобства."
                title="Обратите внимание"
                confirmation
                onConfirmation={() => history.push("/checkout")}
            />
            <section className="section cartPage">
                <div className="container">
                    <h2 className="hd mb-1">Ваша корзина</h2>
                    <p>В вашей корзине <b className="text-red">{cartData?.length}</b> продукта</p>

                    {cartData?.length !== 0 ?
                        <div className="row">
                            <div className="col-md-9 pr-5">
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th width="35%">Продукт</th>
                                                <th width="15%">Цена за единицу товара</th>
                                                <th width="25%">Количество</th>
                                                <th width="15%">Итого</th>
                                                <th width="10%">Удалить</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cartData?.length !== 0 && cartData?.map((item, index) => (
                                                <tr key={item._id}>
                                                    <td width="35%">
                                                        <Link href={`/product/${item?.productId}`}>
                                                            <div className="d-flex align-items-center cartItemimgWrapper">
                                                                <div className="imgWrapper">
                                                                    <img src={item?.image} className="w-100" alt={item?.productTitle} />
                                                                </div>
                                                                <div className="info px-3">
                                                                    <h6>{item?.productTitle?.substr(0, 30) + '...'}</h6>
                                                                    <Rating name="read-only" value={item?.rating} readOnly size="small" />
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </td>
                                                    <td width="15%">Рублей {item?.price}</td>
                                                    <td width="25%">
                                                        <QuantityBox quantity={quantity} item={item} selectedItem={selectedItem} value={item?.quantity} />
                                                    </td>
                                                    <td width="15%">Рублей {item?.subTotal}</td>
                                                    <td width="10%">
                                                        <span className="remove" onClick={() => removeItem(item?._id)}>
                                                            <IoIosClose />
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <div className="card border p-3 cartDetails">
                                    <h4>ОБЩАЯ КОРЗИНА</h4>
                                    <div className="d-flex align-items-center mb-3">
                                        <span>Итого</span>
                                        <span className="ml-auto text-red font-weight-bold">
                                            {
                                                (context.cartData?.length !== 0 ?
                                                    context.cartData?.map(item => parseInt(item.price) * item.quantity).reduce((total, value) => total + value, 0) : 0)?.toLocaleString('en-US', { style: 'currency', currency: 'INR' })
                                            }
                                        </span>
                                    </div>
                                    {/*
                                    <div className="d-flex align-items-center mb-3">
                                        <span>Адрес доставки</span>
                                        <span className="ml-auto"><b>С вами свяжутся на счет доставки</b></span>
                                    </div>
                                    */}
                                    <div className="d-flex align-items-center mb-3">
                                        {/* <span>Estimate for</span>
                                        <span className="ml-auto"><b>United Kingdom</b></span> */}
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <span>Общий</span>
                                        <span className="ml-auto text-red font-weight-bold">
                                            {
                                                (context.cartData?.length !== 0 ?
                                                    context.cartData?.map(item => parseInt(item.price) * item.quantity).reduce((total, value) => total + value, 0) : 0)?.toLocaleString('en-US', { style: 'currency', currency: 'INR' })
                                            }
                                        </span>
                                    </div>
                                    <br />
                                    <Button onClick={goToCheckout} className='btn-blue bg-red btn-lg btn-big'>
                                        <IoBagCheckOutline /> &nbsp; Оформить
                                    </Button>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="empty d-flex align-items-center justify-content-center flex-column">
                            <Image src={emprtCart} alt="image" width="150" height="150px" />
                            <h3>Ваша корзина в настоящее время пуста</h3>
                            <br />
                            <Link href="/">
                                <Button className='btn-blue bg-red btn-lg btn-big btn-round'>
                                    <FaHome /> &nbsp; Продолжить покупки
                                </Button>
                            </Link>
                        </div>
                    }
                </div>
            </section>

            {isLoading === true && <div className="loadingOverlay"></div>}
        </>
    )
}

export default Cart;
