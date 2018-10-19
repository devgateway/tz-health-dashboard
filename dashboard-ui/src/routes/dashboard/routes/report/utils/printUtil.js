
import domtoimage from 'dom-to-image-chrome-fix'
import {generateFacilityPDF} from './facilityPDF'
import {generateWardPDF} from './wardPDF'

export const print = (reportType, state) => {
  const el = document.getElementById("map1");
  domtoimage.toPng(el)
    .then(function (dataUrl) {
      const image = dataUrl
      if (reportType === 'ward') {
        generateWardPDF(state, image)
      } else {
        const link = document.createElement('a')
          /*link.download = `test.png`
          link.href = dataUrl
          link.click()*/
        generateFacilityPDF(state, image)  
      }      
    })
    .catch(function (error) {
        console.error('oops, something went wrong!', error);
    });
}

