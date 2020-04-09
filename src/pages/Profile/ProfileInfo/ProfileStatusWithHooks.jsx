import React, { useState, useEffect } from 'react';

const ProfileStatusWithHook  = (props) => {

  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState(props.status);

  useEffect( () => {
    setStatus(props.status);
  }, [props.status]);

  const activateEditMode = () => {
    setEditMode(true)
  };

  const deactivateEditMode = () => {
    setEditMode(false);
    props.updateStatus(status)
  };

  const onStatusChange = (e) => {
    setStatus(e.target.value)
  };

  return(
    <div>
      {!editMode
        ? <div>
          <span onDoubleClick={activateEditMode}>{status || "-------"}</span>
        </div>
        : <div>
          <input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} value={status}/>
        </div>
      }
    </div>
  )
};

export default ProfileStatusWithHook;