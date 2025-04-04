import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';
import logo from '../../images/logonopadding.png';
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { ShoppingCartContext } from "../../Context";
import logonegro from '../../images/logonegro.png';

const Layout = ({ children }) => {
    const context = useContext(ShoppingCartContext);
    return (
      <div className='flex flex-col min-h-screen bg-gray-200'>
        <div className='flex flex-col items-center mt-5 flex-grow w-full px-4'>
          <div className='w-full max-w-4xl'>
            {children}
          </div>
        </div>
        <footer className="bg-gray-100 pb-4 pt-6 w-full mt-6">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <div className='flex items-center justify-center space-x-2 mb-4'>
              <NavLink
                to="/Shopi/"
                onClick={() => {
                  context.setSearchByCategory();
                  context.setSearchByTitle(null);
                }}
              >
                <img src={logo} alt="Shopi logo" className="h-6" />
              </NavLink>
              <span className='text-gray-600'>by</span>
              <a 
                href="https://www.tomcesped.me" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <img src={logonegro} alt="Tom's logo" className="h-8 hover:opacity-80 transition-opacity" />
              </a>
            </div>
            
            <div className="flex justify-center space-x-6">
              <a href="https://linkedin.com/in/tomcesped" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-indigo-600">
                <FaLinkedin className="h-6 w-6" />
              </a>
              <a href="https://github.com/tomycesped" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-indigo-600">
                <FaGithub className="h-6 w-6" />
              </a>
              <a href="https://instagram.com/tomcesped" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-indigo-600">
                <FaInstagram className="h-6 w-6" />
              </a>
            </div>
            <p className="mt-4 text-sm text-gray-500">© {new Date().getFullYear()} Shopi - API created by Platzi - site created by @tomcesped</p>
          </div>
        </footer>
      </div>
    )
}

export default Layout;