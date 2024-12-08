
"use client"
import { useEffect, useState } from 'react';
import Image from 'next/image';
import http_request from '../../../http-request';
import EditUserProfile from './EditProfile';
import { useRouter } from 'next/navigation';
import { ReactLoader } from '../components/common/Loading';
import Layout from '../components/website/HeaderLayout';
import Footer from '../components/website/Footer';

export default function UserProfile() {
  const [isModalVisible, setModalVisible] = useState(false);
  const router = useRouter()

  const [refresh, setRefresh] = useState("")
  const [userValue, setUserValue] = useState(null)
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUserById = async () => {
      try {
        setLoading(true)
        const storedValue = await localStorage.getItem("user");
        if (storedValue) {
          const userData = JSON.parse(storedValue);
          setUserValue(userData);
          const response = await http_request.get(`/getProfileById/${userData?.user?._id}`);
          const { data } = response;
          setUsers(data);
          setLoading(false)
        }
      } catch (err) {
        setLoading(false)
        console.error('Failed to fetch user data:', err);
      }
    };
    getUserById()
  }, [refresh]);

  const RefreshData = (data) => {
    setRefresh(data)
  }
  const userData = users?.user?.role ? (users?.user) : users?.service?.role ? (users?.service) : users?.technician?.role ? (users?.technician) : users?.dealer?.role ? (users?.dealer) : users?.brand
  const user = userData;
  // console.log(user);
  const handleLogout = async () => {
    try {
      await localStorage.removeItem('user');

      router.push("/sign-in"); // Navigate to login page after logout
    } catch (error) {
      console.log('Error clearing user data', error);
    }
  };

  return (
    <>
      <Layout />
      {loading === true ? <ReactLoader />

        : <>{user ?
          <div className="flex justify-center items-center h-screen bg-white">
            <div className="pb-10 grid grid-cols-1 md:grid-cols-2 px-10 items-center bg-white rounded-lg shadow-lg">
              {/* Header */}
              <div>
                <div className="bg-blue-600 flex items-center h-16 px-4 rounded-lg">
                  <h1 className="text-white font-bold text-lg">Profile</h1>
                </div>

                {/* Profile Info */}
                <div className="flex flex-col items-center my-4">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-blue-600">
                    <Image
                      src={user?.profilePicture || '/Logo.png'}
                      alt="Profile"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <h2 className="text-xl font-bold mt-4">{user?.name}</h2>
                  <p className="text-gray-500">{user?.email}</p>
                  <button
                    className="bg-blue-600 text-white py-2 px-4 rounded-lg mt-4"
                    onClick={() => setModalVisible(true)}
                  >
                    Edit Profile
                  </button>
                </div>

                {/* Logout Button */}
                <div className="flex justify-center mt-6">
                  <button
                    className="bg-red-500 text-white py-2 px-6 rounded-lg"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </div>

              {/* User Details */}
              <div className="mt-10 md:ml-10 md:mt-0 space-y-2 md:text-right">
                {[
                  { icon: 'Phone', text: `Phone ' :${user?.contact }`},
                  { icon: 'Phone', text: `Verified' :${user?.verification }`},
                  { icon: 'Phone', text: `Location' :${user?.address }`},
                  { icon: 'Phone', text: `Status' :${user?.status }`},
                  // { icon: 'Verified', text: user?.verification },
                  // { icon: 'Location', text: user?.address },
                  // { icon: 'Status', text: user?.status },
                  {
                    icon: 'Terms & Conditions',
                    text: user?.acceptedTerms
                      ? 'Terms & Conditions Accepted'
                      : 'Terms & Conditions Not Accepted',
                  },
                  { icon: 'code', text: `Referral Code: ${user?.referralCode}` },
                  { icon: 'person', text: `Referred By: ${user?.referredBy}` },
                  { icon: 'group', text: `Referral Count: ${user?.referralCount}` },
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <span className="material-icons text-blue-600 "> </span>
                    <p>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
            </div>
            : <div className="flex flex-col items-center justify-center p-6 bg-white h-screen">
              <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Welcome Back</h2>
                <p className="text-center text-gray-600 mb-6">
                  Please log in to access your account and explore all features.
                </p>
                <button
                  onClick={() => router.push('/sign_in')}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-300"
                >
                  Go to Sign In
                </button>
              </div>
            </div>
      
        }
          </>
      }
       {isModalVisible && (
      <EditUserProfile
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        user={user}
        RefreshData={RefreshData}
      />
    )}
          <Footer />
        </>
  );
}
