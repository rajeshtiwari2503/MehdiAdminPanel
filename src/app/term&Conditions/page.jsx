import Footer from "../components/website/Footer";
import Layout from "../components/website/HeaderLayout";

export default function Terms() {
    return (
        <div className="bg-white">
       <Layout />
      <div className="container mx-auto px-6 pb-10 ">
        <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
        <p className="mb-4">
          Welcome to SMehndi! By accessing or using our website, you agree to comply with and be bound by the following terms and conditions. Please read them carefully before using our platform or services.
        </p>
  
        <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
        <p className="mb-4">
          SMehndi provides Mehndi application services and related products through both online and offline channels. These terms govern the use of our platform, including bookings, payments, and interactions with our services.
        </p>
  
        <h2 className="text-2xl font-semibold mb-4">2. Use of Services</h2>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>
            <b>Service Bookings:</b> Customers can book Mehndi application services via our website or mobile application. Bookings must be made at least 24 hours in advance.
          </li>
          <li>
            <b>Service Availability:</b> All bookings are subject to the availability of Mehndi artists. We reserve the right to cancel or reschedule bookings if necessary.
          </li>
          <li>
            <b>Quality Assurance:</b> Our Mehndi artists are trained professionals committed to providing high-quality service.
          </li>
        </ul>
  
        <h2 className="text-2xl font-semibold mb-4">3. Orders and Payments</h2>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>
            <b>Payment Gateway:</b> All payments are processed securely through Razorpay. By using our platform, you agree to Razorpay’s terms and conditions.
          </li>
          <li>
            <b>Payment Completion:</b> Services are only confirmed upon successful payment. Partial payments or payment failures will result in incomplete bookings.
          </li>
          <li>
            <b>Refunds and Cancellations:</b>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Cancellations made 24 hours before the scheduled service time are eligible for a full refund.</li>
              <li>Refunds for cancellations made within 24 hours of the service time will be subject to a 50% deduction.</li>
              <li>No refunds will be issued after the service has been delivered.</li>
            </ul>
          </li>
          <li>
            <b>Transaction Fees:</b> Razorpay may charge additional transaction fees, which are non-refundable.
          </li>
        </ul>
  
        <h2 className="text-2xl font-semibold mb-4">4. Customer Responsibilities</h2>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>
            Ensure the service location is clean and appropriate for Mehndi application.
          </li>
          <li>
            Provide accurate information during booking, including contact details, location, and service preferences.
          </li>
          <li>
            Follow the aftercare instructions provided by the artist to ensure the best results.
          </li>
        </ul>
  
        <h2 className="text-2xl font-semibold mb-4">5. Intellectual Property</h2>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>
            All content, designs, and media available on SMehndi’s platform are the intellectual property of SMehndi and are protected by copyright laws.
          </li>
          <li>
            Reproduction, redistribution, or use of our content without written consent is prohibited.
          </li>
        </ul>
  
        <h2 className="text-2xl font-semibold mb-4">6. Liability Disclaimer</h2>
        <p className="mb-4">
          SMehndi is not liable for:
        </p>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>Allergic reactions or skin issues caused by Mehndi application.</li>
          <li>Delays or cancellations due to unforeseen circumstances, including weather conditions or artist unavailability.</li>
          <li>Losses or damages resulting from the use of our website or services.</li>
        </ul>
  
        <h2 className="text-2xl font-semibold mb-4">7. Modifications to Terms</h2>
        <p className="mb-4">
          SMehndi reserves the right to update these terms at any time. Changes will be posted on this page, and continued use of our platform indicates acceptance of the updated terms.
        </p>
  
        <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
        <p>
          For any questions or concerns regarding these terms, please contact us at:
        </p>
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li><b>Phone:</b> +91 9219252400</li>
          <li><b>Email:</b> smehndi986@gmail.com</li>
          <li><b>Address:</b> Avadhut Nagar, Basti, Uttar Pradesh, India - 272131</li>
        </ul>
      </div>
      <Footer />
      </div>
    );
  }
  