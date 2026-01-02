import React from 'react'
import PremiumNavbar from '../Components/PremiumNavbar'
import Footer from '../Components/Footer'

const NotFound = () => {
    return (
        <>
            <PremiumNavbar />

            <div>
                <section className="min-h-screen flex items-center z-0 justify-center bg-gray-50 dark:bg-gray-900 py-10 px-4 sm:px-6 lg:px-6 mt-16 ">
                    <div className="max-w-md w-full space-y-8 text-center p-10 bg-white dark:bg-gray-800 rounded-xl shadow-2xl">

                        <h1 className="text-7xl font-extrabold text-indigo-600 dark:text-indigo-400">404</h1>

                        <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Uh-oh! Looks like you took a wrong turn.
                        </h2>
                        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
                            We can't find the page you requested. Don't worry, it happens to the best of us!
                        </p>

                        <div className="mt-8 space-y-4">
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Try one of these popular links to get back on track:
                            </p>

                            <ul className="list-none p-0 space-y-2">
                                <li>
                                    <a href="/" className="block w-full py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out dark:focus:ring-offset-gray-900">
                                        Go to Our Home Page
                                    </a>
                                </li>
                                <li>
                                    <a href="/fleet" className="block w-full py-3 px-4 border border-indigo-500 text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out dark:bg-gray-700 dark:text-indigo-400 dark:hover:bg-gray-600 dark:border-indigo-400">
                                        Browse Our Fleet
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="mt-10 pt-4 border-t border-gray-200 dark:border-gray-700">
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Or, use the search bar below:
                            </p>
                            <div className="flex space-x-2">
                                <input type="text" placeholder="What are you looking for?" aria-label="Search site" className="flex-grow appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" />
                                <button type="submit" className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out dark:focus:ring-offset-gray-900">
                                    Search
                                </button>
                            </div>
                        </div>

                    </div>
                </section>
            </div>

            <Footer />
        </>
    )
}

export default NotFound