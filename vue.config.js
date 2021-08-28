module.exports = {
  pwa: {
    name: 'url-cleanup',
    themeColor: '#f0f0f0',
    msTileColor: '#b6d8ec',
    display: 'portrait',
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
