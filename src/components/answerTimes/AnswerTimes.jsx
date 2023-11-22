import React, { useEffect, useState, useRef } from 'react'
import './answerTimes.scss'

export const AnswerTimes = ({ duration, onTimeUp }) => {
    const [time, setTime] = useState(0);
    const [progressLoaded, setProgressLoaded] = useState(0);
    const intervalRef = useRef();
    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setTime((cur) => cur + 1)
        }, 1000)

        return () => clearInterval(intervalRef.current);
    }, [])

    useEffect(() => {
        setProgressLoaded(100*(counter / duration));

        if (counter === duration) {
            clearImmediate(intervalRef.current);

            setTimeout(() => {
                onTimeUp();
            }, 1000)
        }
    }, [counter])
  return (
    <>
        <div className='answer-timer-container'>
            <div
                style={{
                    width: `${progressLoaded}%`,
                    backgroundColor: `${
                        progressLoaded < 40 
                        ? 'lightgreen' 
                        : progressLoaded < 70
                        ? 'orange'
                        : 'red'
                    }`
                }}
            ></div>
            <div className='progress'>

            </div>
        </div>
    </>
  )
}
