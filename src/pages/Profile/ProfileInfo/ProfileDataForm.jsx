import React from "react";
import style from "./style.module.css";
import {creatorFields, Input, Textarea} from './../../../components/FormsControls';
import {reduxForm} from "redux-form";


const ProfileDataForm = ({ profile, handleSubmit, error }) => {

  return (
    <form onSubmit={handleSubmit}>
      <div><button>Сохранить</button></div>
      <div>
        {error && <div className={style.formSummaryError}>{error}</div>}
      </div>

      <div>
        <span className={style.profileDescription}>Имя: </span>
        { creatorFields(Input, 'fullName', 'Имя', [] ) }
      </div>

      <div>
        <span className={style.profileDescription}>В поисках работы: </span>
        { creatorFields(Input, 'lookingForAJob', '', [], {type: 'checkbox'} ) }
      </div>

      <div>
        <span className={style.profileDescription}>Описание: </span>
        { creatorFields(Textarea, 'lookingForAJobDescription', 'Описание', [] ) }
      </div>

      <div>
        <span className={style.profileDescription}>Обо мне: </span>
        { creatorFields(Textarea, 'aboutMe', 'Обо мне', [] ) }
      </div>

      <div>
        <span className={style.profileDescription}>Контакты: </span>
        <div className={style.profileContacts}>
          {Object.keys(profile.contacts).map(key => {
            return <div key={key} >
              <b>{key}: {creatorFields(Input, 'contacts.' + key, key, [])}</b>
              </div>
          }) }
        </div>
      </div>

    </form>
  )
};

const ReduxProfileDataForm = reduxForm({ form: 'edit-profile' })(ProfileDataForm);

export default ReduxProfileDataForm;