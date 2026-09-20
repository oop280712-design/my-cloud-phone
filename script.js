// บัญชีที่มีสิทธิ์ VIP (เปิดใช้งานฟรี)
const VIP_EMAILS = ['oop280712@gmail.com', 'sawat2823@gmail.com'];

// รายการแพ็กเกจสเปกต่าง ๆ
const PACKAGES = [
    { id: 1, cpu: '1 CPU Core', ram: '15 GB RAM', price: '99 บาท/เดือน' },
    { id: 2, cpu: '8 CPU Core', ram: '32 GB RAM', price: '299 บาท/เดือน' },
    { id: 3, cpu: '32 CPU Core', ram: '128 GB RAM', price: '899 บาท/เดือน' },
    { id: 4, cpu: '64 CPU Core', ram: '256 GB RAM', price: '1,599 บาท/เดือน' },
    { id: 5, cpu: '120 CPU Core', ram: '500 GB RAM', price: '2,999 บาท/เดือน' }
];

let installedApps = [
    { name: 'Play Store', icon: '🛍️', bg: '#0284c7' },
    { name: 'Chrome', icon: '🌐', bg: '#ea580c' },
    { name: 'Settings', icon: '⚙️', bg: '#475569' },
    { name: 'TikTok', icon: '🎵', bg: '#000000' },
    { name: 'YouTube', icon: '▶️', bg: '#dc2626' },
    { name: 'Games', icon: '🎮', bg: '#16a34a' }
];

let currentUser = null;

// สลับการแสดงผลระหว่าง หน้าแรกเลือกทาง / หน้าเข้าสู่ระบบ / หน้าสมัครสมาชิก
function showAuthPage(page) {
    document.getElementById('welcomeCard').style.display = 'none';
    document.getElementById('loginCard').style.display = 'none';
    document.getElementById('registerCard').style.display = 'none';

    if (page === 'login') {
        document.getElementById('loginCard').style.display = 'block';
    } else if (page === 'register') {
        document.getElementById('registerCard').style.display = 'block';
    } else {
        document.getElementById('welcomeCard').style.display = 'block';
    }
}

// 1. ระบบสมัครสมาชิก -> เมื่อสำเร็จจะไปหน้าเลือกแพ็กเกจทันที
function registerUser(event) {
    event.preventDefault();
    const email = document.getElementById('regEmail').value.trim().toLowerCase();
    const username = document.getElementById('regUsername').value.trim();
    const password = document.getElementById('regPassword').value;

    const userData = { email, username, password };
    localStorage.setItem('user_' + email, JSON.stringify(userData));

    currentUser = userData;
    document.getElementById('userAccountInfo').innerText = username;
    document.getElementById('registerCard').style.display = 'none';
    document.getElementById('packageCard').style.display = 'block';

    renderPackages(email);
}

// 2. ระบบเข้าสู่ระบบ -> เมื่อสำเร็จจะไปหน้าเลือกแพ็กเกจ
function loginUser(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value.trim().toLowerCase();
    const password = document.getElementById('loginPassword').value;

    const savedData = localStorage.getItem('user_' + email);
    if (!savedData) return alert('ไม่พบบัญชีนี้ในระบบ กรุณาสมัครสมาชิกก่อน');

    const user = JSON.parse(savedData);
    if (user.password !== password) return alert('รหัสผ่านไม่ถูกต้อง');

    currentUser = user;
    document.getElementById('userAccountInfo').innerText = user.username;
    document.getElementById('loginCard').style.display = 'none';
    document.getElementById('packageCard').style.display = 'block';

    renderPackages(email);
}

