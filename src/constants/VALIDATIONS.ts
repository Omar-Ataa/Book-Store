export const EmailValidation = {
  required: "E-mail is Required",
  pattern: {
    value: /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim,
    message: "Please enter valid e-mail",
  },
};

export const PasswordValidation = {
  required: "Password is Required",
  pattern: {
    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
    message: "Please enter valid password",
  },
};
