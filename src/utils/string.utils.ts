export const variablesKeyFormatter = (value: string) => {
  return value.replace(/\s+/g, '_').toLocaleUpperCase()
}
