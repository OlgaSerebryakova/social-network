import React from 'react';
import styles from './style.module.css';
import {Field, WrappedFieldMetaProps} from "redux-form";
import {TvalidatorField} from "../../utils/validators";

type FormsControlType = {
  input: WrappedFieldMetaProps
  meta: WrappedFieldMetaProps
}

export const Textarea: React.FC<FormsControlType> = ({input, meta, ...props}) => {

  const showError = meta.touched && meta.error;

  return (
    <div className={styles.formControl + ' ' + (showError ? styles.error : '')}>
      <div>
        <textarea {...input} {...props} />
      </div>
      {showError && <span>{meta.error}</span>}
    </div>
  )
};

export const Input: React.FC<FormsControlType> = ({input, meta, ...props}) => {

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

export function creatorFields<FormKeysType extends string>(component: React.FC<FormsControlType>,
                              name: FormKeysType,
                              placeholder: string | undefined,
                              validators: Array<TvalidatorField>,
                              props = {}, text='') {
  return (
    <div>
      <Field component={component}
             name={name}
             placeholder={placeholder}
             validate={validators}
             {...props}/>{text}
    </div>
    )
}