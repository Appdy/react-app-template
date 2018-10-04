import React from "react"

const FormInput = ({input, label, type, className}) => (
  <input {...input} type={type} className={className} placeholder={label} />
)

export default FormInput
