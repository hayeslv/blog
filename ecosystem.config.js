/*
 * @Author: Lvhz
 * @Date: 2021-07-09 09:40:25
 * @Description: Description
 */
module.exports = {
  apps: [{
    name: 'big-screen-template',
    script: './src/server/index.js',
    autorestart: true,
    output: './src/server/logs/out.log', // 输出日志
    error: './src/server/logs/error.log', // 错误日志
    merge_logs: true // 合并日志
  }],

  deploy: {
    production: {
      user: 'SSH_USERNAME',
      host: 'SSH_HOSTMACHINE',
      ref: 'origin/master',
      repo: 'GIT_REPOSITORY',
      path: 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
