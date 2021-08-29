<template lang="pug">
main.about
  h3.title 關於此 APP

  ul
    li 
      | 作者： 
      a(href="https://tales.tw" target="_blank") 
        | Tales 
        i.las.la-external-link-alt.la-lg
    li 
      | source code： 
      a(href="https://github.com/tales00/url-cleanup-app" target="_blank") 
        | https://github.com/tales00/url-cleanup-app 
        i.las.la-external-link-alt.la-lg
    li host on Netlify
    li 
      | 有一回看到網友在呼籲分享網址前先去掉追蹤碼的事情，
      | 便想來做這麼一個 PWA 練個手
    li
      | 主要是 PWA 的 share target 功能還沒試過，
      | 剛好這個題目提供了一個這樣的需求
    li
      | 期望再加上網址預覽的功能（抓取 open graph 資料），
      | 不過目前先這樣。
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
