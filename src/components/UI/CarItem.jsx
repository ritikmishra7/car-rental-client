import React from "react";
import { Col } from "reactstrap";
import { Carousel } from 'antd';
import { useNavigate } from "react-router-dom";
import "../../styles/car-item.css";

const CarItem = (props) => {
  const navigate = useNavigate();
  const { brand, fuel, images, mileage, model, price, transmission, _id } = props.item;
  return (
    <Col lg="4" md="4" sm="6" className="mb-5">
      <div className="car__item">
        <div className="car__img">
          <Carousel autoplay>
            {images.map((image, index) => {
              return (
                <img src={image?.url} alt="" className="w-100" key={index} height={168} />
              )
            })
            }
          </Carousel>
        </div>

        <div className="car__item-content mt-4">
          <h4 className="section__title text-center">{brand} {model}</h4>
          <h6 className="rent__price text-center mt-">
            ₹{price}.00 <span>/ Day</span>
          </h6>

          <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
            <span className=" d-flex align-items-center gap-1">
              <i className="ri-car-line"></i> {fuel}
            </span>
            <span className=" d-flex align-items-center gap-1">
              <i className="ri-settings-2-line"></i> {transmission}
            </span>
            <span className=" d-flex align-items-center gap-1">
              <i className="ri-timer-flash-line"></i> {mileage}
            </span>
          </div>

          <button className=" w-50 car__item-btn car__btn-rent text-white" onClick={() => navigate(`/cars/${_id}`)}>
            Rent
          </button>

          <button className=" w-50 car__item-btn car__btn-details" onClick={() => navigate(`/cars/${_id}`)}>
            Details
          </button>
        </div>
      </div>
    </Col>
  );
};

export default CarItem;
