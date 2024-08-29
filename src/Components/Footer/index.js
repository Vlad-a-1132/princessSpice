"use client"

import React from 'react'
import Script from 'next/script'
import { LuShirt } from "react-icons/lu";
import { TbTruckDelivery } from "react-icons/tb";
import { RiDiscountPercentLine } from "react-icons/ri";
import { CiBadgeDollar } from "react-icons/ci";
import Link from "next/link";

import { FaWhatsapp, FaTimesCircle, FaMailBulk, FaPhone, FaClock, FaHome } from 'react-icons/fa';

import Button from '@mui/material/Button';

import { IoMailOutline } from "react-icons/io5";

import Image from "next/image";

//import {
//    APIProvider,
//    Map,
//    Marker,
//    useMarkerRef,
//} from '@vis.gl/react-google-maps';

import { MyContext } from "@/context/ThemeContext";
import { useContext, useState } from "react";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import ProductModal from "../ProductModal";
import VideoOverlay from './VidOverlay';

import Video from "../Video";
import Modal from '../Modal';

const Footer = () => {
    const [isPromoOverlayOpened, setIsPromoOverlayOpened] = useState(false);

    const [isModalOpened, setIsModalOpened] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalContent, setModalContent] = useState('');

    const globalModalRef = React.createRef();

    const context = useContext(MyContext);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        context.setAlertBox({
            open: false
        });
    };

    function _preserveModal(title, text) {
        setModalTitle(title);
        setModalContent(text);
        setIsModalOpened(true);
    }

    function onContactsClick(e) {
        e.preventDefault();

        _preserveModal('Контакты',
            <>
                <p>
                    <FaHome/> Кисловодск, Ул. Кривая дом 30<br/>
                    <FaClock/> Режим работы:<br/>Пн-Пт 9:00—19:00; Сб-Вс 10:00-20:00
                </p>
                <ul>
                    <li>
                        <Link style={{color: "black"}} href="tel:89938888001" className="link-offset-2 link-underline link-underline-opacity-0">
                            <FaPhone /> 8 (993) 888-80-01
                        </Link>
                    </li>
                    <li>
                        <Link style={{color: "black"}} href="mailto:princessspicekmv@gmail.com" className="link-offset-2 link-underline link-underline-opacity-0">
                            <FaMailBulk /> princessspicekmv@gmail.com
                        </Link>
                    </li>
                </ul>
            </>
        );
    }

    function onDeliveryClick(e) {
        e.preventDefault();

        _preserveModal("Доставка", 
            <>
                <p>
                    <TbTruckDelivery/> Доставка
                </p>
                <p>
                    Доставка по Кисловодску и другим городам России средствами CDEK
                </p>
            </>
        )
    }

    function onPayClick(e) {
        e.preventDefault();

        _preserveModal("Оплата", 
            <>
                <p>
                    <LuShirt/> На данный момент оплата произоводится при личном ответе магазина
                </p>
            </>
        )
    }

    function onAboutUsClick(e) {
        e.preventDefault();

        _preserveModal("О нас", 
            <>
                <p>
                    <RiDiscountPercentLine/> Продажа специй в оптом и в розницу в городе Кисловодске
                </p>
                <p>
                    <CiBadgeDollar/> Приглашаем посетить наш магазин в Кисловодске
                </p>
            </>
        )
    }

    return (
        <>
            <Modal open={isModalOpened} onClose={() => setIsModalOpened(false)} content={modalContent} title={modalTitle}/>

            <VideoOverlay open={isPromoOverlayOpened} onClose={() => setIsPromoOverlayOpened(false)}>
                <Video src="/promo.mp4" />
            </VideoOverlay>

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
                        <section className="marketMapSection d-flex align-items-center">
                            <div className="MapOverlay">
                                <div className='MapOverlayContent'>
                                    <h1>Контакты</h1>
                                    <p>
                                        <FaHome/> Кисловодск, Ул. Кривая дом 30<br/>
                                        <FaClock/> Режим работы:<br/>Пн-Пт 9:00—19:00; Сб-Вс 10:00-20:00
                                    </p>
                                    <ul>
                                        <li>
                                            <Link href="tel:89938888001" style={{color: "white"}} className="link-offset-2 link-underline link-underline-opacity-0">
                                                <FaPhone /> 8 (993) 888-80-01
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="mailto:princessspicekmv@gmail.com" style={{color: "white"}} className="link-offset-2 link-underline link-underline-opacity-0">
                                                <FaMailBulk /> princessspicekmv@gmail.com
                                            </Link>
                                        </li>
                                    </ul>
                                    <Button onClick={() => setIsPromoOverlayOpened(!isPromoOverlayOpened)} variant="contained" color="secondary" className="btn btn-primary btn-sm" style={{marginTop: "20px"}}>Открыть промо видео</Button>
                                </div>
                            </div>

                            <iframe
                                className="Map"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2873.4509278183186!2d42.713303700000004!3d43.929340599999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40582a4981ffdf95%3A0xbbc42d5e4de5ff42!2sUlitsa%20Krasivaya%2C%2030%2C%20Kislovodsk%2C%20Stavropolskiy%20kray%2C%20357736!5e0!3m2!1sen!2sru!4v1724952364993!5m2!1sen!2sru"
                                height="450"
                                style={{border: "0"}}
                                allowfullscreen=""
                                loading="lazy"
                                referrerpolicy="no-referrer-when-downgrade"></iframe>
                            {
                                //<APIProvider apiKey="AIzaSyD695QKRxW2M-lk-KZvQm-gJcBVCdAa3NU">
                                //    <Map
                                //        style={{width: '100vw', height: '100vh'}}
                                //        defaultCenter={{lat: 43.929349, lng: 42.712520}}
                                //        defaultZoom={18}
                                //        disableDefaultUI={true}
                                //    >
                                //        <Marker ref={markerRef} position={{lat: 53.54992, lng: 10.00678}}/>
                                //    </Map>
                                //</APIProvider>
                            }
                            {
                                //<gmp-map
                                //    className="Map"
                                //    center="43.929349, 42.712520"
                                //    zoom="17"
                                //    map-id="dea1fd60813b4e75"
                                //    style={{height: "400px"}}
                                //    referrerpolicy="no-referrer-when-downgrade"
                                //></gmp-map>
                            }
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
                                            <li><Link href="/category/6689b55655a058239de610dc">Специи</Link></li>
                                            <li><Link href="/category/6689b5a855a058239de6110e">Урбечи</Link></li>
                                            <li><Link href="/category/6689b7f755a058239de612be">Соли</Link></li>
                                            <li><Link href="/category/6689b84f55a058239de612e4">Готовые наборы</Link></li>
                                            <li><Link href="/category/6689b88e55a058239de6130a">Чаи</Link></li>
                                            <li><Link href="/category/6689b8c755a058239de61330">Авторские смеси</Link></li>
                                            <li><Link href="/category/6689b91c55a058239de61368">Прочее</Link></li>
                                        </ul>
                                    </div>

                                    <div className="col">
                                        <h5>Для покупателей</h5>
                                        <ul>
                                            <li style={{cursor: "pointer", fontSize: "13px"}} onClick={(e) => onContactsClick(e)}>Контакты</li>
                                            <li style={{cursor: "pointer", fontSize: "13px"}} onClick={(e) => onPayClick(e)}>Оплата</li>
                                            <li style={{cursor: "pointer", fontSize: "13px"}} onClick={(e) => onDeliveryClick(e)}>Допставка</li>
                                            <li style={{cursor: "pointer", fontSize: "13px"}} onClick={(e) => onAboutUsClick(e)}>О нас</li>
                                        </ul>
                                        <h5>Личный кабинет</h5>
                                        <ul>
                                            <li><Link href="/myAccount">Мой профиль</Link></li>
                                            <li><Link href="/orders">Мои заказы</Link></li>
                                        </ul>
                                    </div>

                                    <div className="col">
                                        <h5>Контакты</h5>
                                        <ul>
                                            <li>
                                                <Link href="tel:89938888001" style={{color: "white"}} className="link-offset-2 link-underline link-underline-opacity-0">
                                                    <FaPhone /> 8 (993) 888-80-01
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="mailto:princessspicekmv@gmail.com" style={{color: "white"}} className="link-offset-2 link-underline link-underline-opacity-0">
                                                    <FaMailBulk /> princessspicekmv@gmail.com
                                                </Link>
                                            </li>
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
