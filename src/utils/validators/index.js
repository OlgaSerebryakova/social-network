export const required = value => {
  return value ? undefined : 'Поле обязательное';
};

export const maxLengthCreator = (maxlength) => (value) => {
  return value.length > maxlength ? `Максимальная длина ${maxlength} символов` : undefined;
};