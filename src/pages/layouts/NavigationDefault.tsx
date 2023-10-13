// import React from 'react'
import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Disclosure } from '@headlessui/react'
import { HiBars3CenterLeft, HiXMark  } from "react-icons/hi2";
import Logo from '/vite.svg'
// import AxiosConfig from '../../AxiosConfig';
import Cookies from 'universal-cookie';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

const Navbar = () => {
    const cookies = new Cookies();
    const token = cookies.get('Authorization')
    // const { axios, setAuthToken } = Axios

    const [navigation, setNavigation] = useState([
        { name: 'HomePage', href: '/', current: false },
        { name: 'Dashboard', href: '/cms/dashboard', current: false },
        { name: 'Posts', href: '/cms/posts', current: false },
        { name: 'Users', href: '/cms/users', current: false },
        token
            ? { name: 'Logout', href: '/cms/logout', current: false }
            : { name: 'Login', href: '/login', current: false },
      ]);

    //   if (!token) {
    //     navigation.push({ name: 'Login', href: '/login', current: false });
    //   } else {
    //     navigation.push({ name: 'Logout', href: '/logout', current: false });
    //   }
      
      function changeActiveNavigation(index: number) {
        if (navigation[index].current === false) {
            const newNavigation = [...navigation];
            newNavigation.forEach((item, i) => {
              item.current = i === index;
            });
            setNavigation(newNavigation);
          }
      }
    
    //   Active Navigation on Load
      useEffect(() => {
        const pathname = window.location.pathname;
        // Set PrevNavigation agar tidak render terus menerus (Error Maximum Render)
        setNavigation((prevNavigation) => {
            const newNavigation = [...prevNavigation];
            newNavigation.forEach((item) => {
            item.current = item.href === pathname;
            });
            
            return newNavigation;
        });
      }, []);



    const [color, setColor] = useState('white');
    const listenScrollEvent = () => {
        if (window.scrollY > 75) {
            setColor('bg-gray-950 scale-100');
        } else {
            setColor('bg-gray-800 scale-105');
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', listenScrollEvent);
        return () => window.removeEventListener('scroll', listenScrollEvent);
    }, []);
        
    return(
        <Disclosure as="nav" className={`fixed top-0 z-10 w-full bg-gray-950 transition ease-in-out duration-500 delay-150 ${color}`}>
            {({ open }) => (
                <>
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* Mobile menu button*/}
                        <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                            <HiXMark className="block h-6 w-6" aria-hidden="true" />
                        ) : (
                            <HiBars3CenterLeft className="block h-6 w-6" aria-hidden="true" />
                        )}
                        </Disclosure.Button>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-between">
                        <div className="flex flex-shrink-0 items-center">
                            <img
                                className="h-8 w-auto"
                                src={Logo}
                                alt="OS"
                            />

                            <span className="text-xl ml-2 text-white">Base App React+Laravel</span>
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                {navigation.map((item, index) => (
                                    <NavLink
                                        // exact
                                        // key={item.name}
                                        key={index}
                                        to={item.href}
                                        className={classNames(
                                        item.current ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'rounded-md px-3 py-2 text-sm font-medium'
                                        )}
                                        onClick={() => changeActiveNavigation(index)}
                                    >
                                        {item.name}
                                    </NavLink>
                                    ))}
                            </div>
                        </div>
                    </div>
                    </div>
                </div>

                <Disclosure.Panel className="sm:hidden">
                    <div className="space-y-1 px-2 pb-3 pt-2">
                    {navigation.map((item) => (
                        <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className={classNames(
                            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'block rounded-md px-3 py-2 text-base font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                        >
                        {item.name}
                        </Disclosure.Button>
                    ))}
                    </div>
                </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}

export default Navbar