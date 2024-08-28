"use client"
import { LuShirt } from "react-icons/lu";
import { TbTruckDelivery } from "react-icons/tb";
import { RiDiscountPercentLine } from "react-icons/ri";
import { CiBadgeDollar } from "react-icons/ci";
import Link from "next/link";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import newsLetterImg from '../../assets/images/newsletter.png';
import Button from '@mui/material/Button';
import { IoMailOutline } from "react-icons/io5";
import Image from "next/image";

import { MyContext } from "@/context/ThemeContext";
import { useContext } from "react";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import ProductModal from "../ProductModal";

import whatsappBudget from '../../assets/images/whatsapp.svg'
import telegramBudget from '../../assets/images/telegram.svg'
import Video from "../Video";

const Footer = () => {

    const context = useContext(MyContext);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        context.setAlertBox({
            open: false
        });
    };


    return (
        <>

            <Snackbar open={context.alertBox.open} autoHideDuration={6000} onClose={handleClose} className="snackbar">
                <Alert
                    onClose={handleClose}
                    autoHideDuration={6000}
                    severity={context.alertBox.error === false ? "success" : 'error'}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {context.alertBox.msg}
                </Alert>
            </Snackbar>

            {
                context.isHeaderFooterShow === true &&
                    <>
                        <section className="newsLetterSection mt-3 mb-3 d-flex align-items-center">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-6">

                                        <p className="text-white mb-1">Остались вопросы или хотите обсудить покупку индивидуально?</p>
                                        <h3 className="text-white">Свяжитесь с нами</h3>
                                        <p className="text-white mb-1">
                                            <a href="tel:89938888001" style={{color: ""}} className="link-offset-2 link-underline link-underline-opacity-0">8 (993) 888-80-01</a>
                                        </p>
                                        <p className="text-white mb-1">
                                            <a href="mailto:princessspicekmv@gmail.com" className="link-offset-2 link-underline link-underline-opacity-0">princessspicekmv@gmail.com</a>
                                        </p>
                                        {/* <div className="align-items-right d-flex">
                                        <a href="https://wa.me/8908098" className="link-offset-2 link-underline link-underline-opacity-0">
                                            <Image
                                                    src={whatsappBudget}
                                                    quality={100}
                                                    priority={true}
                                                    width={20}
                                                    className="linkBadget"
                                            />
                                        </a>
                                        <a href="https://t.me/username" className="link-offset-2 link-underline link-underline-opacity-0">
                                            <Image src={telegramBudget}
                                                    quality={100}
                                                    priority={true}
                                                    width={20}
                                                    className="linkBadget"
                                            />
                                        </a>
                                    </div> */}

                                    </div>

                                    {/* <div className="promoVideo">
                                    <Video src="/promo.mp4" width={400} height={400}/>
                                </div> */}

                                    <div className="col-md-6">
                                        <Image src={newsLetterImg} alt="image" className="absolute-image" />
                                    </div>
                                </div>
                            </div>
                        </section>
                        <footer>
                            <div className="container">
                                <div className="topInfo row">
                                    {/* <div className="col d-flex align-items-center">
                                    <span><LuShirt /></span>
                                    <span className="ml-2">Everyday fresh products</span>
                                </div> */}


                                    <div className="col d-flex align-items-center">
                                        <span><TbTruckDelivery /></span>
                                        <span className="ml-2">Доставка по выгодным ценам</span>
                                    </div>

                                    <div className="col d-flex align-items-center">
                                        <span><RiDiscountPercentLine /></span>
                                        <span className="ml-2">Ежедневные Мега Скидки</span>
                                    </div>


                                    <div className="col d-flex align-items-center">
                                        <span><CiBadgeDollar /></span>
                                        <span className="ml-2">Лучшие цены</span>
                                    </div>


                                </div>



                                <div className="row mt-5 linksWrap">

                                    <div className="col">
                                        <h5>Компания</h5>
                                        <ul>
                                            <li><Link href="/">Специи</Link></li>
                                            <li><Link href="/">Урбечи</Link></li>
                                            <li><Link href="/">Соли</Link></li>
                                            <li><Link href="/">Готовые наборы</Link></li>
                                            <li><Link href="/">Чаи</Link></li>
                                            <li><Link href="/">Авторские смеси</Link></li>
                                            <li><Link href="/">ОПТ</Link></li>
                                        </ul>
                                    </div>

                                    <div className="col">
                                        <h5>Для покупателей</h5>
                                        <ul>
                                            <li><Link href="/">Контакты</Link></li>
                                            <li><Link href="/">Оплата</Link></li>
                                            <li><Link href="/">Допставка</Link></li>
                                            <li><Link href="/">О нас</Link></li>
                                        </ul>
                                        <h5>Личный кабинет</h5>
                                        <ul>
                                            <li><Link href="/">Мой профиль</Link></li>
                                            <li><Link href="/">Мои заказы</Link></li>
                                        </ul>
                                    </div>

                                    <div className="col">
                                        <h5>Контакты</h5>
                                        <ul>
                                            <li>Тел. <Link href="tel:89938888001" style={{color: ""}} className="link-offset-2 link-underline link-underline-opacity-0">8 (993) 888-80-01</Link></li>
                                            <li>Почта: <Link href="mailto:princessspicekmv@gmail.com" className="link-offset-2 link-underline link-underline-opacity-0">princessspicekmv@gmail.com</Link></li>
                                            <li>Режим работы:<br/>Пн-Пт 9:00—19:00; Сб-Вс 10:00-20:00</li>
                                        </ul>
                                    </div>

                                </div>



                                {
                                    //<div className="copyright mt-3 pt-3 pb-3 d-flex">
                                    //    {/* <p className="mb-0">Copyright 2024. All rights reserved</p> */}
                                    //    <ul className="list list-inline ml-auto mb-0 socials">
                                    //        <li className="list-inline-item">
                                    //            <Link href="/"><FaFacebookF /></Link>
                                    //        </li>
                                    //
                                    //        <li className="list-inline-item">
                                    //            <Link href="/"><FaTwitter /></Link>
                                    //        </li>
                                    //
                                    //        <li className="list-inline-item">
                                    //            <Link href="/"><FaInstagram /></Link>
                                    //        </li>
                                    //    </ul>
                                    //</div>
                                }


                            </div>
                        </footer>
                    </>
            }




            {
                context.isOpenProductModal === true && <ProductModal data={context.productData} />
            }

        </>
    )
}

export default Footer;
