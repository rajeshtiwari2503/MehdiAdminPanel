"use client"
import Sidenav from '@/app/components/Sidenav'
import React, { useEffect, useState } from 'react'
import http_request from '../../../http-request'
import DesignList from './DesignList'
import Gallery from '../components/website/Gallary'
import Layout from '../components/website/HeaderLayout'
import Footer from '../components/website/Footer'



const Design = () => {

  const [designs, setDesigns] = useState([])
  const [Categorys, setCategorys] = useState([])

  const [refresh, setRefresh] = useState("")
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));

    }
    getAllDesigns()
    getAllCategorys()
  }, [refresh])



  const getAllCategorys = async () => {
    let response = await http_request.get("/getAllMehndiCategory")
    let { data } = response;

    setCategorys(data)
  }
  const getAllDesigns = async () => {
    let response = await http_request.get("/getAllMehndiDesign")
    let { data } = response;

    setDesigns(data)
  }

  const data = designs?.map((item, index) => ({ ...item, i: index + 1 }));


  const RefreshData = (data) => {
    setRefresh(data)
  }



  return (
    <>
      {user?.user?.role === "ADMIN" ? <Sidenav>

        <DesignList categories={Categorys} data={data} RefreshData={RefreshData} />
      </Sidenav>
        :
        <>
        <Layout />
        <Gallery />
        <Footer />
        </>
      }

    </>
  )
}

export default Design