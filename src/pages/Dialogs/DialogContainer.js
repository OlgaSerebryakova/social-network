import React from 'react';
import { compose } from 'redux';
import { connect } from  'react-redux';
import Dialogs from './index';
import { sendNewMessageCreator, updateNewMessageTextCreator} from './../../redux/message-reducer';
import { withAuthRedirect } from "../../hoc/withAuthRedirect";

const mapStateToProps = (state) => {
  return ({
    messagePage: state.messagePage,
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

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Dialogs);