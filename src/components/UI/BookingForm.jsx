import React, { useEffect } from "react";
import { Button, Form, Input, message } from "antd";
import { axiosClient } from "../../config/axios";
import { useSelector } from "react-redux";


const BookingForm = ({ carDetails }) => {
  const [form] = Form.useForm();

  const userDetails = useSelector((state) => state?.userDetailsSlice?.userDetails);

  const checkForAvailability = async (date1, date2) => {
    try {
      const { data } = await axiosClient.post('/vehicle/check-availability', {
        vehicle_id: carDetails._id,
        date_of_booking: date1,
        date_of_return: date2,
      });

      return data.result;
    } catch (e) {
      return {
        available: false,
        message: 'Something went wrong',
      }
    }
  }


  const handlePayment = async (values) => {

    const { date_of_booking, date_of_return } = values;
    const date1 = new Date(date_of_booking);
    const date2 = new Date(date_of_return);

    const currDate = new Date();
    if (date1 < currDate || date2 < currDate) {
      message.error('Date can\'t be in the past');
      return;
    }
    if (date1 > date2) {
      message.error('Return date can\'t be before pickup date');
      return;
    }

    const status = await checkForAvailability(date1, date2);
    console.log("status haiiii:", status);
    if (status.available === false) {
      message.error(status.message);
      return;
    }
    const daysBetween = Number(Math.ceil((date2 - date1) / (1000 * 60 * 60 * 24)) + 1);
    const total_price = daysBetween * carDetails.price;

    const { data } = await axiosClient.post('/payment/create-order', {
      amount: total_price,
      vehicle_id: carDetails._id,
      date_of_booking,
      date_of_return,
      total_price,
      license_number: values.license_number,
      from: values.from,
      to: values.to,
      price: carDetails.price,
    });

    const id = data.result.id;
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      amount: carDetails.price * 100,
      currency: "INR",
      name: "Car Rental",
      description: "Car Rental Payment",
      image: carDetails.images[0].url,
      order_id: id,
      callback_url: "http://localhost:5000/api/payment/payment-verification",
      prefill: {
        name: `${userDetails.first_name} ${userDetails.last_name}`,
        email: userDetails.email,
        contact: userDetails.phone,
      },
      theme: {
        color: "#000d6b",
      }
    };

    const razor = new window.Razorpay(options);
    razor.open();
  }



  useEffect(() => {

    return () => {
      form.resetFields();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Form
      form={form}
      layout="vertical"
      name="booking-form"
      initialValues={{ remember: true }}
      onFinish={handlePayment}
    >
      <Form.Item
        label="Journey Date"
        name="date_of_booking"
        rules={[{ required: true, message: "Please input your pickup date!" }]}
      >
        <Input type="date" className="form-control" />
      </Form.Item>
      <Form.Item
        label="Return Date"
        name="date_of_return"
        rules={[{ required: true, message: "Please input your return date!" }]}
      >
        <Input type="date" className="form-control" />
      </Form.Item>
      <Form.Item
        label="License Number"
        name="license_number"
        rules={[{ required: true, message: "Please input your license number!" }]}
      >
        <Input type="text" className="form-control" />
      </Form.Item>
      <Form.Item
        label="From"
        name="from"
        rules={[{ required: true, message: "Please input your pickup location!" }]}
      >
        <Input type="text" className="form-control" />
      </Form.Item>
      <Form.Item
        label="To"
        name="to"
        rules={[{ required: true, message: "Please input your drop location!" }]}
      >
        <Input type="text" className="form-control" />
      </Form.Item>
      <Form.Item
        label="Pickup Time"
        name="pickup_time"
        rules={[{ required: true, message: "Please input your pickup time!" }]}
      >
        <Input type="time" className="form-control" />
      </Form.Item>
      <div className="payment text-start mt-5">
        <Button type="button" htmlType="submit" style={{ backgroundColor: '#000d6b', color: 'white' }}>Pay and Reserve Now</Button>
      </div>
    </Form>
  );
};

export default BookingForm;
