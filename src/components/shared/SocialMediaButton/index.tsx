import React, { useState } from 'react'
import classNames from 'classnames'
import {
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaFacebookF,
  FaPlus,
} from 'react-icons/fa'

const SocialMediaLinks = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleSocialMediaContainer = (e: any) => {
    setIsOpen(!isOpen)
  }

  function shareOnFacebook(e: any) {
    e.stopPropagation()
    const url =
      'https://www.facebook.com/sharer.php?u=' +
      encodeURIComponent(window.location.href)
    window.open(url, '_blank')
    // return false
  }

  function shareOnInstagram(e: any) {
    e.stopPropagation()
    const url =
      'https://www.instagram.com/share?url=' +
      encodeURIComponent(window.location.href)
    window.open(url, '_blank')
  }

  function shareOnTwitter(e: any) {
    e.stopPropagation()
    const url =
      'https://twitter.com/share?url=' +
      encodeURIComponent(window.location.href)
    window.open(url, '_blank')
  }

  function shareOnLinkedIn(e: any) {
    e.stopPropagation()
    const url =
      'https://www.linkedin.com/sharing/share-offsite/?url=' +
      encodeURIComponent(window.location.href)
    window.open(url, '_blank')
  }

  return (
    <div className="relative ">
      <div
        className={classNames(
          'absolute bottom-1/2 left-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-[#653394] transition-all duration-500',
          {
            'h-32 w-32': isOpen,
            '-translate-x-1/2 -translate-y-1/2 rotate-45': isOpen,
          }
        )}
        onClick={(e) => toggleSocialMediaContainer(e)}
      >
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          {/* <i className="fas fa-plus text-white"></i> */}
          <FaPlus className="text-white" />
        </div>
        <div
          className={classNames(
            'absolute right-0 top-0 flex h-12 w-12 items-center justify-center rounded-full border border-white bg-[#653394] opacity-0 transition-all duration-500 hover:cursor-pointer',
            { 'opacity-100': isOpen }
          )}
          onClick={(e) => shareOnFacebook(e)}
        >
          {/* <i className="fab fa-facebook-f text-white"></i> */}
          <FaFacebookF size={24} className="text-white" />
        </div>
        <div
          className={classNames(
            'absolute bottom-0 right-0 flex h-12 w-12 items-center justify-center rounded-full border border-white bg-[#653394] opacity-0 transition-all duration-500',
            { 'opacity-100': isOpen }
          )}
          onClick={(e) => shareOnInstagram(e)}
        >
          {/* <i className="fab fa-twitter text-white"></i> */}
          <FaInstagram size={24} className="text-white" />
        </div>
        <div
          className={classNames(
            'absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full border border-white bg-[#653394] opacity-0 transition-all duration-500',
            { 'opacity-100': isOpen }
          )}
          onClick={(e) => shareOnLinkedIn(e)}
        >
          {/* <i className="fab fa-instagram text-white"></i> */}
          <FaLinkedin size={24} className="text-white" />
        </div>
        <div
          className={classNames(
            'absolute bottom-0 left-0 flex h-12 w-12 items-center justify-center rounded-full border border-white bg-[#653394] opacity-0 transition-all duration-500',
            { 'opacity-100': isOpen }
          )}
          onClick={(e) => shareOnTwitter(e)}
        >
          {/* <i className="fab fa-linkedin-in text-white"></i> */}
          <FaTwitter size={24} className="text-white" />
        </div>
      </div>
      {/* <div
        className={classNames(
          'fixed left-0 top-0 h-full w-full transition-all duration-500'
          // { 'bg-opacity-50': isOpen }
        )}
        onClick={toggleSocialMediaContainer}
      ></div> */}
    </div>
  )
}

export default SocialMediaLinks
