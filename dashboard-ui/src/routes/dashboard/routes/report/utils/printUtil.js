import domtoimage from 'dom-to-image-chrome-fix'
import { generateFacilityPDF } from './facilityPDF'
import { generateWardPDF } from './wardPDF'
import { imagesToBase64 } from '../../../../../api'


const isIE=()=>{
  var ua = window.navigator.userAgent;
  var msie = ua.indexOf('MSIE') >-1;
  var trident = ua.indexOf('Trident') >-1;
  var edge = ua.indexOf('Edge') >-1;

  return msie || trident || edge
}



export const print = (reportType, state) => {

  if(isIE){
    window.print()
  }else{
  const el = document.getElementById("map1");
  var images = el.getElementsByTagName("image");

  imagesToBase64(images, (e) => {
    domtoimage.toPng(el)
      .then(function(dataUrl) {
        const image = dataUrl
        if (reportType === 'ward') {
          generateWardPDF(state, image)
        } else {
          generateFacilityPDF(state, image)
        }
      })
      .catch(function(error) {
        console.error('oops, something went wrong!', error);
      });
  })
  }
}
