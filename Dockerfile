# استخدم نسخة خفيفة من Nginx
FROM nginx:alpine

# ثبّت git داخل الحاوية (اختياري، إذا تحتاجه)
RUN apk add --no-cache git

# انسخ مشروعك مباشرة من GitHub
RUN git clone https://github.com/feras-alkilani/Phrasal-Verbs.git /usr/share/nginx/html

# افتح البورت 80
EXPOSE 80

# شغل Nginx في foreground
CMD ["nginx", "-g", "daemon off;"]
