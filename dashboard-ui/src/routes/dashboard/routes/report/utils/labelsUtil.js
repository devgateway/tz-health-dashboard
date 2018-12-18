import {getMonthName, getQuarterLabel} from '../../../../../api'
import i18n from '../../../../../i18n'

export const getPeriodLabels = (period) => {
  const year = parseInt(period.get('y'))
  const quarter = parseInt(period.get('q'))
  const month = parseInt(period.get('m'))
  let current, currentLabel, prev, prevLabel
  if (month) {
    current = month
    prev = (month == 1)? 12: month - 1
    currentLabel = `${i18n.t(getMonthName(month))} ${year}`
    const prevYear = (current==1) ? year-1 : year
    prevLabel = `${i18n.t(getMonthName(prev))} ${prevYear}`
  } else if (quarter) {
    current = quarter
    prev = (quarter == 1) ? 4: quarter - 1
    const prevYear = (current==1) ? year-1 : year
    currentLabel = `${i18n.t(getQuarterLabel(current).start)}-${i18n.t(getQuarterLabel(current).end)} ${year}`
    prevLabel = `${i18n.t(getQuarterLabel(prev).start)}-${i18n.t(getQuarterLabel(prev).end)} ${prevYear}`
  } else {
    current = year
    prev = year - 1
    currentLabel = current;
    prevLabel = prev;
  }
  return {prevLabel, currentLabel}
}
