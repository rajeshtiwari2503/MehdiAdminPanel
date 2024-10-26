"use client"
import Sidenav from '@/app/components/Sidenav'
import React, { useEffect, useState } from 'react'
import http_request from '../../../http-request'
import DesignList from './DesignList'
 


const Design = () => {
 
    const [designs, setDesigns] = useState([])
    

    const [refresh, setRefresh] = useState("")

    useEffect(() => {
      getAllDesigns()
   
    }, [refresh])
  
  
    const getAllDesigns = async () => {
      let response = await http_request.get("/getAllDesign")
      let { data } = response;
  
      setDesigns(data)
    }
  
    const data = designs?.map((item, index) => ({ ...item, i: index + 1}));
   

    const RefreshData = (data) => {
      setRefresh(data)
    }

    

    return (
        <>
            <Sidenav>
               
                <DesignList  data={data}RefreshData={RefreshData}/>
            </Sidenav>
        </>
    )
}

export default Design