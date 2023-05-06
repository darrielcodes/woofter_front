import React, { useState } from "react";

const useClickHook = (getDog, initial) => {
    const [newMatch, setNewMatch] = useState({getDog});

    const onClickHandler = (e, getDog) => {

       if (e){
         setNewMatch(getDog)
       } 
        else
        {
        return false
        }
    };

    return {
        newMatch: newMatch,
        onClickHandler: onClickHandler
    }
}

export default useClickHook;