declare namespace AP {
  function request_access_token(
    _: unknown,
    callback: (__: unknown, {access_token: string}) => void
  )
  // Broken signature from Atlassian types?
  // see https://community.atlassian.com/t5/Confluence-questions/How-to-adjust-width-and-height-of-iframe-to-fit-with-content-in/qaq-p/279202
  function resize(): void
}
