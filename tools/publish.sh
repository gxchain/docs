#!/usr/bin/env bash
npm run build
echo '开始打包'
node archive.js
echo '打包完成'
scp docs.zip docs:/gxb
echo '开始部署docs'
ssh docs << EOF
    cd /gxb;
    unzip -o -d gxchain-docs gxchain-docs.zip;
    exit;
EOF
echo 'docs完成部署'

