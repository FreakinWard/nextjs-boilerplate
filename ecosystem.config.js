module.exports = {
  apps: [
    {
      name: 'auctions-checkout-microsite',
      script: 'npm',
      args: 'start',
      instances: 'max',
      exec_mode: 'cluster',
    },
  ],
};
