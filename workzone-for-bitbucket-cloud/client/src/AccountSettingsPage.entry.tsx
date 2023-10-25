import Button from "@atlaskit/button/standard-button"
import React, {useState} from "react"
import {Credential} from "@shared/models"
import {Form, Formik} from "formik"
import {FormFooter} from "@atlaskit/form"
import ButtonGroup from "@atlaskit/button/button-group"

import {TextField} from "@/PullRequestSettingsEntryForm"

import {
  deleteSurrogate,
  getSurrogate,
  setSurrogate,
} from "../../server/client-api"
import {useMountEffect} from "@/useMountEffect"
import {handle} from "oazapfts"
import Spinner from "@atlaskit/spinner"

const EMPTY_CREDENTIAL = {
  username: "",
  password: "",
}

export function AccountSettingsPage(props: {workspace: string; jwt: string}) {
  console.log("AP", AP)
  const [credential, setCredential] = useState<Credential>()

  const handleOnSave = (credential: Credential) => {
    setSurrogate(props.workspace, credential)
  }
  useMountEffect(() => {
    ;(async () => {
      await handle(getSurrogate(props.workspace), {
        200(savedCredential) {
          setCredential({
            username: savedCredential,
            password: "***************",
          })
        },
        404() {
          setCredential(EMPTY_CREDENTIAL)
        },
      })
    })()
  })

  return (
    <div>
      <div>
        <div
          css={{
            display: "flex",
            width: "525px",
            margin: "0 auto",
            flexDirection: "column",
          }}
        >
          {credential == null ? (
            <div css={{textAlign: "center", marginTop: "1em"}}>
              <Spinner size="xlarge" />
            </div>
          ) : (
            <Formik<Credential>
              initialValues={credential}
              onSubmit={values => {
                handleOnSave(values)
              }}
            >
              {({resetForm}) => (
                <Form>
                  <h4>Credentials for Workzone</h4>
                  <TextField
                    autoFocus
                    name="username"
                    label="Workzone account username"
                  />
                  <TextField
                    name="password"
                    type="password"
                    label="Workzone account app-password"
                  />

                  <FormFooter>
                    <ButtonGroup>
                      <Button
                        onClick={() => {
                          deleteSurrogate(props.workspace)
                          resetForm({values: EMPTY_CREDENTIAL})
                        }}
                      >
                        Delete
                      </Button>
                      <Button appearance="primary" type="submit">
                        Save
                      </Button>
                    </ButtonGroup>
                  </FormFooter>
                </Form>
              )}
            </Formik>
          )}
        </div>
      </div>
    </div>
  )
}
