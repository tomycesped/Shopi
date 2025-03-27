import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';

const Layout = ({ children }) => {
    return (
      <div className='flex flex-col items-center mt-5 bg-gray-200 min-h-[calc(100vh-68px)] w-full'>
        <div className='w-full max-w-4xl'>
          {children}
        </div>
        {/* Footer fuera del contenedor con padding */}
        <div className="w-full"> {/* Este div actúa como contenedor ancho */}
          <footer className="bg-gray-100 py-4 mt-12">
            <div className="mx-auto max-w-4xl px-4 text-center"> {/* Mismo ancho máximo que el contenido */}
              <h3 className="text-lg font-medium mb-4">Connect with me</h3>
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
      </div>
    )
}

export default Layout;