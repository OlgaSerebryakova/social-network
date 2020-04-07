import React, { Component } from 'react';
import style from './style.module.css';
import DialogItem from './DialogItems/index';
import Message from './Message/index'
import { reduxForm, Field } from "redux-form";

export default class Dialogs extends Component {

  renderDialog = dialog => <DialogItem name={dialog.name} id={dialog.id} key={dialog.id}/>;

  renderMessage = message => <Message message={message.message} id={message.id} key={message.id}/>;

  addNewMessage = (values) => {
    this.props.sendNewMessage(values.newMessageText);
  };

  render() {
    const { dialogData, messageData } = this.props.messagePage;

    return(
      <div className={style.dialogs}>
        <div className={style.dialogsItems}>
          {dialogData.map(this.renderDialog)}
        </div>
        <div className={style.messages}>
          <AddMessageFormRedux onSubmit={this.addNewMessage}/>
          <div>
            {messageData.map(this.renderMessage)}
          </div>
        </div>
      </div>
    )
  }
};

class AddMessageForm extends Component {
  render() {
    return(
      <form onSubmit={this.props.handleSubmit}>
        <div>
          <Field component="textarea"
                 name="newMessageText"
                 placeholder="Введите текст"
                 />
        </div>
        <div>
          <button>Отправить</button>
        </div>
      </form>
    )
  }
}

const AddMessageFormRedux = reduxForm ({form: 'AddMessageForm'})(AddMessageForm);