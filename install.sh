#!/bin/sh

# 判断要不要yarn install
nodeModule="./node_modules/"

if [ ! -d "$nodeModule" ]; then
  yarn install
fi

# 修改hosts文件
echo "127.0.0.1 www.hxhgta.com" >> /etc/hosts
