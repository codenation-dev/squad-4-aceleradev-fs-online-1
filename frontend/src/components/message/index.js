import React from 'react';
import PropTypes from 'prop-types';

import { Message } from 'semantic-ui-react';

export const MessageComponent = ({ classe = '', text = '' }) => (
  <Message className={classe}>{text}</Message>
);

MessageComponent.propTypes = {
  classe: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default MessageComponent;
