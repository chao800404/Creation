export const validateEamil = (email: string) => {
  const trimEmail = email.trim()
  const emailRule =
    /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/
  const validity = emailRule.test(trimEmail)

  return {
    validity,
    email: trimEmail,
  }
}

export const validateUserName = (name: string) => {
  console.log(name)
  const trimName = name?.trim()
  const nameRule = trimName.length >= 2
  return {
    validity: nameRule,
    name: trimName,
  }
}
