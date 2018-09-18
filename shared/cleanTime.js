/**
 * function that floors a Javascript timestamp to the last 15 min.
 * @param {*} time is javascript timestamp.
 */
module.exports = (time) => {
    let dt = new Date(time);
    let minutes = Math.floor(dt.getMinutes() / 15) * 15;
    dt.setMinutes(minutes);
    dt.setSeconds(0);
    dt.setMilliseconds(0);
    return dt.getTime();
}
