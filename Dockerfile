# 设置基础镜像
FROM node:0.12.7-wheezy

MAINTAINER CmouseG "1668924806@qq.com"

# 更新源
#RUN apt-get update
#RUN apt-get upgrade

# 安装 NodeJS 和 npm，基础镜像已包含
#RUN apt-get install -y nodejs npm

# 设置工作目录
WORKDIR /exapp

# install forever
RUN npm install -g forever

# copy package.josn to exapp
COPY ./package.json /exapp/

# 设置淘宝镜像源
RUN npm config set registry https://registry.npm.taobao.org

# 安装 Node 依赖库
RUN npm install

# 将目录中的文件添加至镜像的 /exapp 目录中
COPY . /exapp/

# 暴露 3000 端口，便于访问
EXPOSE 3000

# 设置启动时默认运行命令
CMD npm start
