import React, { useEffect } from 'react'

const InfoMessage = ({ messages }) => {
    useEffect(() => {
        if (messages.length) {
            console.log(messages.length);

            console.log(messages);
        }

    }, [messages])

    return (
        <div>
            {messages.map((message, i) => {
                return (
                    <p key={i}>{message}</p>
                )
            })}

        </div>
    )
}

export default InfoMessage
