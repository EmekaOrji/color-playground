var ondbltap=(b)=>{if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))return;let l=0,t;return(e)=>{let c=new Date().getTime(),d=c-l;d<500&&d>0?b(e):()=>{t=setTimeout(clearTimeout,500,t)},(l = c)}};export default ondbltap;