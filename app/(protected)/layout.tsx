import { ReactNode } from "react";
import Navbar from "./_components/navbar";

const Layout = ({
    children
}: {
    children: ReactNode
}) => {
  return (
    <div className="min-h-screen bg-sky-500 w-full flex flex-col items-center justify-center p-4 gap-4">
        <Navbar />
        {children}
    </div>
  )
}

export default Layout;