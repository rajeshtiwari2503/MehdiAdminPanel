"use client"
import React, { useEffect, useState } from 'react'
import Dashboard from '@/app/dashboard/page';
import Hero from '../website/Hero';



const HomePageCRM = () => {

    const [value, setValue] = useState("");

    useEffect(() => {
        const storedValue = localStorage.getItem("user");
        if (storedValue) {
            setValue(JSON.parse(storedValue));
        }
    }, []);

    // console.log(value);
    
    return (
        <main className="   ">

            {value?.user?.role === "ADMIN"  
                ? <Dashboard  />
                
                : <Hero />
            }
        </main>
    )
}
export default HomePageCRM