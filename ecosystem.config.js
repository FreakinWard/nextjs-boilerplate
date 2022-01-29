module.exports = {
  apps: [
    {
      name: 'auctions-checkout-microsite',
      script: './node_modules/next/dist/bin/next',
      args: 'start -p ' + (process.env.PORT || 3000),
      watch: false,
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: false,
    },
  ],
};
