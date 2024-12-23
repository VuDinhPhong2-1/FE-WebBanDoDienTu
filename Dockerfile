# Sử dụng Node.js làm base image
FROM node:16-alpine

# Đặt thư mục làm việc
WORKDIR /app

# Sao chép package.json và package-lock.json vào container
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Build ứng dụng ReactJS
RUN npm run build

# Cung cấp file tĩnh từ thư mục build
RUN npm install -g serve

CMD ["serve", "-s", "build", "-l", "3000"]

# Mở cổng 3000 cho ứng dụng
EXPOSE 3000
