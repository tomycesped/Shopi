import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';
import logo from '../../images/logo.png';

const Layout = ({ children }) => {
    return (
      <div className='flex flex-col min-h-screen bg-gray-200'>
        <div className='flex flex-col items-center mt-5 flex-grow w-full px-4'>
          <div className='w-full max-w-4xl'>
            {children}
          </div>
        </div>
        <footer className="bg-gray-100 py-4 w-full mt-6">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <img src={logo} alt="logo" className="h-13 mx-auto mb-4" />
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