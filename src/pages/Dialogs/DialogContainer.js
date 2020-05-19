import { compose } from 'redux';
import { connect } from  'react-redux';
import Dialogs from './index';
import { sendNewMessageCreator } from '../../redux/message-reducer';
import { withAuthRedirect } from "../../hoc/withAuthRedirect";

const mapStateToProps = (state) => {
  return ({
    messagePage: state.messagePage,
  })
};

const mapDispatchToProps = (dispatch) => {
  return ({
    sendNewMessage: (newMessageText) => {
      dispatch(sendNewMessageCreator(newMessageText))
    }
  })
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Dialogs);