import React, {ChangeEvent, useState} from 'react';
import style from './style.module.css'
import Loading from "../../../assets/images/loading";
import ProfileStatusWithHook from './ProfileStatusWithHooks';
import Photo from './../../../assets/images/user.jpg';
import ProfileDataForm from './ProfileDataForm';
import {creatorFields, Textarea} from "../../../components/FormsControls/index";
import {contactsType, profileType} from "../../../types/types";

type PropsType = {
  status: string,
  profile: profileType | null,
  updateStatus: (status: string) => void,
  isOwner: boolean,
  savePhoto: (file: File) => void,
  saveProfile:(profile: profileType) => Promise<any>
}

const ProfileInfo: React.FC<PropsType> = ({ status, profile, updateStatus, isOwner, savePhoto, saveProfile }) => {

  let [ editMode, setEditMode ] = useState(false);

  const onMainPhotoSelector = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      savePhoto(e.target.files[0]);
    }
  };

  const goToEditMode = () => {
    setEditMode(true)
  };

  const onSubmit = (dataForm: profileType) => {
    saveProfile(dataForm).then(
      () => {
        setEditMode(false);
      }
    )
  };

  return(
    <div>
      {!profile
      ? <Loading size={40}/>
      : <div>
          <div className={style.descriptionBlock}>
            <img className={style.profileImg} src={profile.photos.large || Photo} alt='avatar'/>
            { isOwner && <input type={"file"} onChange={onMainPhotoSelector} />}
            <ProfileStatusWithHook status={status} updateStatus={updateStatus}/>
            { editMode
              ? <ProfileDataForm  initialValues={profile} profile={profile} onSubmit={onSubmit}/>
              : <ProfileData goToEditMode={goToEditMode} profile={profile} isOwner={isOwner}/> }
          </div>
        </div>
      }
    </div>
    );
};

type ProfileDataPropsType = {
  profile: profileType,
  isOwner: boolean,
  goToEditMode: () => void
}

const ProfileData: React.FC<ProfileDataPropsType> = ({ profile, isOwner, goToEditMode }) => {
  return (
    <div>
      { isOwner && <div><button onClick={goToEditMode}>Редактировать</button></div>}

      <div><span className={style.profileDescription}>В поисках работы: </span>{profile.lookingForAJob ? 'Да' : 'Нет' }</div>
      <div><span className={style.profileDescription}>Описание: </span>{profile.lookingForAJobDescription}</div>
      <div><span className={style.profileDescription}>Имя: </span>{profile.fullName}</div>
      <div><span className={style.profileDescription}>Обо мне: </span>{profile.aboutMe}</div>
      <div><span className={style.profileDescription}>Контакты: </span>
        <div className={style.profileContacts}>
          {Object.keys(profile.contacts).map(key => {
            return <Contacts key={key} contactTitle={key} contactValue={profile.contacts[key as keyof contactsType]}/>
          }) }
        </div>
      </div>
    </div>
  )
};

type ContactsPropsType = {
  contactTitle: string,
  contactValue: string
}
const Contacts: React.FC<ContactsPropsType> = ({contactTitle, contactValue}) => {
  return (
    <div>
      <b>{contactTitle}</b>: {contactValue}
    </div>
  )
};

export default ProfileInfo;

