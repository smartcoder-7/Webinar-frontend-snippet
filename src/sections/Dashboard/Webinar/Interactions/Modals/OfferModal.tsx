import React from "react"
import { Form, Input } from "@src/components/ui"
import { FieldLabel } from "../Modals"

const OfferModal: React.FC<any> = () => {
  return (
    <div className="flex flex-col">
      <div className="py-2">
        <label>
          <FieldLabel title="Handout title:" />
          <Form.Field
            name="details.title"
            component={Input}
            placeholder={"eg; We’re offering this item today!"}
          />
        </label>
      </div>
      <div className="py-2">
        <label>
          <FieldLabel title="Description:" />
          <Form.Field
            name="details.description"
            component={Input}
            placeholder={"eg; We’re offering this item today!"}
          />
        </label>
      </div>
      <div className="py-2">
        <label>
          <FieldLabel title="Paste link to the item on offer:" />
          <Form.Field
            name="details.offerLink"
            component={Input}
            placeholder={"http://www.link.com/download"}
          />
        </label>
      </div>
      <div className="py-2">
        <label>
          <FieldLabel title="Button text:" />
          <Form.Field
            name="details.buttonText"
            component={Input}
            placeholder={"Which came first, the chicken or the egg?"}
          />
        </label>
      </div>
    </div>
  )
}

export default OfferModal
