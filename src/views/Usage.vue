<template lang="pug">
main.usage
  h3.title 使用說明
  section.notice
    h4.title 目的
    ul
      li 不是縮網址，是清理網址
      li 
        | 有時看到網友分享，或者自己打算分享的網址，後面帶有像是 
        | "utm_source" 、 "fbclid" 字樣的參數，而且一長串。
        | 那些是一種「追蹤碼」
      li
        | 這個 APP 可以清除網址內某些已知的追蹤碼，
        | 讓它變得更簡短
      li 
        | 清理後的網址可直接開啟，或是再次分享出去
      
  section.step.step1
    h4.title 一般使用
    figure
      figcaption 將帶追蹤碼的網址貼到「未清理網址」的欄位
      img(src="@/assets/step/step_1-1.png"
         alt="將帶追蹤碼的網址貼到「未清理網址」的欄位")
    figure
      figcaption 得到將追蹤碼清除後的網址，並出現再分享的選項
      img(src="@/assets/step/step_1-2.png"
         alt="得到將追蹤碼清除後的網址，並出現再分享的選項")
  section.step.step2
    h4.title 安裝為 APP
    figure
      figcaption 按右上角的「安裝」即可將這個頁面安裝為 APP
      img(src="@/assets/step/step_2-1.png"
         alt="按右上角的「安裝」即可將這個頁面安裝為 APP")
      img(src="@/assets/step/step_2-2.png"
         alt="按右上角的「安裝」即可將這個頁面安裝為 APP")
    figure
      figcaption 手機可利用系統的分享功能將帶追蹤碼的網址傳給此 APP
      img(src="@/assets/step/step_2-3.png"
         alt="可利用系統的分享功能將帶追蹤碼的網址傳給此 APP")
  section.ios
    h4.title 關於 iOS 的 safari
    p
      | * 在 iOS 的 safari 上不會出現「安裝」的選項，可使用「儲存到主畫面」，
      | 但我不確定這跟 android 上的安裝會不會是同樣的意義，
      | 也不清楚能不能接收系統的分享功能。
    p
      | 因為我沒有 iOS 裝置可以測試。
  section.notice
    h4.title 備註
    ul
      li 目前能清理的網址如下：
      li "utm_source" 之類的參數
      li "fbclid"
      li amazon 商品頁的網址
      li youtube 影片網址會去掉所有除了時間戳記之外的參數
      li 
        | 這個 app 主要的價值還是在行動裝置上使用，在 PC 上建議
        | 使用瀏覽器的外掛可以更無腦的達到目的，
        | 比如說 Chrome 的 
        a(
          href="https://chrome.google.com/webstore/detail/clearurls/lckanjgmijmafbedllaakclkaicjfmnk"
          target="_blank"
        )
          | ClearURLs
          i.las.la-external-link-alt.la-lg
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Usage',
};
</script>

<style lang="scss" scoped>
.usage {
  padding: 1rem;
}
.title {
  margin-top: 0;
}

.step {
  figure {
    margin-top: 0;
    figcaption {
      font-size: 0.8rem;
    }
    img {
      display: block;
      border: 1px solid currentColor;
      margin: 0.5rem 0;
    }
  }
}
.ios {
  p {
    font-size: 0.8rem;
    margin-left: 1rem;
    margin-right: 1rem;
  }
}

.notice {
  ul {
    font-size: 0.8rem;
    padding-inline-start: 2rem;
    padding-left: 2rem;
  }
}

a {
  text-decoration: underline;
  color: hsl(220, 80%, 45%);
}
</style>
