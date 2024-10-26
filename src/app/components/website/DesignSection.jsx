import React, { useEffect, useState } from 'react'
import http_request from "../../../../http-request"
const DesignSection = () => {


    const [designs, setDesigns] = useState([])
    
    useEffect(() => {
      getAllDesigns()
   
    }, [ ])
  
  
    const getAllDesigns = async () => {
      let response = await http_request.get("/getAllMehndiDesign")
      let { data } = response;
  
      setDesigns(data)
    }

  return (
    <section id="services" className="mt-12">
    <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-500 to-orange-500 mb-4">
      Our Services
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {designs?.map((item,i)=>(
         <div className="p-4 bg-white shadow-md rounded-lg">
        <h4 className="text-2xl font-bold mb-2">{item?.name}</h4>
        <p>{item?.price}</p>
      </div>
    ))}
     
    </div>
  </section>
  )
}

export default DesignSection