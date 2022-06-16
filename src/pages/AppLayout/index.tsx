

import { Outlet } from "react-router-dom"

const AppLayout = () => {
    return (
        <div style={{backgroundColor: 'green', minHeight: '100vh'}}>
            <Outlet />
        </div>
    )
}

export default AppLayout