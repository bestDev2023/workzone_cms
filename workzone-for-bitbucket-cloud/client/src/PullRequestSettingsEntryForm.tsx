import React, {useEffect, useState} from "react"
import {token} from "@atlaskit/tokens"
import {R400} from "@atlaskit/theme/colors"
import ButtonGroup from "@atlaskit/button/button-group"
import Button from "@atlaskit/button/standard-button"
import {Checkbox} from "@atlaskit/checkbox"
import Textfield from "@atlaskit/textfield"
import Select from "@atlaskit/select"
import {ErrorMessage, Fieldset, FormFooter, FormSection} from "@atlaskit/form"
import {RadioGroup} from "@atlaskit/radio"
import {PullRequestSettingsEntry, Quota} from "../../shared/models"
import UserPicker from "@atlaskit/user-picker"
import {getWorkspacesByWorkspaceMembers} from "../../bitbucket-api/index"
import CrossCircleIcon from "@atlaskit/icon/glyph/cross-circle"
import {getGroups} from "../../server/src/bitbucket-api/internal"
import {OptionData} from "@atlaskit/user-picker/types"
import {ok} from "oazapfts"

// TODO validate patterns with glob api
// FIXME reviewers in a tab?
// FIXME propagate settings to BB
// FIXME add UUID
// FIXME ajv-errors for improved messages
// FIXME autofocus prop not passing on?
// FIXME extract ui components
// FIXME tests for QUOTA input
// TODO validate in backend
// TODO disable tsoa validation
// TODO reviewers empty state
// TODO default values + focus when adding reviewers
// TODO usability placeholders and help info
// TODO show number of users in groups
import {JsonPointer} from "json-ptr"
import {
  FieldArray,
  FieldHelperProps,
  FieldInputProps,
  FieldMetaProps,
  Form,
  Formik,
  useField,
} from "formik"
import {sentenceCase} from "change-case"
import {css} from "@emotion/react"
import {fail} from "../../shared/fail"
import {clone, isFunction, isNumber, times} from "remeda"
import {OptionsPropType} from "@atlaskit/radio/types"
import {QuotaField} from "./QuotaField"
import {TextfieldProps} from "@atlaskit/textfield/dist/types/types"
import Ajv from "ajv"
import addFormats from "ajv-formats"
import apiSpec from "../../server/out/generated/swagger.json"
import {ErrorObject} from "ajv/lib/types/index"

function ajvErorrsToFormikErrors(ajvErrors: ErrorObject[]) {
  const data = {}

  ajvErrors.forEach(ajvError => {
    let path = ajvError.instancePath

    if (ajvError.params["missingProperty"]) {
      path += `/${ajvError.params["missingProperty"]}`
    }

    JsonPointer.set(data, path, ajvError.message, true)
  })

  console.log("data", data)

  return data
}

const filterUsers = (searchText: string) => (user: {name: string}) =>
  user.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1

const fieldCss = css({marginTop: "8px"})
const labelCss = css`
  font-size: 0.8571428571428571em;
  font-style: inherit;
  line-height: 1.3333333333333333;
  color: var(--text-lowEmphasis, #6b778c);
  font-weight: 600;
  margin-top: 16px;
  display: inline-block;
  margin-top: 0;
  margin-bottom: 4px;
`
interface WFieldComponentProps {
  label: string
  isInvalid: boolean
}
export function WField<V>(
  props: FieldProps<V> & {
    hideLabel?: boolean
    isRequired?: boolean
    children:
      | React.ReactNode
      | ((childProps: {
          field: FieldInputProps<V> & WFieldComponentProps
          meta: FieldMetaProps<V>
          helpers: FieldHelperProps<V>
        }) => React.ReactNode)
  }
) {
  const label = props.label ?? toLabel(props.name)
  const [field, meta, helpers] = useField(props)

  const fieldLabel = (
    <label id={`${props.name}-label`} css={labelCss}>
      {label}
    </label>
  )

  const isInvalid = meta.touched && meta.error != null

  const componentProps = {...field, label, isInvalid}

  const children = isFunction(props.children)
    ? props.children({field: componentProps, meta, helpers})
    : React.isValidElement(props.children)
    ? React.cloneElement(props.children, componentProps)
    : fail("Field requires a child component")

  return (
    <div css={fieldCss}>
      {!props.hideLabel && fieldLabel}
      {props.isRequired && (
        <span
          css={{paddingLeft: "2px", color: token("color.text.danger", R400)}}
        >
          *
        </span>
      )}
      {children}
      {meta.touched && meta.error ? (
        <ErrorMessage>{meta.error}</ErrorMessage>
      ) : null}
    </div>
  )
}

export function toLabel(name: string) {
  return sentenceCase(name.split(".").pop() ?? fail("Invalid name prop"))
}

type FieldProps<V> = {
  name: string
  label?: string
  type?: string
  validate?: (value: V) => string | void | Promise<string | void>
}

