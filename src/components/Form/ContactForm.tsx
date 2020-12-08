import React from "react"

import Flex from "@components/Flex"
import Typography from "@components/Typography"
import Input from "@components/Input"

import "./_customForm.scss"

const ContactForm = props => {
  return (
    <form className="form-contact" {...props}>
      <Input
        name="Name"
        id="form-contact__name"
        variant="secondary"
        className="form-contact__input-group"
        placeholder="Name..."
      />
      <Input
        variant="secondary"
        name="Email"
        id="form-contact__email"
        type="email"
        className="form-contact__input-group"
        placeholder="Email..."
      />
      <Input
        name="Message"
        variant="secondary"
        id="form-contact__message"
        className="form-contact__input-group"
        placeholder="Message..."
      />
    </form>
  )
}

export default ContactForm
