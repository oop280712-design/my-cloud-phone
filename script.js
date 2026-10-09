const VIP_EMAILS = ["oop280712@gmail.com", "sawat2823@gmail.com"];

let currentSelectedPlan = {
    name: "Ultra Extreme VIP",
    cpu: "8 vCPU High-Clock",
    ram: "24 GB RAM",
    price: "1,200"
};

// ตรวจสอบอีเมลแบบ Real-time เมื่อพิมพ์
document.getElementById('user-email').addEventListener('input', function(e) {
    const email = e.target.value.trim().toLowerCase();
    const statusMsg = document.getElementById('vip-status-msg');
    const priceDisplay = document.getElementById('price-display');

    if (VIP_EMAILS.includes(email)) {
        statusMsg.textContent = "✨ ตรวจพบสิทธิ์ VIP! ใช้งานแพ็กเกจนี้ฟรีทันที";
        statusMsg.style.color = "#10b981";
        priceDisplay.innerHTML = "<s>฿1,200</s> <span style='color: #10b981;'>FREE (VIP)</span>";
    } else {
        statusMsg.textContent = "";
        priceDisplay.innerHTML = "฿1,200 <span>/เดือน</span>";
    }
});

function selectPlan(cardElement, name, cpu, ram, price) {
    document.querySelectorAll('.plan-card').forEach(card => card.classList.remove('active'));
    cardElement.classList.add('active');
    currentSelectedPlan = { name, cpu, ram, price };
}

document.getElementById('buy-btn').addEventListener('click', () => {
    const emailInput = document.getElementById('user-email').value.trim().toLowerCase();
    const isVip = VIP_EMAILS.includes(emailInput);

    document.getElementById('plan-modal').style.display = 'none';
    document.getElementById('vmos-overlay').style.display = 'none';

    document.getElementById('display-plan-name').textContent = currentSelectedPlan.name;
    const badge = document.getElementById('display-specs');
    badge.textContent = `${currentSelectedPlan.cpu} | ${currentSelectedPlan.ram}`;
    badge.classList.add('active');
    
    document.getElementById('status-dot').className = 'status-dot green';
    document.getElementById('ping').textContent = '10ms';

    if (isVip) {
        document.getElementById('vip-user-badge').textContent = `VIP Verified: ${emailInput}`;
    }

    const bootScreen = document.getElementById('boot-screen');
    const bootStatus = document.getElementById('boot-status');
    bootScreen.style.display = 'flex';

    setTimeout(() => {
        bootStatus.textContent = isVip ? "🔓 Bypassing VIP Security..." : "Allocating Hardware Resources...";
    }, 1200);

    setTimeout(() => {
        bootStatus.textContent = "Loading VMOS Android System...";
    }, 2500);

    setTimeout(() => {
        bootScreen.style.display = 'none';
        document.getElementById('android-home').style.display = 'flex';
        updateClock();
    }, 4000);
});

function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const timeStr = `${hours}:${minutes}`;
    
    document.getElementById('android-clock').textContent = timeStr;
    document.getElementById('main-time').textContent = timeStr;
}
setInterval(updateClock, 1000);

document.getElementById('open-modal-btn').addEventListener('click', () => {
    document.getElementById('plan-modal').style.display = 'flex';
});

document.getElementById('change-plan-btn').addEventListener('click', () => {
    document.getElementById('plan-modal').style.display = 'flex';
});

function openApp(appName) {
    alert(`📱 กำลังเปิดแอปพลิเคชัน: ${appName}`);
}

document.getElementById('home-btn').addEventListener('click', () => {
    document.getElementById('android-home').style.display = 'flex';
});
document.getElementById('back-btn').addEventListener('click', () => {
    alert('ส่งคำสั่ง: Back');
});
document.getElementById('recent-btn').addEventListener('click', () => {
    alert('ส่งคำสั่ง: Recent Apps');
});
