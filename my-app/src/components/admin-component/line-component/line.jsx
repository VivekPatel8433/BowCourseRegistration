import React from "react";

const Line =({ direction="horizontal",length="100%",thickness=1,color="black",style={},offsetX=0,offsetY=0})=>{
    const isHorizontal = direction === "horizontal";
    return(
        <div
        style={{
            position: isHorizontal? 'relative' :'absolute',
            top:offsetY,
            left :offsetX,
           width:isHorizontal? length :thickness,
           height:isHorizontal? thickness :length,
           backgroundColor:color,
           ...style,
        }}
        >
        </div>
    );
};

export default  Line;