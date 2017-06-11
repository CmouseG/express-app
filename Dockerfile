# 设置基础镜像
FROM mkenney/npm

# 更新源
#RUN apt-get update
#RUN apt-get upgrade

# 安装 NodeJS 和 npm，基础镜像已包含
#RUN apt-get install -y nodejs npm

# 将目录中的文件添加至镜像的 /srv/exapp 目录中
ADD . /srv/exapp

# 设置工作目录
WORKDIR /srv/exapp

# 设置淘宝镜像源
#RUN npm config set registry https://registry.npm.taobao.org

# 安装 Node 依赖库
RUN npm install

# 暴露 3000 端口，便于访问
EXPOSE 3000

# 设置启动时默认运行命令
CMD ["npm", "start"]
