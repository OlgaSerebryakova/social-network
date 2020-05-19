export type TvalidatorField = (value: string) => string | undefined

export const required: TvalidatorField = (value) => {
  return value ? undefined : 'Поле обязательное';
};

export const maxLengthCreator = (maxlength: number): TvalidatorField => (value) => {
  return value.length > maxlength ? `Максимальная длина ${maxlength} символов` : undefined;
};