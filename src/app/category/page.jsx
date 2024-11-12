"use client"
import Sidenav from '@/app/components/Sidenav'
import React, { useEffect, useState } from 'react'
import http_request from '../../../http-request'
import CategoryList from './CategoryList'
 


const Category = () => {
 
    const [Categorys, setCategorys] = useState([])
    

    const [refresh, setRefresh] = useState("")

    useEffect(() => {
      getAllCategorys()
   
    }, [refresh])
  
  
    const getAllCategorys = async () => {
      let response = await http_request.get("/getAllMehndiCategory")
      let { data } = response;
  
      setCategorys(data)
    }
  
    const data = Categorys?.map((item, index) => ({ ...item, i: index + 1}));
   

    const RefreshData = (data) => {
      setRefresh(data)
    }

    

    return (
        <>
            <Sidenav>
               
                <CategoryList  data={data}RefreshData={RefreshData}/>
            </Sidenav>
        </>
    )
}

export default Category