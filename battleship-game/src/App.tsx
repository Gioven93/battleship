import React from 'react';
import logo from './logo.svg';
import './App.css';

import { Fragment } from 'react'
import { Menu, Popover, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import Navigation from './Navigation/Navigation';
import MainComponent from './MainContainer/MainComponent';

const navigation = [
  { name: 'Github Code Repository', href: '#', current: false },
]



function App() {
  return (
    <>
      <div className="min-h-full">
       <Navigation/>
       <MainComponent/>
      </div>
    </>
  );
}

export default App;
