/**
 * Options parser for custom tag
 */
class OptionParser {

  /**
   * @typedef ParseRangeResult
   * @property {number} start - start index
   * @property {number} end - end index
   */

  /**
   * Parse range expression
   *
   * <ul>
   *  <li>ex:</li>
   *  <ul>
   *    <li>1:2 -> { start: 1, end: 2 }</li>
   *    <li>1:  -> { start: 1, end: -1 }</li>
   *    <li>2+3 -> { start: 1, end: 5 }</li>
   *  </ul>
   * </ul>
   *
   * @see https://regex101.com/r/w4KCwC/4
   *
   * @static
   * @param {string} str
   * @returns {ParseRangeResult}
   */
  static parseRange(str) {
    if (str == null) {
      return null;
    }

    // see: https://regex101.com/r/w4KCwC/4
    const match = str.match(/^(-?[0-9]+)(([:+]{1})(-?[0-9]+)?)?$/);
    if (!match) {
      return null;
    }

    // determine start
    let start;
    let end;

    // has operator
    if (match[3] != null) {
      start = +match[1];
      const operator = match[3];

      // determine end
      if (operator === ':') {
        end = +match[4] || -1; // set last(-1) if undefined
      }
      else if (operator === '+') {
        end = +match[4] || 0; // plus zero if undefined
        end += start;
      }
    }
    // don't have operator
    else {
      start = 1;
      end = +match[1];
    }

    return { start, end };
  }

}

module.exports = OptionParser;
