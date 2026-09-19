# ดึง Redroid 11 สำหรับจำลอง Android
FROM remote-android/redroid:11.0.0-latest

# ตั้งค่า GPU และความละเอียดหน้าจอ
ENV GPU_MODE=guest
ENV WIDTH=720
ENV HEIGHT=1280
ENV DPI=320

# เปิดพอร์ตสำหรับรับ-ส่งข้อมูลควบคุม
EXPOSE 5555
EXPOSE 8080

# คำสั่งเริ่มต้นรันระบบ Android
CMD ["/init"]
