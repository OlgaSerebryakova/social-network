import React, { Component } from 'react';
import style from './style.module.css';
import DialogItem from './DialogItems';
import Message from './Message'
import {reduxForm, Field, InjectedFormProps} from "redux-form";
import {creatorFields, Input, Textarea} from '../../components/FormsControls/index';
import {maxLengthCreator, required} from "../../utils/validators/index";
import {dialogDataType, messageDataType, StateInitType} from "../../redux/message-reducer";
import PropsTypeDialogItem from './DialogItems'

type PropType = {
  messagePage: StateInitType,
  sendNewMessage: (newMessageText: string) => void
}

const Dialogs: React.FC<PropType> = (props) => {
  const { dialogData, messageData } = props.messagePage;

  const dialogsElements = dialogData.map( d => <DialogItem name={d.name} key={d.id} id={d.id} />  );
  const messagesElements = messageData.map( m => <Message message={m.message} key={m.id} /> );

  // renderDialog = (dialog: any) => <DialogItem name={dialog.name} id={dialog.id} key={dialog.id}/>;
  //
  // renderMessage = (message: any) => <Message message={message.message} id={message.id} key={message.id}/>;

  const addNewMessage = (values: TNewMessageValuesForm) => {
    props.sendNewMessage(values.newMessageText);
  };

    return(
      <div className={style.dialogs}>
        <div className={style.dialogsItems}>
          { dialogsElements }
        </div>
        <div className={style.messages}>
          <AddMessageFormRedux onSubmit={addNewMessage}/>
          <div>
            { messagesElements }
          </div>
        </div>
      </div>
    )
};

export default Dialogs;

const maxLength10 = maxLengthCreator(10);

type TNewMessageValuesForm = {
  newMessageText: string
}
type TNewMessageFormKeys = keyof TNewMessageValuesForm
type TProps = {}
const AddMessageForm: React.FC<InjectedFormProps<TNewMessageValuesForm, TProps> & TProps> = (props) =>{
    return(
      <form onSubmit={props.handleSubmit}>
        <div>
          {creatorFields<TNewMessageFormKeys>(Textarea, "newMessageText", "Введите текст", [required, maxLength10] )}
        </div>
        <div>
          <button>Отправить</button>
        </div>
      </form>
    )
}

const AddMessageFormRedux = reduxForm<TNewMessageValuesForm> ({form: 'AddMessageForm'})(AddMessageForm);