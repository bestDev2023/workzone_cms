import bcrypt from "bcryptjs"

import {Credential} from "@shared/models"

const ADMINS = [
  {
    username: "izymes-admin",
    hash: "$2a$12$yvsBs8mtjH7QF8RsMbV8eeHXL4c2lfEepTBKqlp9N7oAuz6tbSwSC",
  },
] as const

export function authenticate({username, password}: Credential): boolean {
  const userHash = ADMINS.find(_ => _.username === username)?.hash
  return userHash != null && bcrypt.compareSync(password, userHash)
}
