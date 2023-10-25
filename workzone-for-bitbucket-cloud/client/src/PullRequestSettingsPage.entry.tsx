import {useMountEffect} from "@/useMountEffect"
import {createOrUpdate, list, remove} from "../../server/client-api"
import {ExitingPersistence, SlideIn} from "@atlaskit/motion"
import Button from "@atlaskit/button/standard-button"
import SuccessIcon from "@atlaskit/icon/glyph/check-circle"
import {G300, N300} from "@atlaskit/theme/colors"
import {token} from "@atlaskit/tokens"
import {ok} from "oazapfts"
import {AutoDismissFlag, FlagGroup} from "@atlaskit/flag"
import React, {useState} from "react"
import {
  newPullRequestSettingsEntry,
  PullRequestSettingsEntry,
  ReviewGroup,
} from "@shared/models"
import is from "@sindresorhus/is"
import ArrowRightIcon from "@atlaskit/icon/glyph/arrow-right"
import EditIcon from "@atlaskit/icon/glyph/edit"
import CrossCircleIcon from "@atlaskit/icon/glyph/cross-circle"
import {
  PullRequestSettingsEntryForm,
  toLabel,
} from "@/PullRequestSettingsEntryForm"
import {
  filter,
  fromPairs,
  isObject,
  isTruthy,
  keys,
  map,
  mapToObj,
  pipe,
} from "remeda"
import {IntlProvider} from "react-intl"
import Spinner from "@atlaskit/spinner"

// FIXME Persist - update api
// FIXME confirm button delete
// FIXME render settings
// FIXME height/scroll
// FIXME check error/notify - multi notifications / loading result
// FIXME Empty state when no configs
// FIXME loading
// FIXME move intl provider to top level app/render

function formatBranchPattern(pattern?: string) {
  return is.nonEmptyString(pattern) ? pattern : "*"
}

