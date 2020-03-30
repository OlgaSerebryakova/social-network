import sidebarReducer from "./sidebar-reducer";
import profileReducer from "./profile_reducer";
import messageReducer from "./message-reducer";

let store = {
  _state: {
    profilePage: {
      postData: [
        {id: 1, message: 'Hello', likeCounter: 10},
        {id: 2, message: 'Hi', likeCounter: 15},
        {id: 3, message: 'Hello', likeCounter: 10},
        {id: 4, message: 'Hi', likeCounter: 15},
      ],
      newPostText: 'text',
    },
    messagePage: {
      dialogData: [
        {id: 1, name: 'Alex'},
        {id: 2, name: 'July'},
        {id: 3, name: 'Kate'},
        {id: 4, name: 'Mary'},
        {id: 5, name: 'Jhon'},
        {id: 6, name: 'Kristoff'},
      ],
      messageData: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'Hello'},
        {id: 3, message: 'Hi'},
        {id: 4, message: 'Привет'},
      ],
      newMessageText: ''
    },
    sidebar: {}
  },

  _callSubscriber() {
    console.log('Status change')
  },

  getState() {
    return this._state;
  },

  subscribe(observer) {
    this._callSubscriber = observer
  },

  dispatch(action) {

    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.messagePage = messageReducer(this._state.messagePage, action);
    this._state.sidebar = sidebarReducer(this._state.sidebar, action);

        this._callSubscriber(this._state);
  }

};

export default store;
