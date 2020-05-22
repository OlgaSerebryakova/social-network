import { compose } from 'redux';
import { connect } from  'react-redux';
import Dialogs from './index';
import { actions } from '../../redux/message-reducer';
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import {AppStateType} from "../../redux/redux-store";
import {ComponentType} from "react";


const mapStateToProps = (state: AppStateType) => {
  return ({
    messagePage: state.messagePage,
  })
};

export default compose<ComponentType>(
  connect(mapStateToProps, {...actions}),
  withAuthRedirect
)(Dialogs);