export function PullRequestSettingsPage(props: {
  workspace: string
  jwt: string
}) {
  const [settings, setSettings] =
    useState<Record<string, PullRequestSettingsEntry>>()

  const [isNotificationVisible, setNotificationVisible] = useState(false)

  const [selectedSetting, setSelectedSetting] =
    useState<PullRequestSettingsEntry | null>()

  const handleCancel = () => {
    setSelectedSetting(null)
  }

  const handleSave = async (setting: PullRequestSettingsEntry) => {
    const keyed = {[setting.id]: setting}
    setSettings(prevState => ({...prevState, ...keyed}))
    handleCancel()
    await createOrUpdate(props.workspace, setting.id, setting)
    setNotificationVisible(true)
  }

  useMountEffect(() => {
    ;(async () => {
      // TODO repository is not used here
      const savedSettings = await ok(list(props.workspace))

      setSettings(mapToObj(savedSettings, _ => [_.id, _]))
    })()
  })

  const handleAdd = () => {
    if (settings) {
      const id = "temp-id" + Object.keys(settings).length
      const newItem = newPullRequestSettingsEntry(id)
      setSelectedSetting(newItem)
    }
  }
  const handleRemove = async (setting: PullRequestSettingsEntry) => {
    const id = setting.id
    remove(props.workspace, id)
      .then(() => setNotificationVisible(true))
      // FIXME error
      .catch(() => setNotificationVisible(true))

    setSettings(prevState => {
      const newSettings = {...prevState}
      delete newSettings[id]

      return newSettings
    })
  }

  return (
    <div>
      <IntlProvider locale="en">
        <ExitingPersistence>
          {!selectedSetting && (
            <SlideIn enterFrom="left" fade="inout">
              {slideProps => (
                <div {...slideProps}>
                  <div css={{display: "flex", justifyContent: "space-between"}}>
                    <div>
                      Configure how pull requests are merged and reviewed using
                      Workzone.
                    </div>
                    <Button onClick={handleAdd}>Add setting</Button>
                  </div>
                  <div>
                    <table className="aui">
                      <thead>
                        <tr>
                          <th>Branch</th>
                          <th>Settings</th>
                          <th>Reviewers</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.values(settings ?? []).map(setting => {
                          const source = formatBranchPattern(setting.source)
                          const destination = formatBranchPattern(
                            setting.destination
                          )
                          return (
                            <tr key={setting.id}>
                              <td>
                                {source}&nbsp;
                                <ArrowRightIcon
                                  label="l"
                                  size="small"
                                  primaryColor={N300}
                                />
                                &nbsp;{destination}
                              </td>
                              <td>
                                <SettingSummary value={setting} />
                              </td>
                              <td>
                                <ReviewerGroupSummary
                                  value={setting.reviewSpec?.reviewGroups}
                                />
                              </td>
                              <td>
                                <Button
                                  onClick={() => setSelectedSetting(setting)}
                                  appearance="subtle"
                                  iconAfter={<EditIcon label="edit setting" />}
                                ></Button>
                                <Button
                                  onClick={() => handleRemove(setting)}
                                  appearance="subtle"
                                  iconAfter={
                                    <CrossCircleIcon label="delete setting" />
                                  }
                                ></Button>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                    <div css={{textAlign: "center", marginTop: "1.5em"}}>
                      {settings == null && <Spinner size="large" />}
                      {is.emptyObject(settings) && <h4> No settings found</h4>}
                    </div>
                  </div>
                </div>
              )}
            </SlideIn>
          )}
        </ExitingPersistence>
        {selectedSetting && (
          <EditPane
            workspace={props.workspace}
            setting={selectedSetting}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        )}
      </IntlProvider>
      <Notification
        isVisible={isNotificationVisible}
        onDismissed={() => setNotificationVisible(false)}
      />
    </div>
  )
}

function EditPane(props: {
  workspace: string
  setting: PullRequestSettingsEntry
  onCancel: () => void
  onSave: (setting: PullRequestSettingsEntry) => void
}) {
  return (
    <SlideIn enterFrom="right" fade="inout">
      {slideProps => (
        <div {...slideProps}>
          <PullRequestSettingsEntryForm
            workspace={props.workspace}
            setting={props.setting}
            onSave={props.onSave}
            onCancel={props.onCancel}
          />
        </div>
      )}
    </SlideIn>
  )
}

function Notification(props: {isVisible: boolean; onDismissed: () => void}) {
  return (
    <FlagGroup onDismissed={props.onDismissed}>
      {props.isVisible && (
        <AutoDismissFlag
          id={1}
          icon={
            <SuccessIcon
              primaryColor={token("color.iconBorder.success", G300)}
              label="Success"
              size="medium"
            />
          }
          key={1}
          title={`Configuration updated successfully`}
        />
      )}
    </FlagGroup>
  )
}

function extractEnabled<T>(object?: T, excluded: ReadonlyArray<keyof T> = []) {
  return pipe(
    Object.entries(object ?? {}),
    filter(
      ([key, value]) =>
        !isObject(value) &&
        isTruthy(value) &&
        !excluded.includes(key as keyof T)
    ),
    fromPairs,
    keys,
    map(toLabel)
  )
}

function SettingSummary({value}: {value: PullRequestSettingsEntry}) {
  const enabledSettings = [
    ...extractEnabled(value, ["id", "destination", "source"]),
    ...extractEnabled(value.standard.checks),
    ...extractEnabled(value.reviewSpec?.ignoreCommitterApprovals),
  ]

  return (
    <>
      {enabledSettings.map(enabledSetting => (
        <div css={{marginBottom: "0.25em"}} key={enabledSetting}>
          {enabledSetting}
        </div>
      ))}
    </>
  )
}

function ReviewerGroupSummary(props: {value: Array<ReviewGroup> | undefined}) {
  const groupCount = props.value?.length ?? 0

  let reviewGroupText
  switch (groupCount) {
    case 0: {
      reviewGroupText = ""
      break
    }
    case 1: {
      reviewGroupText = `${groupCount} review group`
      break
    }
    default:
      reviewGroupText = `${groupCount} review groups`
  }

  return <div>{reviewGroupText}</div>
}
