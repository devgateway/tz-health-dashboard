import domtoimage from 'dom-to-image-chrome-fix'
import { generateFacilityPDF } from './facilityPDF'
import { generateWardPDF } from './wardPDF'
import { imagesToBase64 } from '../../../../../api'


const isIE = ()=>{
  var ua = window.navigator.userAgent;
  var msie = ua.indexOf('MSIE') >-1;
  var trident = ua.indexOf('Trident') >-1;
  var edge = ua.indexOf('Edge') >-1;

  return msie || trident || edge
}

export async function print (reportType, state) {

  if(isIE()) {
    window.print()
  } else {
    const map = document.getElementById("map1")
    var images = map.getElementsByTagName("image")
    const opdChart = document.getElementById("opd-chart")
    const rmnchChart = document.getElementById("rmnch-chart")
    const opdImage = opdChart ? await domtoimage.toPng(opdChart) : null
    const rmnchImage = rmnchChart ? await domtoimage.toPng(rmnchChart) : null
    imagesToBase64(images, (e) => {
      domtoimage.toPng(map)
        .then(function(dataMapUrl) {
          const mapImage = dataMapUrl
          if (reportType === 'ward') {
            generateWardPDF(state, mapImage, opdImage, rmnchImage)
          } else {
            generateFacilityPDF(state, mapImage, opdImage, rmnchImage)
          }
        })
        .catch(function(error) {
          console.error('oops, something went wrong!', error);
        });
    })
  }
}


export const stringWrap = (str, maxWidth) => {
  let newLineStr = "<br>"
  let retArray = []
  let done = false
  let res = ''
  const testWhite = (x) => {
    var white = new RegExp(/^\s$/);
    return white.test(x.charAt(0));
  }
  if (str.length < maxWidth) {
    return [str]
  }
  do {                    
    let found = false;
    // Inserts new line at first whitespace of the line
    for (let i = maxWidth - 1; i >= 0; i--) {
      if (testWhite(str.charAt(i))) {
        retArray.push(str.slice(0, i))
        str = str.slice(i + 1);
        found = true;
        break;
      }
    }
    // Inserts new line at maxWidth position, the word is too long to wrap
    if (!found) {
      retArray.push(str.slice(0, maxWidth))
      str = str.slice(maxWidth);
    }
    if (str.length < maxWidth) {
      done = true
    }
  } while (!done)
  retArray.push(str)
  return retArray
}