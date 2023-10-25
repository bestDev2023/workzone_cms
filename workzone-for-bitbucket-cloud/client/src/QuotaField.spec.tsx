import {render} from "./test/render"
import {QuotaField} from "./QuotaField"
import {
  Field,
  FieldArray,
  FieldHelperProps,
  FieldInputProps,
  FieldMetaProps,
  Form,
  Formik,
  useField,
} from "formik"
import {Quota} from "../../shared/models"
describe("<QuotaField>", () => {
  it("no check results", async () => {
    render(
      <Formik initialValues={{quota: Quota.ZERO}} onSubmit={console.log}>
        <form>
          <QuotaField name="quota" />
        </form>
      </Formik>
    )
  })
})
