"use client"
import Sidenav from '@/app/components/Sidenav';
import React, { useEffect, useState } from 'react';
import http_request from '../../../http-request';
import OrdersList from './OrdersList';

const Order = () => {
    const [orderss, setOrderss] = useState([]);
    const [refresh, setRefresh] = useState("");

    useEffect(() => {
        getAllOrderss();
    }, [refresh]);

    const getAllOrderss = async () => {
        try {
            let response = await http_request.get("/getAllOrder");
            let { data } = response;
            setOrderss(data);
        }
        catch (err) {
            console.log(err);

        }
    };

    const data = orderss?.map((item, index) => ({ ...item, i: index + 1 }));

    const RefreshData = (data) => {
        setRefresh(data);
    };

    return (
        <Sidenav>
            <OrdersList data={data} RefreshData={RefreshData} />
        </Sidenav>
    );
};

export default Order;
