
import React, { Children } from "react";

const Box= ({width=200,height=100,backgroundColor="lightblue",border="2px,solid,black",children,style={}})=>{

    return(

        <div
        style={{
        width,
        height,
        backgroundColor,
        border,
        display:"flex",
        alignItems :"center",
        justifyContent :"center",
        ...style,
        }}
        
        >
        {children}
        </div>
    )
}

export default  Box;