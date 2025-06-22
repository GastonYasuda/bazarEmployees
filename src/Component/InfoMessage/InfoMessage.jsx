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
                    <div key={i}>
                        <span key={i}>{message}</span>
                    </div>

                )
            })}

        </div>
    )
}

export default InfoMessage
