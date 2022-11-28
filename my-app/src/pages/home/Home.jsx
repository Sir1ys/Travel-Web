import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { useSelector } from "react-redux";
import slide1 from "../../images/home/home-1.jpg";
import slide2 from "../../images/home/home-2.jpg";
import slide3 from "../../images/home/home-3.jpg";
import Events from "../events/Events";
import Packages from "../packages/Packages";
import Reviews from "../reviews/Reviews";
import Modal from "../../components/modals/Modal";
import ReviewsIcon from "@mui/icons-material/Reviews";
import InstagramIcon from "@mui/icons-material/Instagram";
import "./home.scss";
import "swiper/css";
import "swiper/css/navigation";

export default function Home() {

  const isDone = useSelector(state => state.order.isDone);

  const [active, setActive] = useState(isDone);
  
  return (
    <section className="home" id="home">
      <div className="swiper home-slider">
        <Swiper
          navigation={true}
          modules={[Navigation]}
          loop={true}
          grabCursor={true}
        >
          <SwiperSlide>
            <div
              className="box"
              style={{
                background: `url(${slide1}) no-repeat`,
                boxShadow: "0 0 8px 8px #E3E6F3 inset",
              }}
            >
              <div className="content">
                <span>Make tour</span>
                <h3>amazing</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
                  doloremque sed quis odit qui nemo consequuntur magnam cum at
                  porro?
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="box box-second"
              style={{
                background: `url(${slide3}) no-repeat`,
                boxShadow: "0 0 8px 8px #eee inset",
              }}
            >
              <div className="content">
                <span>Explore the</span>
                <h3>new world</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
                  doloremque sed quis odit qui nemo consequuntur magnam cum at
                  porro?
                </p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div
              className="box"
              style={{
                background: `url(${slide2}) no-repeat`,
                boxShadow: "0 0 8px 8px #eee inset",
              }}
            >
              <div className="content">
                <span>Never Stop</span>
                <h3>exporing</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
                  doloremque sed quis odit qui nemo consequuntur magnam cum at
                  porro?
                </p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <Events readOnly />

      <Packages readOnly />

      <Reviews readOnly />

      <Modal active={active} setActive={setActive}>
        <h3>Thank you for you purchase!</h3>
        <span>You will receive information about your order on email.</span>
        <div className="content">
          <div>
            <a href={"https://www.instagram.com/oleksandr.lw/"}>
              <InstagramIcon />
              <span>Follow us!</span>
            </a>
          </div>
          <div>
            <NavLink to={"/reviews"}>
              <ReviewsIcon />
              <span>Review us!</span>
            </NavLink>
          </div>
        </div>
      </Modal>
    </section>
  );
}
