export default {
  getEnText(stringOrObject) {
    if (stringOrObject)
      return (stringOrObject["en"]) ? stringOrObject["en"] : stringOrObject
    else
      return stringOrObject
  }
}