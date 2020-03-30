import React, { Component } from 'react';
import style from './style.module.css';
import DialogItem from './DialogItems/index';
import Message from './Message/index'

export default class Dialogs extends Component {

  renderDialog = dialog => <DialogItem name={dialog.name} id={dialog.id} key={dialog.id}/>;

  renderMessage = message => <Message message={message.message} id={message.id} key={message.id}/>;

  onNewMessageChange = (e) => {
    let text = e.target.value;
    this.props.updateNewMessageText(text);
  };

  addMessage = () => {
    this.props.sendNewMessage();
  };

  render() {
    const { dialogData, messageData, newMessageText } = this.props.messagePage;

    return(
      <div className={style.dialogs}>
        <div className={style.dialogsItems}>
          {dialogData.map(this.renderDialog)}
        </div>
        <div className={style.messages}>
          <div>
            <div>
              <textarea value={newMessageText}
                        placeholder='Введите текст'
                        onChange={this.onNewMessageChange}
              />
            </div>
            <div>
              <button onClick={ this.addMessage }>Add message</button>
            </div>
          </div>
          <div>
            {messageData.map(this.renderMessage)}
          </div>
        </div>
      </div>
    )
  }
};