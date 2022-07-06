export const validateEamil = (email: string) => {
  const trimEmail = email.trim()
  const emailRule =
    /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/
  const validaty = emailRule.test(trimEmail)

  return {
    validaty,
    email: trimEmail,
  }
}

export const validateUserName = (name: string) => {
  const trimName = name.trim()
  const nameRule = trimName.length >= 2
  return {
    validaty: nameRule,
    name: trimName,
  }
}
