import { css } from "@emotion/core"
import styled from "@emotion/styled"
import ApolloForm from "@src/components/ApolloForm"
import { Form, Input, Text } from "@src/components/ui"
import React, { useState } from "react"
import tw from "tailwind.macro"
import * as yup from "yup"
import { useMeQuery, useUpdateMeMutation, MeFragment, useResetPasswordMutation, UpdateUserAndTeamInput } from "@src/fromBackend/schema"
import Loading from "@src/components/Loading"
import { navigate } from "@reach/router"
import { isSubdomainAlreadyExist } from "@src/utils/validators/isSubdomainAlreadyExist"
import { isEmailAlreadyExist } from "@src/utils/validators/isEmailAlreadyExist"

const validationSchema = (user: MeFragment) => yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup
    .string()
    .email()
    .nullable()
    .test({
      name: "emailExist",
      test: async function(value) {
        if (!value || (user && user.email === value)) {
          return true
        }
        const message = `Email ${value} already registered.`
        const exist = await isEmailAlreadyExist(value)
        return exist ? this.createError({message: message, path: 'email'}) : true;
      }
    }),
  password: yup
  .string()
  .when('showPasswordField', {
    is: true,
    then: yup.string().required('Password is required'),
  }),
  passwordConfirm: yup
  .string()
  .when('showPasswordField', {
    is: true,
    then: yup
      .string()
      .oneOf([yup.ref('password'), ''], 'Passwords do not match')
      .required('Password confirm is required'),
  }),
  profileMediaUrl: yup
    .string()
    .nullable()
    .transform(v => (v === '' ? null : v)),
  team: yup.object().shape({
    name: yup.string().nullable(),
    subdomain: yup
      .string()
      .nullable()
      .matches(/^$|^[A-Za-z0-9\-]+$/, { message: "Please use numbers, letters or hyphen." })
      .test(
        "subdomainExist",
        "Subdomain already in use, choose another.",
        async (value: string) => {
          if (!value || (user && user.team && user.team.subdomain === value)) {
            return true
          }
          const exist = await isSubdomainAlreadyExist(value)
          return !exist
        }
      ),
  }),
});

export type UserEditModes = "edit" | "first-signup" | "invited-user-signup"

interface Props {
  mode: UserEditModes
}

const UserEditForm: React.FC<Props> = ({mode}) => {
  return (
    <div>
      <MainForm mode={mode} />
      <HorizontalLine />
      { mode !== 'invited-user-signup' ? <ResetPassword /> : null }
    </div>
  )
}

