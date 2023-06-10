import { Button, Result } from 'antd';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {

    const [reference, setReference] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const reference = urlParams.get("reference");
        setReference(reference);
    }, [])

    return (
        <Result
            status="success"
            title="Successfully Reserved Car!"
            subTitle={`Reference number: ${reference}`}
            extra={[
                <Button type="primary" key="console" onClick={() => navigate('/home')} style={{ backgroundColor: '#000d6b', color: 'white' }}>
                    Go Home
                </Button>,
            ]}
        />
    )
}

export default PaymentSuccess