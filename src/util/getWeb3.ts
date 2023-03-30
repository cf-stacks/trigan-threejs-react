/* eslint-disable */
import Web3 from 'web3'
import { mobileAndTabletCheck } from './functions'
import { MetaMaskInpageProvider } from '@metamask/providers'

import SignClient from '@walletconnect/sign-client'
import { Web3Modal } from '@web3modal/standalone'
import { useEffect, useState } from 'react'

// Get projectID 
if (!process.env.NEXT_PUBLIC_PROJECT_ID) {
  throw new Error('You need to provide NEXT_PUBLIC_PROJECT_ID env variable')
}

// Configure web3Modal
const web3Modal = new Web3Modal({
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  walletConnectVersion: 2,
})

// FOR DEVELOPMENT SHOULD BE REMOVED !!!
declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider
    web3: any
  }
}

//--------------------------------------
const getWeb3 = () =>
  new Promise((resolve, reject) => {
    const callWeb3 = async () => {
      // Modern dapp browsers...
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum as any)
        try {
          // Request account access if needed
          await window.ethereum.enable()
          console.log('ETH network detected')
          // Accounts now exposed
          resolve(web3)
        } catch (error) {
          reject(error)
        }

        window.ethereum.on('accountsChanged', function (accounts: any) {
          // mobile and table already handled by WalletConnectProvider
          // so we should ignore it to avoind infinite loading
          console.log('accountsChanged: ' + mobileAndTabletCheck())

          if (!mobileAndTabletCheck()) {
            location.reload()
          }
        })

        window.ethereum.on('networkChanged', (networkId: any) => {
          // mobile and table already handled by WalletConnectProvider
          // so we should ignore it to avoind infinite loading
          console.log('networkChanged: ' + mobileAndTabletCheck())
          if (!mobileAndTabletCheck()) {
            location.reload()
          }
        })
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        // Use Mist/MetaMask's provider.
        const web3 = window.web3
        console.log('Injected web3 detected.')
        resolve(web3)
      }
      // Fallback to localhost; use dev console port by default...
      else {
        // Initialize sign client
        const signClient = await SignClient.init({
          projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
        })
        // Initiate connection and pass pairing uri to the modal
        const namespaces = {
          eip155: {
            methods: ['eth_sign'],
            chains: ['eip155:1'],
            events: ['accountsChanged'],
          },
        }
        const { uri, approval } = await signClient.connect({
          requiredNamespaces: namespaces,
        })
        if (uri) {
          await web3Modal.openModal({
            uri,
            standaloneChains: namespaces.eip155.chains,
          })
          await approval()
          web3Modal.closeModal()
        }
      }      
    }
    
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    if(document.readyState == 'complete'){
      callWeb3();
    }
    window.addEventListener('load',callWeb3);
  })

export default getWeb3
