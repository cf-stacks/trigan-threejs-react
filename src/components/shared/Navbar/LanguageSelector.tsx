import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Fragment, useState } from 'react'
import { countryLanguageCode } from './language_country_code'

const LanguageSelector = () => {
  const [isOpen, setOpen] = useState(false)
  const [flagCode, setFlagCode] = useState(
    localStorage.getItem('countryCode') || 'GB'
  )

  const setLanguage = (countryCode: string) => {
    setFlagCode(countryCode)

    localStorage.setItem('countryCode', countryCode)

    localStorage.setItem(
      'content-language',
      (countryLanguageCode as any)[countryCode].languages[0]
    )
  }

  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <img
              className="h-5 w-5"
              alt={''}
              src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${flagCode}.svg`}
            />
            <ChevronDownIcon
              className="-mr-1 ml-2 h-5 w-5 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`flex w-full items-center rounded-lg px-2 py-2 text-gray-800 ${
                      active && 'bg-gray-200'
                    }`}
                    onClick={() => setLanguage('GB')}
                  >
                    <img
                      className="mr-2 h-5 w-5"
                      alt={''}
                      src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/GB.svg`}
                    />
                    United Kingdom
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`flex w-full items-center rounded-lg px-2 py-2 text-gray-800 ${
                      active && 'bg-gray-200'
                    }`}
                    onClick={() => setLanguage('ES')}
                  >
                    <img
                      className="mr-2 h-5 w-5"
                      alt={''}
                      src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/ES.svg`}
                    />
                    Spain
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`flex w-full items-center rounded-lg px-2 py-2 text-gray-800 ${
                      active && 'bg-gray-200'
                    }`}
                    onClick={() => setLanguage('FR')}
                  >
                    <img
                      className="mr-2 h-5 w-5"
                      alt={''}
                      src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/FR.svg`}
                    />
                    France
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`flex w-full items-center rounded-lg px-2 py-2 text-gray-800 ${
                      active && 'bg-gray-200'
                    }`}
                    onClick={() => setLanguage('DE')}
                  >
                    <img
                      className="mr-2 h-5 w-5"
                      alt={''}
                      src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/DE.svg`}
                    />
                    Germany
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`flex w-full items-center rounded-lg px-2 py-2 text-gray-800 ${
                      active && 'bg-gray-200'
                    }`}
                    onClick={() => setLanguage('IT')}
                  >
                    <img
                      className="mr-2 h-5 w-5"
                      alt={''}
                      src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/IT.svg`}
                    />
                    Italy
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`flex w-full items-center rounded-lg px-2 py-2 text-gray-800 ${
                      active && 'bg-gray-200'
                    }`}
                    onClick={() => setLanguage('JP')}
                  >
                    <img
                      className="mr-2 h-5 w-5"
                      alt={''}
                      src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/JP.svg`}
                    />
                    Japan
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`flex w-full items-center rounded-lg px-2 py-2 text-gray-800 ${
                      active && 'bg-gray-200'
                    }`}
                    onClick={() => setLanguage('VN')}
                  >
                    <img
                      className="mr-2 h-5 w-5"
                      alt={''}
                      src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/VN.svg`}
                    />
                    United States
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  )
}

export default LanguageSelector
