import React from "react"
import { Form, Input } from "@src/components/ui"
import { FieldLabel } from "../Modals"

const QuestionModal: React.FC<any> = () => {
  return (
    <div className="flex flex-col">
      <label>
        <FieldLabel title="Question:" />
        <Form.Field
          name="details.title"
          component={Input}
          placeholder={"Which came first, the chicken or the egg?"}
        />
      </label>
    </div>
  )
}

export default QuestionModal
