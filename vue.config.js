module.exports = {
  pwa: {
    start_url: './',
    name: 'url-cleanup',
    themeColor: '#f0f0f0',
    msTileColor: '#b6d8ec',
    display: 'portrait',
    workboxOptions: {
      // exclude: ['_redirects'],
      exclude: [/\.map$/, /_redirects/],
    },
    manifestOptions: {
      background_color: '#b6d8ec',
      share_target: {
        action: '/',
        method: 'GET',
        params: {
          text: 'text',
        },
      },
    },
  },
};