// 3. แสดงรายการแพ็กเกจ (ตรวจสอบ VIP)
function renderPackages(email) {
    const isVip = VIP_EMAILS.includes(email);
    const container = document.getElementById('packageList');
    container.innerHTML = '';

    PACKAGES.forEach(pkg => {
        const card = document.createElement('div');
        card.style.cssText = 'background: rgba(15, 23, 42, 0.8); padding: 18px; border-radius: 12px; border: 1px solid rgba(56, 189, 248, 0.3); text-align: left; display: flex; justify-content: space-between; align-items: center;';

        const info = `<div><h4 style="color: #38bdf8; margin:0; font-size:16px;">⚡ ${pkg.cpu} / ${pkg.ram}</h4><p style="color: #cbd5e1; font-size: 13px; margin: 4px 0 0 0;">ราคา: ${isVip ? '<b style="color:#4ade80;">ฟรี (สิทธิ์ VIP)</b>' : pkg.price}</p></div>`;
        const btn = isVip 
            ? `<button class="btn-blue" style="width:auto; padding: 10px 18px; background:linear-gradient(135deg, #16a34a 0%, #15803d 100%);" onclick="selectPackage('${pkg.cpu}', true)">🎁 เลือกใช้งานฟรี</button>`
            : `<button class="btn-blue" style="width:auto; padding: 10px 18px;" onclick="selectPackage('${pkg.cpu}', false)">💳 ชำระเงิน</button>`;

        card.innerHTML = info + btn;
        container.appendChild(card);
    });
}

// 4. เลือกแพ็กเกจเพื่อเปิดเครื่อง
function selectPackage(cpuSpec, isVip) {
    if (isVip) {
        document.getElementById('packageCard').style.display = 'none';
        document.getElementById('cloudDashboard').style.display = 'block';
        document.getElementById('deviceTitle').innerText = `${currentUser.username} - ${cpuSpec}`;
        goHome();
        startClock();
    } else {
        alert(`🔒 ระบบชำระเงิน: คุณเลือกแพ็กเกจ ${cpuSpec} กรุณาทำการชำระเงินเพื่อเปิดใช้งาน`);
    }
}

// 5. หน้าจอหลักของ RedFinger Cloud Phone
function goHome() {
    const screen = document.getElementById('appDisplay');
    let html = '<div class="app-grid">';
    
    installedApps.forEach(app => {
        html += `
            <div class="app-item" onclick="openApp('${app.name}', '${app.icon}')">
                <div class="app-icon-box" style="background: ${app.bg || '#1e293b'};">${app.icon}</div>
                <div class="app-title">${app.name}</div>
            </div>
        `;
    });
    
    html += '</div>';
    screen.innerHTML = html;
}

function openApp(appName, appIcon) {
    const screen = document.getElementById('appDisplay');
    screen.innerHTML = `
        <div class="app-window">
            <div style="font-size: 50px; margin-bottom: 10px;">${appIcon}</div>
            <h3 style="color: #38bdf8; margin: 0 0 10px 0;">${appName}</h3>
            <p style="color: #94a3b8; font-size: 12px;">กำลังรันแอปบน Android Container</p>
        </div>
    `;
}

function installApk(event) {
    const file = event.target.files[0];
    if (!file) return;

    let appName = file.name.replace('.apk', '');
    if (appName.length > 8) appName = appName.substring(0, 8) + '...';

    alert(`📦 กำลังติดตั้ง: ${file.name}`);

    setTimeout(() => {
        installedApps.push({ name: appName, icon: '📱', bg: '#0284c7' });
        alert(`✅ ติดตั้ง ${appName} เรียบร้อยแล้ว`);
        goHome();
    }, 800);
}

function appBack() { goHome(); }
function showRecents() { alert('📑 แสดงรายการแอปที่เปิดค้างไว้'); }
function restartDevice() {
    alert('🔄 กำลังรีสตาร์ทเครื่อง Cloud Instance...');
    goHome();
}
function openDeviceSettings() { openApp('Settings', '⚙️'); }

function startClock() {
    setInterval(() => {
        const now = new Date();
        document.getElementById('clockDisplay').innerText = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }, 1000);
}
