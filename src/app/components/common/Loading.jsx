import React, { useEffect, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';

export const ReactLoader = (props) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000000); // 10 seconds

        // Cleanup the timer if the component is unmounted
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`flex justify-center items-center ${props?.isModel===true? "w-full mt-36":"h-screen"}  `}>
            {loading ? (
                <ThreeDots
                    visible={true}
                    height="80"
                    width="80"
                    color="#5396b9"
                    radius="9"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass="flex justify-center items-center"
                />
            ) : (
                <div>Data not available</div>
            )}
        </div>
    );
};
