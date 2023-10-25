import React, {useState} from "react"
import Textfield from "@atlaskit/textfield"
import Toggle from "@atlaskit/toggle"

import {Quota} from "../../shared/models"

import {WField} from "./PullRequestSettingsEntryForm"
import {FieldHelperProps, FieldInputProps} from "formik"
import {useMountEffect} from "./useMountEffect"
import {HelperMessage} from "@atlaskit/form"

interface InvalidQuota {
  amount: string | number
  type: Quota["type"]
}
function QuotaInput({
  field,
  helpers,
}: {
  field: FieldInputProps<Quota | InvalidQuota>
  helpers: FieldHelperProps<Quota | InvalidQuota>
}) {
  const [isQuotaEnabled, setQuotaEnabled] = useState(false)

  useMountEffect(() => {
    setQuotaEnabled(field.value.amount !== 0)
  })
  const displayValue = (value: Quota | InvalidQuota) => {
    if (!isQuotaEnabled) return ""
    return value.type === "PERCENT" ? `${value.amount}%` : value.amount
  }
  let input: HTMLInputElement
  return (
    <div css={{display: "flex", alignItems: "center"}}>
      <div>
        <Textfield
          {...field}
          ref={(inputRef: HTMLInputElement) => {
            input = inputRef
          }}
          isRequired={isQuotaEnabled}
          maxLength={4}
          isDisabled={!isQuotaEnabled}
          value={displayValue(field.value)}
          onBlur={() => {
            if (field.value.amount.toString().trim() === "") {
              helpers.setValue(Quota.ZERO)
            }

            setQuotaEnabled(
              field.value.amount !== 0 &&
                field.value.amount.toString().trim() !== ""
            )
          }}
          onChange={event => {
            const {value} = event.target as HTMLInputElement
            const type = value.endsWith("%") ? "PERCENT" : "ABSOLUTE"
            const inputAmount = value.replaceAll("%", "")
            const amount =
              Number.isNaN(Number(inputAmount)) || inputAmount.trim() === ""
                ? inputAmount
                : Number(inputAmount)
            helpers.setTouched(true)
            helpers.setValue({amount, type})
          }}
        />
        <HelperMessage>
          {isQuotaEnabled
            ? "Use absolute or percentage e.g. 3 or 50%"
            : "Reviewers will not be enforced"}
        </HelperMessage>
      </div>
      <span css={{paddingLeft: ".5em"}}>
        <Toggle
          isChecked={isQuotaEnabled}
          onChange={() => {
            helpers.setValue(
              isQuotaEnabled ? Quota.ZERO : {amount: 100, type: "PERCENT"}
            )
            setQuotaEnabled(!isQuotaEnabled)
            const inputRef = input
            setTimeout(() => {
              inputRef.focus()
              inputRef.setSelectionRange(0, 3)
            })
          }}
        />
      </span>
    </div>
  )
}

function validateQuota(quota?: Quota | InvalidQuota) {
  if (typeof quota?.amount === "string" && quota.amount !== "") {
    return "Invalid quota"
  }

  switch (quota?.type) {
    case "PERCENT":
      if (quota.amount < 0 || quota.amount > 100) {
        return "Must be between 0% and 100%"
      }
      break
    case "ABSOLUTE":
      if (quota.amount < 0) {
        return "Must be a positive number"
      }
      break
    case undefined:
  }

  return
}

export function QuotaField(props: {name: string}) {
  return (
    <WField<Quota | InvalidQuota> name={props.name} validate={validateQuota}>
      {fieldProps => <QuotaInput {...fieldProps} />}
    </WField>
  )
}
