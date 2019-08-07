import React from 'react'
import UserCard from './UserCard'

const UserCards = props => {
    return (
        <div>
            {props.children}
        </div>
    )
}

export default UserCards
