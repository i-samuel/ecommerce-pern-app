import React from "react";
import Header from "../Header/Header";
import { Outlet } from "react-router-dom";

export default function Root() {
    return(
        <>  
            <header>
                <Header/>
            </header>            
            <main>
                <Outlet/>
            </main>
        </>        
    );
}