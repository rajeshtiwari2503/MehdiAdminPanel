import { Inter } from 'next/font/google';
import './globals.css';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'S MEHNDI',
  description: 'Explore beautiful mehndi designs and services.',
  keywords: 'mehndi, henna, designs, service, art,mahandi,mehandi,yesmehndi ,yesmehandi,mehndi designs,mehndidesigns',
  author: 'S MEHNDI',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="author" content={metadata.author} />
        <title>{metadata.title}</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
        />
        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
