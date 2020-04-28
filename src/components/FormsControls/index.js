import React from 'react';
import styles from './style.module.css';
import { Field } from "redux-form";


export const Textarea = ({input, meta, ...props}) => {

  const showError = meta.touched && meta.error;

  return(
    <div className={styles.formControl + ' ' + (showError ? styles.error : '')}>
      <div>
        <textarea {...input} {...props} />
      </div>
      {showError && <span>{meta.error}</span>}
    </div>
  )
};

export const Input = ({input, meta, ...props}) => {

  const showError = meta.touched && meta.error;

  console.log('input: ', input);
  console.log('props: ', props);

  return(
    <div className={styles.formControl + ' ' + (showError ? styles.error : '')}>
      <div>
        <input {...input} {...props} />
      </div>
      {showError && <span>{meta.error}</span>}
    </div>
  )
};

export const creatorFields = (component, name, placeholder, validators, props, text='') => {
  return (
    <div>
      <Field component={component}
             name={name}
             placeholder={placeholder}
             validate={validators}
             {...props}/>{text}
    </div>
    )
};