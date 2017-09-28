export default class I18n {
  constructor() {
  }

  ngettext(singular, plural, number) {
    if (number == 1) {
      return singular
    }
    return plural
  }
}
