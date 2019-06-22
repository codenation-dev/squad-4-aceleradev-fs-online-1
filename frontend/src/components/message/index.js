import React from 'react'
import { Message } from 'semantic-ui-react'

export const MessageComponent = ({classe = '', text= ''}) => <Message className={classe}>{text}</Message>

export default MessageComponent
