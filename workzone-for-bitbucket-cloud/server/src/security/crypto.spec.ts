import {decrypt, encrypt} from "./crypto"

const keyProvider = () => ["dummy-key-iYDhn6OdDNprI6Ik403pKnVakymWy0yk4="]
describe("crypto", () => {
  it("encrypts and decrypts", async () => {
    const input = "myInput"
    const encrypted = encrypt(input, keyProvider)
    const decrypted = decrypt(encrypted, keyProvider)

    assert(decrypted === input)
  })
})
