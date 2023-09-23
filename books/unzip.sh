#!/bin/bash

# 获取当前脚本所在目录
script_dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

cd $script_dir

# 从环境变量中读取密码
password="$BOOK_ZIP_PASSWORD"

# 检查密码是否存在
if [ -z "$password" ]; then
  echo "Error: BOOK_ZIP_PASSWORD environment variable is not set."
  exit 1
fi

# 要解压的ZIP文件名
zip_filename="books.zip"

# 解压ZIP文件到当前目录
unzip -o -P "$password" "$zip_filename"

# 解压ZIP文件到当前目录
unzip -o -P "$password" internal.zip

rm internal.zip