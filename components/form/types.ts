export interface SharedFormFieldProps {
  label: string;
  name: string;
  required: boolean;
  placeholder?: string;
}

export interface MessageFieldProps extends SharedFormFieldProps {
  _type: "messageField";
  type: "textarea";
}

export interface EmailFieldProps extends SharedFormFieldProps {
  _type: "emailField";
  type: "email";
}

export interface NameFieldProps extends SharedFormFieldProps {
  _type: "nameField";
  type: "input";
}

export interface PhoneFieldProps extends SharedFormFieldProps {
  _type: "phone";
  type: "tel";
}

export type FormFieldProps =
  | MessageFieldProps
  | EmailFieldProps
  | NameFieldProps
  | PhoneFieldProps;

export interface OptionsFormFieldProps extends SharedFormFieldProps {
  type: "select" | "radio";
  options: {
    value: string;
    label: string;
    _key: string;
  }[];
}

export interface InputFormFieldProps extends SharedFormFieldProps {
  type: "input" | "tel" | "email" | "file";
}

export interface TextareaFormFieldProps extends SharedFormFieldProps {
  type: "textarea";
}
