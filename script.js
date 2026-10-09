let currentSelectedPlan = {
    name: "Ultra Extreme",
    cpu: "8 vCPU High-Clock",
    ram: "24 GB RAM",
    price: "1,200"
};

// สลับการเลือกแพ็กเกจ
function selectPlan(cardElement, name, cpu, ram, price) {
    document.querySelectorAll('.plan-card').forEach(card => card.classList.remove('active'));
    cardElement.classList.add('active');
    currentSelectedPlan = { name, cpu, ram, price };
    document.getElementById('buy-price').textContent = `฿${price}`;
}

// กดปุ่ม สั่งซื้อ และเริ่ม บูต Android
document.getElementById('buy-btn').addEventListener('click', () => {
    // 1. ซ่อนหน้าต่าง Modal
    document.getElementById('plan-modal').style.display = 'none';
    document.getElementById('vmos-overlay').style.display = 'none';

    // 2. อัปเดตข้อมูลบน Status Bar ด้านบน
    document.getElementById('display-plan-name').textContent = currentSelectedPlan.name;
    const badge = document.getElementById('display-specs');
    badge.textContent = `${currentSelectedPlan.cpu} | ${currentSelectedPlan.ram}`;
    badge.classList.add('active');
    document.getElementById('status-dot').className = 'status-dot green';
    document.getElementById('ping').textContent = '12ms';

    // 3. แสดงหน้าต่าง Boot Screen (ขึ้นรูป Android)
    const bootScreen = document.getElementById('boot-screen');
    const bootStatus = document.getElementById('boot-status');
    bootScreen.style.display = 'flex';

    // จำลองขั้นตอนการบูตเครื่อง
    setTimeout(() => {
        bootStatus.textContent = "Allocating 24 GB RAM & CPU Cores...";
    }, 1200);

    setTimeout(() => {
        bootStatus.textContent = "Loading VMOS Android System...";
    }, 2500);

    // 4. บูตเสร็จแล้ว ตัดเข้าสู่หน้าหลัก Android Home
    setTimeout(() => {
        bootScreen.style.display = 'none';
        document.getElementById('android-home').style.display = 'flex';
        updateClock();
    }, 4000);
});

// อัปเดตเวลาบนหน้าจอ Android
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const timeStr = `${hours}:${minutes}`;
    
    document.getElementById('android-clock').textContent = timeStr;
    document.getElementById('main-time').textContent = timeStr;
}
setInterval(updateClock, 1000);

// ปุ่มเปิด Modal
document.getElementById('open-modal-btn').addEventListener('click', () => {
    document.getElementById('plan-modal').style.display = 'flex';
});

document.getElementById('change-plan-btn').addEventListener('click', () => {
    document.getElementById('plan-modal').style.display = 'flex';
});

// ฟังก์ชันกดเปิดแอปจำลอง
function openApp(appName) {
    alert(`📱 กำลังเปิดแอปพลิเคชัน: ${appName}`);
}

// ปุ่มด้านข้าง
document.getElementById('home-btn').addEventListener('click', () => {
    document.getElementById('android-home').style.display = 'flex';
});
document.getElementById('back-btn').addEventListener('click', () => {
    alert('ส่งคำสั่ง: Back');
});
document.getElementById('recent-btn').addEventListener('click', () => {
    alert('ส่งคำสั่ง: Recent Apps');
});
