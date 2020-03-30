// import React from 'react';
import { connect } from  'react-redux';
import Dialogs from './index';
import { sendNewMessageCreator, updateNewMessageTextCreator} from './../../redux/message-reducer';

const mapStateToProps = (state) => {
  return ({
    messagePage: state.messagePage
  })
};

const mapDispatchToProps = (dispatch) => {
  return ({
    updateNewMessageText: (text) => {
      dispatch(updateNewMessageTextCreator(text))
    },
    sendNewMessage: () => {
      dispatch(sendNewMessageCreator())
    }
  })
};

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;