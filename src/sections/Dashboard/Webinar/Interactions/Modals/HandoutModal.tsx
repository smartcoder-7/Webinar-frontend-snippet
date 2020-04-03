import { Form, Input } from "@src/components/ui"
import React from "react"
import { FieldLabel } from "../Modals"

const HandoutModal: React.FC<any> = () => {

  return (
    <div className="flex flex-col">
              <div className="py-2">
                <label>
                  <FieldLabel title="Handout title:" />
                  <Form.Field
                    name="details.title"
                    component={Input}
                    placeholder={"✍️Top 10 productivity hacks"}
                  />
                </label>
              </div>
              <div className="py-2">
                <label>
                  <FieldLabel title="Description:" />
                  <Form.Field
                    name="details.description"
                    component={Input}
                    placeholder={
                      "This list will help you reduce time spent on unnecesary client meetings whilst boosting your code efficiency."
                    }
                  />
                </label>
              </div>
              <div className="py-2">
                <label>
                  <FieldLabel title="Paste link to the download:" />
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

export default HandoutModal
