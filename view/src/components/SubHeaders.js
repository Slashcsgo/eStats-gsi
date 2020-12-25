import React from 'react'

function Live(props){
    return (
        <div className={"header-live"}>
            <p>Best of 1</p>
        </div>
    )
}
function Pause(props){
    let caption = props.side === "t"
        ? "T timeout"
        : "CT timeout"
    return (
        <div className={"header-live"}>
            <p>{caption}</p>
        </div>
    )
}
function Freeze(props){
    return (
        <div className={"header-live"}>
            <p>Freezetime</p>
        </div>
    )
}
function Over(props){
    let params = props.winner === "T"
        ? { cap: "TERRORISTS WIN", cl: "tcolor" }
        : { cap: "COUNTER-TERRORISTS WIN", cl: "ctcolor" }

    return (
        <div className={"header-over"}>
            <p className={params.cl}>{params.cap}</p>
        </div>
    )
}

export {Live, Over, Pause, Freeze};
