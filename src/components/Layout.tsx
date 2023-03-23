// components/Layout.js
import { Fragment, ReactNode } from 'react'
import { Menu, Transition } from '@headlessui/react'
import Head from 'next/head'

interface LayoutProps {
    children: ReactNode,
    pageName?: string,
    className?: string,
}

const pages = [
    {
        name: "Gear",
        href: "/gear"
    },
    {
        name: "Kits",
        href: "/kits"
    }
]

const Layout = ({ children, pageName, className}: LayoutProps) => {
    return (
        <>
            <Head>
                <title>{`gearbox${pageName ? " | " + pageName : ""}`}</title>
                <meta name="description" content="Gearbox for your gear" />
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable-0" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="flex flex-col h-screen">
                <header className="w-full sticky top-0 z-50 bg-blue shadow">
                    <div className="container-fluid mx-auto px-4 py-4 flex justify-between items-center">
                        <div className="text-xl font-semibold text-white ">
                            <a href="/">GearBox</a>
                        </div>
                        <Menu as="div" className="relative inline-block justify-center text-left">
                            {({ open }) => (
                                <>
                                    <Menu.Button className="focus:outline-none text-white">
                                        Menu
                                    </Menu.Button>
                                    <Transition
                                        show={open}
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                    >
                                        <Menu.Items
                                            static
                                            className="absolute right-0 w-32 mt-2 origin-top-right bg-light-blue divide-y divide-blue rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                        >
                                            <div className="px-1 py-1">
                                                {pages.map(({name, href}) => 
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <a
                                                                className={`${active ? 'bg-gray-100 text-gray-900' : 'text-blue'
                                                                    } group flex items-center px-2 py-2 text-sm`}
                                                                href={href}
                                                            >
                                                                {name}
                                                            </a>
                                                        )}
                                                    </Menu.Item>
                                                )}
                                            </div>
                                        </Menu.Items>
                                    </Transition>
                                </>
                            )}
                        </Menu>
                    </div>

                </header>
                <div className={`flex-1 overflow-y-auto mt-3 ml-3 mb-3 ${className}`}>
                    {children}
                </div>
            </div>
        </>
    )
}

export default Layout;