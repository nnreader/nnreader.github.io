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

# 要创建的ZIP文件名
zip_filename="books.zip"

rm "$zip_filename"

# 找出当前目录下的所有txt文件，并添加到ZIP包
find "$script_dir" -type f -name "*.txt" | zip -j -P "$password" "internal.zip" -@

zip -j -P "$password" -r "$zip_filename" "internal.zip"

rm internal.zip
