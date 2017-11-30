import React from 'react';
import './Navigation.css';
import Scrapebutton from './NavItems/Scrapebutton';
import { Navbar, Nav } from 'react-bootstrap';

const Navigation = (props) => {

  console.log(props)
    return(
        <Navbar className="navBar">
         <Navbar.Header >
            <Navbar.Brand className="navHeader">
              <a href='/'> Science News </a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <Scrapebutton handleScrapeClick={props.onScrapeClick} />
          </Nav>
        </Navbar>
    );
}

export default Navigation;
