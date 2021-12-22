import React from 'react'
import "./Feedback.css"
import {FaUser} from 'react-icons/fa';

const feedbacks = [
    {
        userId:1,
        userName:"John Doe",
        feedback:"Your website is awesome bro! keep rocking"
    },
    {
        userId:2,
        userName:"Brad Traversy",
        feedback:"I always inspired from your website bro!"
    },
    {
        userId:3,
        userName:"Max",
        feedback:"I'm having issues with login please check it out"
    },
    {
        userId:4,
        userName:"Edureka",
        feedback:"Try to add some new features to make your website look awesome!"
    },
    
]
const Feedback = () => {
    return (
        <div className="feedbackContainer">
            <h1>User's Feedback</h1>
            <div>
                <ul className="feedback-list">
                    {
                    feedbacks.map(feedback => {
                        return <li className="feedback-item">
                            <h2><span><FaUser className="icon" /></span>&nbsp;&nbsp;<span>{feedback.userName}</span></h2>
                            <p>{feedback.feedback}</p>
                        </li>
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Feedback;
