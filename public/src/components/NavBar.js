import React, { useEffect, useRef, useState } from 'react';
import { Link } from "react-router-dom";
import { FaBars } from 'react-icons/fa';
import { links } from '../assets/data/links';
import logo from '../assets/images/logo.png';

const NavBar = () => {
	const [showLinks, setShowLinks] = useState(false);
	const linksContainerRef = useRef(null);
	const linksRef = useRef(null);

	useEffect(() => {
		const linksHeight = linksRef.current.getBoundingClientRect().height;
		console.log('linkh: ', linksHeight);

		if (showLinks) {
			linksContainerRef.current.style.height = `${linksHeight}px`;
		} else {
			linksContainerRef.current.style.height = '0px';
		}

	}, [showLinks])

	return (
		<nav>
			<div className='nav-center'>
				<div className='nav-header'>
					<Link to='/'><img src={logo} alt='logo' className='logo' /></Link>
					<button className='nav-toggle' onClick={() => setShowLinks(!showLinks)}>
						<FaBars />
					</button>
				</div>
				<div className='links-container' ref={linksContainerRef}>
					<ul className='links' ref={linksRef}>
						{links.map((link) => {
							const { id, url, text } = link;
							return (
								<li key={id}>
									<Link to={url}>{text}</Link>
								</li>
							);
						})}
					</ul>
				</div>
				{/* <div>
					<button className="bg-sky-600 hover:bg-sky-700 py-2 px-5 rounded decoration-4">Login</button>
					<button>Sign up</button>
				</div> */}
			</div>
		</nav>
	);
};


export default NavBar;