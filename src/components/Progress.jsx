import React from 'react'

export default function Progress({ index, numQuestion, points, totalpoints, answer }) {


    console.log(points)
    return (
        <header className='progress'>
            <progress max={totalpoints} value={index + Number(answer)}></progress>
            <p>Question <strong>{index}</strong>/{numQuestion}</p>
            <p> <strong>{points}</strong>/{totalpoints}</p>
        </header>
    )
}
