import BottomTabNavigation from './BottomTab';
import Header from './Header';  // Assuming your Header component is in the same folder
 

export default function Layout({ children }) {
  return (
    <div>
      <Header />
      <main className='pb-10 bg-white' > {/* Add padding to avoid content being hidden behind the bottom tab */}
        {children}
      </main>
      <BottomTabNavigation />
    </div>
  );
}
