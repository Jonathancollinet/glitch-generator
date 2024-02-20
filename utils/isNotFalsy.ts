export default (value: any) => {
  return value !== null && value !== undefined && value !== '' && !Number.isNaN(value)
}
