import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import CarItem from "../components/UI/CarItem";
// import carData from "../assets/data/carData";
import { useEffect } from "react";
import { axiosClient } from "../config/axios";

const CarListing = () => {

  const [carData, setCarData] = useState([]);

  const fetchCarData = async () => {
    const response = await axiosClient.get('/vehicle/get-vehicles');
    setCarData(response.data.result);
  }

  const handlePriceFilter = async (event) => {
    const selectedValue = event.target.value;
    const response = await axiosClient.get(`/vehicle/get-vehicles?sort=${selectedValue}`);
    setCarData(response.data.result);
  };

  useEffect(() => {
    fetchCarData();
  }, []);

  return (
    <Helmet title="Cars">
      <CommonSection title="Car Listing" />

      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className=" d-flex align-items-center gap-3 mb-5">
                <span className=" d-flex align-items-center gap-2">
                  <i className="ri-sort-asc"></i> Sort By
                </span>

                <select onChange={handlePriceFilter}>
                  <option>Select</option>
                  <option value="low">Low to High</option>
                  <option value="high">High to Low</option>
                </select>
              </div>
            </Col>

            {carData.map((item) => (
              <CarItem item={item} key={item._id} />
            ))}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarListing;
