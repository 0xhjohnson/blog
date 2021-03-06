import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { HiSun, HiMoon } from 'react-icons/hi';
import Image from 'next/image';
import classNames from 'classnames';
import {
  HiMenu,
  HiX,
  HiOutlineHome,
  HiOutlineBookOpen,
  HiOutlineUserCircle,
  HiOutlineChartBar
} from 'react-icons/hi';
import { Transition } from '@headlessui/react';
import ActiveLink from '@/components/active-link';
import MobileActiveLink from '@/components/mobile-active-link';

function NavBar() {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // After mounting, we have access to the theme
  useEffect(() => setIsMounted(true), []);

  const iconClasses = classNames(
    'flex-shrink-0',
    'h-6',
    'w-6',
    'text-gray-600'
  );

  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center border-b-2 border-gray-100 dark:border-gray-800 py-6 sm:justify-start sm:space-x-10">
          <div className="flex-1">
            {isMounted ? (
              <button
                className="bg-white dark:bg-gray-900 rounded-md p-2 inline-flex items-center justify-center text-gray-400 dark:text-gray-600 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500"
                onClick={() =>
                  setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
                }
              >
                {resolvedTheme === 'dark' ? (
                  <>
                    <span className="sr-only">Toggle light mode</span>
                    <HiSun className="h-6 w-6" />
                  </>
                ) : (
                  <>
                    <span className="sr-only">Toggle dark mode</span>
                    <HiMoon className="h-6 w-6" />
                  </>
                )}
              </button>
            ) : (
              <div className="w-6 h-6"></div>
            )}
          </div>
          <div className="-mr-2 -my-2 sm:hidden">
            <button
              className="bg-white dark:bg-gray-900 rounded-md p-2 inline-flex items-center justify-center text-gray-400 dark:text-gray-600 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500"
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open menu</span>
              <HiMenu className="h-6 w-6" />
            </button>
          </div>
          <nav className="hidden sm:flex space-x-8">
            <ActiveLink href="/">Home</ActiveLink>
            <ActiveLink href="/blog">Blog</ActiveLink>
            <ActiveLink href="/about">About</ActiveLink>
            <ActiveLink href="/stats">Stats</ActiveLink>
          </nav>
        </div>
      </div>
      {/* mobile menu */}
      <Transition
        show={isOpen}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
        className="absolute z-50 top-0 inset-x-0 p-2 transtion transform origin-top-right sm:hidden"
      >
        <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-gray-700 bg-white dark:bg-gray-900 divide-y-2 divide-gray-50">
          <div className="pt-5 pb-6 px-5">
            <div className="flex items-center justify-between">
              <Image
                src="/android-chrome-512x512.png"
                alt="0xhjohnson logo"
                width={32}
                height={32}
              />
              <div className="-mr-2">
                <button
                  className="bg-white dark:bg-gray-900 rounded-md p-2 inline-flex items-center justify-center text-gray-400 dark:text-gray-600 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500"
                  onClick={toggleMobileMenu}
                >
                  <span className="sr-only">Close menu</span>
                  <HiX className="h-6 w-6" />
                </button>
              </div>
            </div>
            <div className="mt-6">
              <nav className="grid gap-y-8">
                <MobileActiveLink
                  href="/"
                  title="Home"
                  icon={<HiOutlineHome className={iconClasses} />}
                  handleClick={toggleMobileMenu}
                />
                <MobileActiveLink
                  href="/blog"
                  title="Blog"
                  icon={<HiOutlineBookOpen className={iconClasses} />}
                  handleClick={toggleMobileMenu}
                />
                <MobileActiveLink
                  href="/about"
                  title="About"
                  icon={<HiOutlineUserCircle className={iconClasses} />}
                  handleClick={toggleMobileMenu}
                />
                <MobileActiveLink
                  href="/stats"
                  title="Stats"
                  icon={<HiOutlineChartBar className={iconClasses} />}
                  handleClick={toggleMobileMenu}
                />
              </nav>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  );
}

export default NavBar;
