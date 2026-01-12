import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';

const MainLayout = () => {
    return (
        <div className=' min-h-screen flex flex-col'>
            <Navbar />
           <main className={'grow w-11/12 mx-auto'}>
             <Outlet ></Outlet>
           </main>
            <Footer/>
        </div>
    );
};

export default MainLayout;