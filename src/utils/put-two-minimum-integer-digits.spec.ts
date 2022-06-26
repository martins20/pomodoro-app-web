import { putTwoMinimumIntegerDigits as sut } from "./put-two-minimum-integer-digits"

describe("put-two-minimum-integer-digits", () => {
  it("Should return two digits before comma", () => {
    const response = sut(2)

    expect(response).toBe("02")
  })
})
