<template lang="pug">
main.about
  section.aboutThisApp
    h3.title 關於此 APP

    ul
      li 
        | 作者： 
        a(href="https://tales.tw" target="_blank") 
          | Tales 
          i.las.la-external-link-alt.la-lg
      li 
        | 有一回看到網友在呼籲分享網址前先去掉追蹤碼的事情，
        | 便想來做這麼一個 PWA 練個手
      li
        | 主要是 PWA 的 share target 功能還沒試過，
        | 剛好這個題目提供了一個這樣的需求
      li 使用 vuejs 製作
      li
        | 使用
        a(href="https://watercss.kognise.dev/" target="_blank") 
          | Water.css Light theme
          i.las.la-external-link-alt.la-lg
      li
        | icon 用的是 
        a(href="https://icons8.com/line-awesome" target="_blank") 
          | Line Awesome
          i.las.la-external-link-alt.la-lg
      li 
        | source code： 
        a(href="https://github.com/tales00/url-cleanup-app" target="_blank") 
          | https://github.com/tales00/url-cleanup-app 
          i.las.la-external-link-alt.la-lg
      li host on Netlify
      
  
  section.todo
    h3.title todo
    ul
      li 複製功能在火狐上似乎沒有作用
      li 加上網址預覽的功能（抓取 open graph 資料）
</template>

<script>
export default {
  name: 'About',
};
</script>

<style lang="scss" scoped>
.about {
  padding: 1rem;
}

.title {
  margin-top: 0;
}

ul {
  font-size: 0.8rem;
  padding-inline-start: 2rem;
  padding-left: 2rem;
}

a {
  text-decoration: underline;
  color: hsl(220, 80%, 45%);
}
</style>
