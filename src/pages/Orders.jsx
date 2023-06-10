import React, { useState, useEffect } from 'react';
import { Table, Space, message } from 'antd';
import { axiosClient } from '../config/axios';

const columns = [
    {
        title: 'Journey Date',
        dataIndex: 'date_of_booking',
        key: 'date_of_booking',
    },
    {
        title: 'Return Date',
        dataIndex: 'date_of_return',
        key: 'date_of_return',
    },
    {
        title: 'Car Brand',
        dataIndex: 'vehicle',
        key: 'brand',
        render: (vehicle) => vehicle.brand,
    },
    {
        title: 'Car Model',
        dataIndex: 'vehicle',
        key: 'model',
        render: (vehicle) => vehicle.model,
    },
    {
        title: 'Car Images',
        dataIndex: 'vehicle',
        key: 'carImages',
        render: (vehicle) => (
            <Space size="middle">
                {vehicle?.images?.map((image, index) => (
                    <img src={image.url} alt="Car" key={index} style={{ width: '50px', height: 'auto' }} />
                ))}
            </Space>
        ),
    },
    {
        title: 'Order Reference',
        dataIndex: 'payment_id',
        key: 'payment_id',
    },
    {
        title: 'From',
        dataIndex: 'from',
        key: 'from',
    },
    {
        title: 'To',
        dataIndex: 'to',
        key: 'to',
    },
    {
        title: 'Total Price',
        dataIndex: 'total_price',
        key: 'total_price',
    },
];

const Orders = () => {

    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            const response = await axiosClient.get(`/order`);
            setOrders(response.data.result);
        } catch (error) {
            message.error(error.response.data.message);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);


    return <Table columns={columns} dataSource={orders} bordered pagination={{ 'pageSize': 5 }} />;
}

export default Orders