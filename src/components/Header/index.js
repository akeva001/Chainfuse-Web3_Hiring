import React, { useEffect, useState } from 'react';
// reactstrap components
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

import './index.scss';
function HomePage() {
  const [isConnected, setIsConnected] = useState(false);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    // Check if Metamask is installed
    if (typeof window.ethereum == 'undefined') {
      alert('No Metamask!');
    }
  }, []);

  const connectWallet = async () => {
    try {
      // Request access to the user's Metamask wallet
      const requestedAccounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccounts(requestedAccounts);
      setIsConnected(true);
    } catch (error) {
      console.error('Failed to connect to wallet:', error);
    }
  };

  const signMessage = async () => {
    if (isConnected && accounts.length > 0) {
      try {
        const message = 'Hello, Chainfuse!';
        const signature = await window.ethereum.request({
          method: 'personal_sign',
          params: [message, accounts[0]]
        });
        console.log('Signed message:', signature);
      } catch (err) {
        console.log('Error signing message:', err);
      }
    } else {
      alert('Please connect to Metamask first');
    }
  };

  return (
    <Row className="padding-32">
      <Col xs="4" className="">
        {' '}
        <img src={require('assets/img/logo.png')} />{' '}
      </Col>
      <Col xs="4" className="logo">
        <Link to="/" className="margin-12">
          HOME
        </Link>{' '}
        <span>/</span>
        <Link to="/about" className="margin-12">
          ABOUT
        </Link>{' '}
        <span>/</span>
        <Link to="/loginpage" className="margin-12">
          LOGIN
        </Link>
      </Col>
      <Col xs="4" className="logo">
        <a className="margin-12" onClick={connectWallet}>
          {isConnected ? 'Connected' : 'Connect Wallet'}
        </a>
        <button onClick={signMessage}>Sign Message</button>
      </Col>
    </Row>
  );
}

export default HomePage;