function CheckboxField(props: FieldProps<boolean | number>) {
  return (
    <WField {...props} hideLabel>
      {fieldProps => {
        // Infer type based on the initial value
        const isNumberValue = isNumber(fieldProps.field.value)
        const isChecked =
          fieldProps.field.value === true || fieldProps.field.value > 0
        const {value, ...otherProps} = fieldProps.field
        return (
          <Checkbox
            isChecked={isChecked}
            {...otherProps}
            onChange={event => {
              let eventValue
              if (isNumberValue) {
                eventValue = event.target.checked ? 1 : 0
              } else {
                eventValue = event.target.checked
              }
              fieldProps.helpers.setValue(eventValue)
            }}
          />
        )
      }}
    </WField>
  )
}

export function TextField(props: FieldProps<string> & TextfieldProps) {
  return (
    <WField<string> {...props}>
      <Textfield type={props.type} />
    </WField>
  )
}

function RadioField(props: FieldProps<unknown> & {options: OptionsPropType}) {
  return (
    <WField<string> {...props}>
      {fieldProps => (
        <div
          css={{
            "[role=radiogroup]": {
              display: "flex",
            },
            "[role=radiogroup] > label": {
              marginRight: "1em",
            },
          }}
        >
          <RadioGroup {...fieldProps.field} {...props} />
        </div>
      )}
    </WField>
  )
}

const ajv = new Ajv({
  strict: false,
  removeAdditional: "all",
})
addFormats(ajv)

ajv.addSchema(apiSpec, "api")

function validate(data: PullRequestSettingsEntry) {
  console.log("VALIDATING", data)

  const validator = ajv.validate(
    {
      $ref: "api#/components/schemas/PullRequestSettingsEntry",
    },
    {...data}
  )

  console.log("ERRORS", ajv.errors)

  // TODO revisit this, currently being enforced by the QuotaField instead
  const filteredErrors = ajv.errors?.filter(
    _ => _.schemaPath !== "#/components/schemas/Quota/properties/amount/type"
  )

  return ajvErorrsToFormikErrors(filteredErrors ?? [])
}

async function loadReviewers(workspace: string) {
  const members =
    (await ok(getWorkspacesByWorkspaceMembers(workspace))).values ?? []
  const groups = (await ok(getGroups(workspace))).values

  const membersOptions = members.map(
    membership =>
      ({
        id: membership.user?.uuid,
        name: membership.user?.display_name,
        avatarUrl: membership.user?.links?.avatar?.href,
        type: "user",
      } as OptionData)
  )

  const groupOptions = groups.map(
    userGroup =>
      ({
        id: userGroup.slug,
        name: userGroup.name,
        type: "group",
      } as OptionData)
  )

  return [...membersOptions, ...groupOptions]
}

