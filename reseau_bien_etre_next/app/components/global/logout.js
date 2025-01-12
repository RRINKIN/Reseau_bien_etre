'use client';
import React from 'react';
import Link from 'next/link';
import RemoveCookie from '../../auth/removeCookie';

function LogoutButton() {
    const deleteCookie = () => {
        RemoveCookie();
    }

    return(
        <>
            <Link 
            href="/" 
            onClick={()=>{deleteCookie()}}  
            className="px-2 py-2 flex flex-row items-center bg-gray-100 max-w-40 text-violet-700 fill-violet-700 rounded hover:text-white hover:fill-white hover:bg-gradient-to-r from-violet-900 to-indigo-400 duration-500">
                <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M416 448h-84c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h84c17.7 0 32-14.3 32-32V160c0-17.7-14.3-32-32-32h-84c-6.6 0-12-5.4-12-12V76c0-6.6 5.4-12 12-12h84c53 0 96 43 96 96v192c0 53-43 96-96 96zm-47-201L201 79c-15-15-41-4.5-41 17v96H24c-13.3 0-24 10.7-24 24v96c0 13.3 10.7 24 24 24h136v96c0 21.5 26 32 41 17l168-168c9.3-9.4 9.3-24.6 0-34z"/></svg>
                <span className='pl-2'>Quitter</span>
            </Link>
        </>
    )
}
export default LogoutButton;