import Header from "@/components/Header"
import Footer from "@/components/Footer"

import { ReactNode } from "react";

interface LayoutProps {
    children: ReactNode;
}

const layout = ({ children }: LayoutProps) => {
    return (
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    );
};

export default layout