export function PullRequestSettingsEntryForm(props: {
  workspace: string
  setting: PullRequestSettingsEntry
  onSave: (setting: PullRequestSettingsEntry) => void
  onCancel: () => void
}) {
  const [reviewers, setReviewers] = useState<Array<OptionData>>()
  const [filteredReviewers, setFilteredReviewers] = useState<Array<OptionData>>(
    []
  )
  useEffect(() => {
    ;(async () => {
      const loadedReviewers = await loadReviewers(props.workspace)
      setReviewers(loadedReviewers)
      setFilteredReviewers(loadedReviewers)
    })()
  }, [props.workspace])

  const handleFilterReviewers = (query?: string) => {
    if (query != null) {
      // TODO implement search highlight
      setFilteredReviewers(reviewers?.filter(filterUsers(query)) ?? [])
    }
  }

  const renderReviewerGroup = function (
    reviewerGroup: string,
    title: string,
    remove: () => void,
    index: number
  ) {
    return (
      <div key={index} css={{position: "relative", marginBottom: "2em"}}>
        <Fieldset legend={title}>
          <Button
            css={{position: "absolute", right: 0, top: ".15em"}}
            appearance="subtle"
            onClick={remove}
            iconAfter={<CrossCircleIcon label="Remove group" />}
          ></Button>
          <WField<Array<OptionData> | undefined>
            name={`${reviewerGroup}.reviewers`}
            hideLabel
          >
            {fieldProps => {
              // FIXME users are required

              const hydrated =
                reviewers == null
                  ? undefined
                  : fieldProps.field.value?.map(
                      _ =>
                        reviewers.find(r => r.id === _.id) ??
                        fail("Unable to find reviewer info")
                    )

              const isLoading =
                reviewers == null ||
                (fieldProps.field.value != null && hydrated?.length === 0)

              return (
                <UserPicker
                  isMulti
                  addMoreMessage=""
                  fieldId={null}
                  isLoading={isLoading}
                  options={filteredReviewers}
                  placeholder="Add reviewers"
                  value={hydrated}
                  onChange={value => {
                    const optionData = value as Array<OptionData>

                    // Must clone because validation will remove username, which
                    // is required for displaying it
                    const copy = optionData.map(clone)
                    fieldProps.helpers.setValue(copy)
                  }}
                  onInputChange={handleFilterReviewers}
                />
              )
            }}
          </WField>
          <CheckboxField
            name={`${reviewerGroup}.requireSuccessfulBuilds`}
            label="Add only after a successful build"
          />
          <QuotaField name={`${reviewerGroup}.quota`} />
          <TextField name={`${reviewerGroup}.filePattern`} />
          {/* TODO implement it
          <RadioField
            name={`${reviewerGroup}.approvalMethod`}
            options={[
              {
                name: `${reviewerGroup}.approvalMethod`,
                value: "STANDARD",
                label: "Standard",
              },
              {
                name: `${reviewerGroup}.approvalMethod`,
                value: "DIGITAL_SIGNATURE",
                label: "Digital signature",
              },
            ]}
          />
          */}
        </Fieldset>
      </div>
    )
  }

  return (
    <div
      css={{
        display: "flex",
        width: "525px",
        margin: "0 auto",
        flexDirection: "column",
      }}
    >
      <Formik<PullRequestSettingsEntry>
        initialValues={props.setting}
        onSubmit={values => {
          props.onSave(values)
        }}
        validate={validate}
      >
        <Form>
          <h4>Edit pull request settings</h4>
          <TextField name="source" autoFocus={true} />
          <TextField name="destination" />
          <CheckboxField name="autoMerge" />
          <CheckboxField name="deleteSourceBranch" />

          <Fieldset legend="Merge checks">
            <CheckboxField
              name="standard.checks.noChangesRequested"
              label="Check that no changes are requested"
            />
            <CheckboxField
              name="standard.checks.noUnresolvedTasks"
              label="Check for unresolved pull request tasks"
            />

            <BuildCheckbox name="standard.checks.successfulBuilds" />
          </Fieldset>

          <FormSection title="Reviewers">
            <FieldArray name="reviewSpec.reviewGroups">
              {({remove, push, form}) => {
                const {reviewSpec} = form.values
                return (
                  <>
                    {reviewSpec?.reviewGroups.map(
                      (_: unknown, index: number) => (
                        <div key={index + "key"}>
                          {
                            // TODO implement it
                            /* {index === 0 && (
                            <CheckboxField
                            name="reviewSpec.ignoreCommitterApprovals" />
                          )} */
                          }
                          {renderReviewerGroup(
                            `reviewSpec.reviewGroups[${index}]`,
                            `Group ${index + 1}`,
                            () => {
                              remove(index)
                              if (index === 0) {
                                form.setFieldValue("reviewSpec", undefined)
                              }
                            },
                            index
                          )}
                        </div>
                      )
                    )}
                    <div css={{textAlign: "center", marginTop: "1em"}}>
                      <Button
                        onClick={() => {
                          if (reviewSpec == null) {
                            form.setFieldValue("reviewSpec", {
                              ignoreCommitterApprovals: true,
                            })
                          }
                          push({
                            approvalMethod: "STANDARD",
                            quota: Quota.PCT_100,
                            requireSuccessfulBuilds: 0,
                          })
                        }}
                      >
                        Add review group
                      </Button>
                    </div>
                  </>
                )
              }}
            </FieldArray>
          </FormSection>
          <FormFooter>
            <ButtonGroup>
              <Button appearance="subtle" onClick={() => props.onCancel()}>
                Cancel
              </Button>
              <Button appearance="primary" type="submit">
                Save
              </Button>
            </ButtonGroup>
          </FormFooter>
        </Form>
      </Formik>
    </div>
  )
}

function BuildCheckbox(props: FieldProps<number>) {
  // Same number of options as Bitbucket
  const options = times(n => ({value: n + 1, label: String(n + 1)}))(19)

  return (
    <WField {...props} hideLabel>
      {fieldProps => {
        const [inputValue, setInputValue] = useState(
          // Render 1 instead of 0 when disabled
          fieldProps.field.value === 0 ? 1 : fieldProps.field.value
        )
        const buildSelect = (
          <Select
            options={options}
            css={{display: "inline-block"}}
            spacing="compact"
            onChange={option => {
              const value = option?.value ?? 0
              fieldProps.helpers.setValue(value)
              setInputValue(value)
            }}
            value={{
              value: inputValue,
              label: String(inputValue),
            }}
          />
        )

        //FIXME no build/0 check should not display check
        const labelWithSelect = (
          <span css={{margin: "-.3em .25em"}}>
            <label htmlFor={props.name}>
              Check the last commit for at least
            </label>{" "}
            {buildSelect}
            <label htmlFor={props.name}>
              {" "}
              successful build and no failed builds
            </label>
          </span>
        )

        return (
          <div css={{display: "flex"}}>
            <Checkbox
              id={props.name}
              isChecked={fieldProps.field.value !== 0}
              onChange={event => {
                if (event.target.checked) {
                  fieldProps.helpers.setValue(inputValue)
                } else {
                  fieldProps.helpers.setValue(0)
                }
              }}
            />
            {labelWithSelect}
          </div>
        )
      }}
    </WField>
  )
}
