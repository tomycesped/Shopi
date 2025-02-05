// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
    return(
        <div className='flex flex-col items-center mt-17 bg-green-100 h-[calc(100vh-68px)]'>
            {children}
        </div>
    )
}

export default Layout;