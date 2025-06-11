import type { ComponentChildren } from 'preact';
import Footer from '../components/Footer';
import Header from '../components/Header';

type Props = {
  children: ComponentChildren;
};

const Layout = ({ children }: Props) => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col'>
      <Header />
      <main className='flex-1'>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
