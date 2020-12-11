import React from "react"

import Input from "@components/Input"
import Flex from "@components/Flex"
import TextArea from "@components/TextArea"
import Icon from "@components/Icon"
import Button from "@components/Button"

import "./_customForm.scss"

const ContactForm = props => {
  return (
    <form className="form-contact" {...props}>
      <Flex classes={['flexRow', "justifyContentBetween"]}>
        <Input
          name="Name"
          id="form-contact__name"
          variant="secondary"
          className="form-contact__input-group"
          placeholder="first name..."
        />
        <div className="form-contact__input-divider" />
        <Input
          name=" "
          id="form-contact__name"
          variant="secondary"
          className="form-contact__input-group"
          placeholder="last name..."
        />
      </Flex>
      <Input
        variant="secondary"
        name="Email"
        id="form-contact__email"
        type="email"
        className="form-contact__input-group"
        placeholder="Email..."
      />
      <TextArea
        name="Message"
        variant="secondary"
        id="form-contact__message"
        className="form-contact__textarea-group"
        placeholder="Message..."
      />
      <Button variant="secondary">
        Submit
        <Icon svg="telegram" />
      </Button>
    </form>
  )
}

export default ContactForm
