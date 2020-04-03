import React from "react"
import { Form, Input } from "@src/components/ui"
import { FieldLabel } from "../Modals"

const TipModalodal: React.FC<any> = () => {
  return (
    <div className="flex flex-col">
      <div className="py-2">
        <label>
          <FieldLabel title="Question:" />
          <Form.Field
            name="details.title"
            component={Input}
            placeholder={"Did you know that something something?"}
          />
        </label>
      </div>
      <div className="py-2">
        <label>
          <FieldLabel title="Description:" />
          <Form.Field
            name="details.description"
            component={Input}
            placeholder={"Well here we explain why the how…"}
          />
        </label>
      </div>
    </div>
  )
}

export default TipModalodal
