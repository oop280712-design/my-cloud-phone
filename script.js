// ==========================================================================
// BlueFinger Cloud Phone - Main Script (Complete All-in-One)
// ==========================================================================

// 1. รายชื่อผู้ได้รับสิทธิ์ VIP (VIP Whitelist)
const vipUsers = [
    "sawat2823@gmail.com",
    "oop280712@gmail.com"
];

// กำหนดอีเมลผู้ใช้งานปัจจุบัน (สามารถสลับทดสอบบัญชีได้ที่นี่)
let currentUserEmail = "sawat2823@gmail.com"; 

let myCloudDevices = [];      // รายการ Cloud Phone ที่ผู้ใช้งานครอบครองอยู่
let selectedDeviceCount = 1;  // จำนวนเครื่องที่เลือกจากแพ็กเกจ (ค่าเริ่มต้นคือ 1 เครื่อง)

// ฟังก์ชันตรวจสอบสิทธิ์ VIP
function checkIsVip(email) {
    return vipUsers.includes(email.trim().toLowerCase());
}

// ==========================================================================
// 2. ระบบเริ่มต้นทำงานเมื่อโหลดหน้าเว็บ (Initialize User Interface)
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    updateUserBadge();
});

// ฟังก์ชันอัปเดตป้ายแสดงชื่อและสถานะ VIP บนแถบ Header ด้านบน
function updateUserBadge() {
    const userBadge = document.getElementById('userBadge');
    const isVip = checkIsVip(currentUserEmail);

    if (userBadge) {
        if (isVip) {
            userBadge.innerHTML = `👑 VIP User: ${currentUserEmail}`;
            userBadge.style.borderColor = "#f59e0b";
            userBadge.style.color = "#fbbf24";
            userBadge.style.background = "rgba(245, 158, 11, 0.15)";
        } else {
            userBadge.innerHTML = `👤 User: ${currentUserEmail}`;
            userBadge.style.borderColor = "rgba(56, 189, 248, 0.3)";
            userBadge.style.color = "#38bdf8";
            userBadge.style.background = "rgba(56, 189, 248, 0.1)";
        }
    }
}

// ==========================================================================
// 3. ฟังก์ชันเลือกแพ็กเกจคลาวด์โฟน
// ==========================================================================
function selectPackage(element, count) {
    // เอาสไตล์ไฮไลต์ออกจากแพ็กเกจอื่นทั้งหมด
    document.querySelectorAll('.package-card').forEach(card => card.classList.remove('active'));
    
    // ไฮไลต์แพ็กเกจที่คลิกเลือก
    element.classList.add('active');
    
    // บันทึกจำนวนเครื่องที่เลือก
    selectedDeviceCount = count;
}

// ==========================================================================
// 4. ฟังก์ชันยืนยันการรับสิทธิ์ / กดซื้อแพ็กเกจ
// ==========================================================================
function confirmPurchase() {
    const isVip = checkIsVip(currentUserEmail);

    // ตรวจสอบสิทธิ์ VIP
    if (!isVip) {
        alert("บัญชีของคุณยังไม่ได้เป็นสมาชิก VIP กรุณาสมัครสมาชิกก่อนใช้งาน Cloud Phone!");
        return;
    }

    // ล้างรายการเดิม และสร้างรายการเครื่องคลาวด์ใหม่ตามจำนวนแพ็กเกจที่เลือก
    myCloudDevices = [];
    for (let i = 1; i <= selectedDeviceCount; i++) {
        myCloudDevices.push({
            id: i,
            name: `Pixel 7 Pro VIP #${i}`,
            ip: `192.168.1.${100 + i}`,
            port: 5555 + i - 1,
            status: "Online",
            isVipDevice: true
        });
    }

    // อัปเดตรายการคลาวด์บนหน้าแดชบอร์ด
    renderDashboard();

    // สลับหน้าจอ: ซ่อนหน้าเลือกแพ็กเกจ -> แสดงหน้าแดชบอร์ดรายการคลาวด์โฟน
    document.getElementById('buySection').classList.add('hidden');
    document.getElementById('dashboardSection').classList.remove('hidden');
}

// ==========================================================================
// 5. ฟังก์ชันสร้างและอัปเดตหน้าต่างแสดงรายการคลาวด์ (Cloud Dashboard View)
// ==========================================================================
function renderDashboard() {
    const listContainer = document.getElementById('cloudList');
    const countSpan = document.getElementById('cloudCount');

    // อัปเดตตัวเลขแสดงจำนวนคลาวด์ที่มีอยู่ทั้งหมด
    if (countSpan) {
        countSpan.innerText = myCloudDevices.length;
    }

    // ล้างการ์ดเดิมออกแล้วสร้างการ์ดคลาวด์โฟนใหม่ตามจำนวนเครื่องที่มี
    if (listContainer) {
        listContainer.innerHTML = '';

        myCloudDevices.forEach(device => {
            const item = document.createElement('div');
            item.className = 'cloud-item-card';
            item.innerHTML = `
                <div class="cloud-info-title">
                    <span>📱 ${device.name} ${device.isVipDevice ? '<span class="vip-badge">VIP</span>' : ''}</span>
                    <span style="font-size: 12px; color: #4ade80;">
                        <span class="cloud-status-dot"></span>${device.status}
                    </span>
                </div>
                <div style="font-size: 12px; color: #94a3b8;">
                    <div>ADB Port: ${device.port}</div>
                    <div>IP Address: ${device.ip}</div>
                </div>
                <button class="btn-blue" style="padding: 8px; font-size: 13px;" onclick="openEmulator('${device.name}')">
                    เข้าควบคุมเครื่อง
                </button>
            `;
            listContainer.appendChild(item);
        });
    }
}

// ==========================================================================
// 6. ฟังก์ชันเปิดหน้าจอควบคุมเครื่องคลาวด์เสมือน (Emulator Control Panel)
// ==========================================================================
function openEmulator(deviceName) {
    // เปลี่ยนชื่อบนหัวข้อเครื่องที่เข้าควบคุม
    const activeDeviceNameElem = document.getElementById('activeDeviceName');
    if (activeDeviceNameElem) {
        activeDeviceNameElem.innerText = deviceName;
    }

    // สลับหน้าจอ: ซ่อนหน้าแดชบอร์ด -> แสดงหน้าจอควบคุมมือถือ
    document.getElementById('dashboardSection').classList.add('hidden');
    document.getElementById('emulatorSection').classList.remove('hidden');
}

// ==========================================================================
// 7. ฟังก์ชันปิดหน้าจอควบคุมเพื่อกลับไปยังหน้าแดชบอร์ดรายการคลาวด์
// ==========================================================================
function closeEmulator() {
    // สลับหน้าจอ: ซ่อนหน้าควบคุมมือถือ -> แสดงหน้าแดชบอร์ด
    document.getElementById('emulatorSection').classList.add('hidden');
    document.getElementById('dashboardSection').classList.remove('hidden');
}

// ==========================================================================
// 8. ฟังก์ชันกลับไปหน้าเลือกซื้อแพ็กเกจ (เพื่อเพิ่มเครื่องใหม่)
// ==========================================================================
function showBuySection() {
    document.getElementById('dashboardSection').classList.add('hidden');
    document.getElementById('buySection').classList.remove('hidden');
}

// ==========================================================================
// 9. ฟังก์ชันส่งคำสั่งปุ่มควบคุม Android (Home, Back, Recent, Power)
// ==========================================================================
function sendKey(key) {
    console.log(`Sending Key Event to redroid: ${key}`);
}
