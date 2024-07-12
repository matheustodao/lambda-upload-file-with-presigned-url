export function response(body, statusCode = 200) {
  return {
    statusCode,
    body: body !== null ? JSON.stringify(body) : null
  }
}