import Footer from "../components/website/Footer";
import Layout from "../components/website/HeaderLayout";

export default function PrivacyPolicy() {
    return (
        <div className="bg-white">
            <Layout  />
      <div className="container mx-auto px-6 pb-10">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <p className="mb-4">
          At SMehndi, we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you use our platform and services.
        </p>
  
        <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>
            <b>Personal Information:</b> We collect your name, email address, phone number, address, and other details during booking or account creation.
          </li>
          <li>
            <b>Payment Information:</b> Payment details are securely processed by Razorpay. We do not store your payment card details.
          </li>
          <li>
            <b>Usage Data:</b> We collect data about your interactions with our platform, including pages viewed, time spent, and actions taken.
          </li>
          <li>
            <b>Device Data:</b> Information about the device you use to access our platform, such as IP address, browser type, and operating system.
          </li>
        </ul>
  
        <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>To process bookings and provide Mehndi application services.</li>
          <li>To improve the functionality and user experience of our platform.</li>
          <li>To communicate with you regarding your bookings, updates, and offers.</li>
          <li>To comply with legal obligations, such as tax and accounting requirements.</li>
        </ul>
  
        <h2 className="text-2xl font-semibold mb-4">3. Sharing Your Information</h2>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>
            <b>Payment Processors:</b> We share your payment information with Razorpay for secure transaction processing.
          </li>
          <li>
            <b>Service Providers:</b> Your information may be shared with our Mehndi artists to fulfill your bookings.
          </li>
          <li>
            <b>Legal Compliance:</b> We may share your information to comply with applicable laws or respond to valid legal requests.
          </li>
        </ul>
  
        <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
        <p className="mb-4">
          We implement robust security measures to protect your personal data. However, no system is 100% secure, and we cannot guarantee the absolute security of your information.
        </p>
  
        <h2 className="text-2xl font-semibold mb-4">5. Cookies and Tracking</h2>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>
            <b>Cookies:</b> We use cookies to enhance your experience and analyze website traffic. You can manage your cookie preferences in your browser settings.
          </li>
          <li>
            <b>Analytics:</b> We use tools like Google Analytics to understand user behavior and improve our platform.
          </li>
        </ul>
  
        <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>You have the right to access, update, or delete your personal information.</li>
          <li>
            To exercise your rights, contact us at{" "}
            <a href="mailto:smehndi986@gmail.com" className="text-blue-500 hover:underline">
              smehndi986@gmail.com
            </a>.
          </li>
        </ul>
  
        <h2 className="text-2xl font-semibold mb-4">7. Third-Party Links</h2>
        <p className="mb-4">
          Our platform may contain links to third-party websites. We are not responsible for the privacy practices or content of these websites. Please review their privacy policies before engaging with them.
        </p>
  
        <h2 className="text-2xl font-semibold mb-4">8. Updates to This Policy</h2>
        <p className="mb-4">
          We may update this Privacy Policy from time to time. Changes will be posted on this page with the updated effective date. Continued use of our platform constitutes acceptance of the revised policy.
        </p>
  
        <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
        <p className="mb-4">
          If you have any questions or concerns about this Privacy Policy, please contact us:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><b>Phone:</b> +91 9219252400</li>
          <li><b>Email:</b> <a href="mailto:smehndi986@gmail.com" className="text-blue-500 hover:underline">smehndi986@gmail.com</a></li>
          <li><b>Address:</b> Avadhut Nagar, Basti, Uttar Pradesh, India - 272131</li>
        </ul>
      </div>
      <Footer />
      </div>
    );
  }
  