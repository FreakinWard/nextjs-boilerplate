module.exports = {
  apps: [
    {
      name: 'nextjs-boilerplate',
      // script: 'start',
      script: './node_modules/next/dist/bin/next',
      args: 'start:prod -p ' + (process.env.PORT || 3000),
      watch: false,
      autorestart: false,
    },
  ],
};