const MainForm: React.FC<Props> = ({mode}) => {
  let meQuery = useMeQuery();

  const [updateMe] = useUpdateMeMutation();

  if (!meQuery.data || !meQuery.data.me || !mode) {
    return <Loading/>;
  }
  const me: MeFragment = meQuery.data.me;
  
  return (
    <ApolloForm
      className={`flex flex-wrap ${mode}`}
      css={css`
        ${Form.Field} {
          ${tw`mb-4`}
        }
      `}
      defaultValues={me}
      onSubmit={async (values: UpdateUserAndTeamInput & { passwordConfirm?: string, showPasswordField?: boolean }) => {
        const data = Object.assign({}, values);
        delete data.passwordConfirm;
        delete data.showPasswordField;
        const me = await updateMe({
          variables: { data: data }
        });
        if (me && me.data && mode !== "edit") {
          navigate("/portal")
        }
      }}
      validationSchema={validationSchema(me)}
    >
      {/* Needed so team.id is included in the submit */}
      <Form.Field name="team.id" component="input" type="hidden" />

      { (mode === "first-signup" || mode === "invited-user-signup") &&
        <Form.SubmitButton
          className="ml-auto mt-4"
          containerId="navbutton">
          <span className="inline-flex items-center items-end">
            { mode === "invited-user-signup" ? "I'm ready" : "Continue" }
            <span className="ml-3 text-lg leading-none">{"➞"}</span>
          </span>
        </Form.SubmitButton> }
      { mode === "edit" &&
        <Form.SubmitButton
          containerId="navbutton"
          cleanText="Done"
          dirtyText="Save"
        /> }
      <div className="flex w-full flex-wrap">
        <div className="w-full md:w-2/5">
          <Form.Field
            name="profileMediaUrl"
            component={Input.profilePictureUpload}
          />
        </div>

        {mode !== 'invited-user-signup' &&
        <div className=" w-full md:w-2/5 md:pl-5">
          <Form.Field
            name="team.logoMediaUrl"
            component={Input.companyIconUpload}
          />
        </div>}

        {/*
        // DD: Removing this to go with the standard form submit button above

        <div className="mt-8 md:pl-8 md:w-1/5">
          <Form.SubmitButton className="h-8 p-0">
            <div className="flex">
              Done <span className="ml-8">&rarr;</span>
            </div>
          </Form.SubmitButton>
        </div>*/}
      </div>

      <div className="w-full"><HorizontalLine /></div>

      <div className="lower-container flex flex-wrap">
        <div className="left-wrapper w-full md:w-2/5 mr-5">
          <div className="left-field cus-mr-5">
            <Text className="inline-block pb-2">
              First name<span className="text-blue-3">*</span>
            </Text>
            <Form.Field
              component={Input}
              name="firstName"
              placeholder="First name"
            />
          </div>

          <div className="left-field cus-mr-5">
            <Text className="inline-block pb-2">
              Last name<span className="text-blue-3">*</span>
            </Text>
            <Form.Field
              component={Input}
              name="lastName"
              placeholder="Last name"
              // defaultValue={user.data ? user.data.lastName : ""}
            />
          </div>
          <div className="left-field">
            <Text className="inline-block pb-2">
              Email<span className="text-blue-3">*</span>
            </Text>

            <Form.Field
              className="border-gray-3"
              component={Input}
              name="email"
              placeholder="Your email"
              disabled={mode !== "edit" ? true : false}
            />
          </div>
        </div>

        { mode !== 'invited-user-signup' &&
        <div className="right-wrapper mr-5 w-full md:w-2/5">
          <div>
            <Text className="inline-block pb-2">Company name</Text>

            <Form.Field
              component={Input}
              name="team.name"
              placeholder="Your company name"
              // defaultValue={user.data ? user.data.companyName : ""}
            />
          </div>
          <div className="flex flex-col">
            <Text className="inline-block pb-2">Sub Domain</Text>
            <div
              data-placeholder=".ewebinar.com"
              css={css`
                position: relative;
                display: inline-block;
                &::after {
                  ${tw`antialiased font-hairline`}
                  position: absolute;
                  font-size:14px;
                  right: 10px;
                  top: 7px;
                  content: attr(data-placeholder);
                  pointer-events: none;
                  opacity:0.4;     
        `}
            >
              <Form.Field
                component={Input}
                name="team.subdomain"
                placeholder="mycompany"
              />
            </div>
            <div className="antialiased text-gray-3 opacity-40 text-xxs font-hairline">
              Note:Specific character's are not allowed in domain name. Please
              use numbers, letters or hyphen. Do not add www or extension like
              .com, .net, etc.{" "}
            </div>
          </div>
        </div>
        }

        { mode === 'invited-user-signup' &&
          <div className="w-full">
            <Form.Field name="showPasswordField" defaultValue={true} component="input" type="hidden" />
            <HorizontalLine />
            <div className="my-5">
              <h2 className="text-lg font-semibold">Set your password</h2>
            </div>
            <div className="w-full md:w-2/5 float-left mr-5">
              <Text className="inline-block pb-2">
                Password<span className="text-blue-3">*</span>
              </Text>
              <Form.Field
                name='password'
                type='password'
                placeholder='New password'
                component={Input}
              />
            </div>
            <div className="w-full md:w-2/5 float-left mr-5">
              <Text className="inline-block pb-2">
                Confirm password<span className="text-blue-3">*</span>
              </Text>
              <Form.Field
                name='passwordConfirm'
                type='password'
                placeholder='Confirm new password'
                component={Input}
              />
            </div>
          </div>
        }
      </div>
      <Form.ErrorMessage />
    </ApolloForm>
  )
}

const HorizontalLine = styled.hr`
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid;
  margin: 1em 0;
  padding: 0;
  ${tw`border-gray-9`}
`

const ResetPassword: React.FC<any> = () => {
  const meQuery = useMeQuery();
  const [resetPassword] = useResetPasswordMutation();
  const [requested, setRequested] = useState(false);

  if (!meQuery.data || !meQuery.data.me) {
    return <Loading query={meQuery} />;
  }

  const me = meQuery.data.me;

  return (
    <React.Fragment>
      <h2 className="text-lg mt-5 mb-2">Reset your password</h2>
      <button
        type="button"
        className={`appearence-none bg-blue-3 rounded-full font-bold text-sm text-white mb-8 px-6 py-0 px-6 leading-loose focus:outline-none focus:shadow ${
          requested ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={() => {
          resetPassword({ variables: { email: me.email }}).then(() => {
            setRequested(true)
          })
        }}
        disabled={requested}
      >
        <span>Reset</span>
      </button>
      {requested && (
        <span className="ml-3 text-blue-3 font-normal">
          We sent a link to your email to change your password.
        </span>
      )}
    </React.Fragment>
  )
}

export default UserEditForm
