export const eventToObject = (event: any) => {
  const cleanEvent: any = {}
  Object.entries(event).forEach(([param, value]) => {
    if (param.match(/^_/)) {
      cleanEvent[param.replace(/^_+/, '')] = value
    }
  })
  return cleanEvent
}
