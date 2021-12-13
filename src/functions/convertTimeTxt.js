/**optimized by k-gun (Kerem Güneş)
 * 
 * @param {number} time
 */
export default function convertTime(time) {

    let ret = [0];
    let ret1 = [0];
  // Do calculations if have time (also !NaN = true).
  if (time) {
    ret = [
      ~~(time % 3600 / 60)       // Seconds.
    ];
    ret1 = [
      ~~(time % 60)       // Seconds.
    ];
  }
  // Add item's paddings converting to string.
  ret = ret.map(re => `${re}`) + " min " + ret1.map(re => `${re}`) + " s";

  return ret;
}
