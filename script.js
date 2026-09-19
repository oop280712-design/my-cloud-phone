// รายชื่ออีเมลสิทธิ์ VIP (รับสิทธิ์ฟรีทุกแพ็กเกจ)
const VIP_EMAILS = [
    'oop280712@gmail.com',
    'sawat2823@gmail.com'
];

// รายการแพ็กเกจสเปกต่าง ๆ
const PACKAGES = [
    { id: 1, cpu: '1 CPU Core', ram: '15 GB RAM', price: '99 บาท/เดือน' },
    { id: 2, cpu: '8 CPU Core', ram: '32 GB RAM', price: '299 บาท/เดือน' },
    { id: 3, cpu: '32 CPU Core', ram: '128 GB RAM', price: '899 บาท/เดือน' },
    { id: 4, cpu: '64 CPU Core', ram: '256 GB RAM', price: '1,599 บาท/เดือน' },
    { id: 5, cpu: '120 CPU Core', ram: '500 GB RAM', price: '2,999 บาท/เดือน' }
];

let currentUser = null;

// 1. ระบบสมัครสมาชิก
function registerUser(event) {
    event.preventDefault();
    const email = document.getElementById('regEmail').value.trim().toLowerCase();
    const username = document.getElementById('regUsername').value.trim();
    const password = document.getElementById('regPassword').value;

    const userData = { email, username, password };
    localStorage.setItem('user_' + email, JSON.stringify(userData));

    document.getElementById('registerCard').style.display = 'none';
    document.getElementById('successCard').style.display = 'block';
}

// 2. สลับไปหน้าเข้าสู่ระบบ
function goToLogin() {
    document.getElementById('successCard').style.display = 'none';
    document.getElementById('loginCard').style.display = 'block';
}

// 3. ระบบเข้าสู่ระบบ -> แสดงหน้าเลือกแพ็กเกจ
function loginUser(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value.trim().toLowerCase();
    const password = document.getElementById('loginPassword').value;

    const savedData = localStorage.getItem('user_' + email);

    if (!savedData) {
        alert('ไม่พบบัญชีนี้ในระบบ กรุณาสมัครสมาชิกก่อน');
        return;
    }

    const user = JSON.parse(savedData);

    if (user.password !== password) {
        alert('รหัสผ่านไม่ถูกต้อง');
        return;
    }

    currentUser = user;
    document.getElementById('loginCard').style.display = 'none';
    document.getElementById('packageCard').style.display = 'block';

    renderPackages(email);
}

// 4. แสดงบัตรแพ็กเกจ
function renderPackages(email) {
    const isVip = VIP_EMAILS.includes(email);
    const packageListContainer = document.getElementById('packageList');
    packageListContainer.innerHTML = '';

    PACKAGES.forEach(pkg => {
        const card = document.createElement('div');
        card.style.cssText = 'background: #0f172a; padding: 15px; border-radius: 8px; border: 1px solid #38bdf8; text-align: left; display: flex; justify-content: space-between; align-items: center;';

        const info = `
            <div>
                <h4 style="color: #38bdf8; font-size: 16px;">⚡ ${pkg.cpu} / ${pkg.ram}</h4>
                <p style="color: #cbd5e1; font-size: 13px; margin-top: 4px;">ราคา: ${isVip ? '<b style="color:#4ade80;">ฟรี (สิทธิ์ VIP)</b>' : pkg.price}</p>
            </div>
        `;

        let actionBtn = '';
        if (isVip) {
            actionBtn = `<button class="btn-blue" style="width: auto; padding: 8px 15px; background-color: #16a34a;" onclick="selectPackage('${pkg.cpu}', true)">🎁 เลือกใช้งานฟรี</button>`;
        } else {
            actionBtn = `<button class="btn-blue" style="width: auto; padding: 8px 15px;" onclick="selectPackage('${pkg.cpu}', false)">💳 ชำระเงิน</button>`;
        }

        card.innerHTML = info + actionBtn;
        packageListContainer.appendChild(card);
    });
}

// 5. กดเลือกแพ็กเกจ -> สั่งเปิดหน้าจอคลาวด์แบบโหมดความเร็วสูง (Instant Boot)
function selectPackage(cpuSpec, isVip) {
    if (isVip) {
        document.getElementById('packageCard').style.display = 'none';
        startCloudInstanceFast(`${currentUser.username} (${cpuSpec})`);
    } else {
        alert(`🔒 ระบบชำระเงิน: คุณเลือกแพ็กเกจ ${cpuSpec} กรุณาทำการชำระเงินเพื่อเปิดใช้งาน`);
    }
}

// 6. ฟังก์ชันเปิดหน้าจอ Cloud Phone แบบขึ้นเร็วทันที (Instant Load)
function startCloudInstanceFast(displayName) {
    document.getElementById('dashboard').style.display = 'block';
    document.getElementById('welcomeUser').innerText = displayName;

    // สั่งวาดหน้าจอ Android UI แบบโต้ตอบได้ขึ้นทันทีโดยไม่ต้องรอนาน
    const screenContent = document.querySelector('.screen-content');
    screenContent.innerHTML = `
        <div class="android-desktop">
            <div class="status-bar">
                <span>12:00</span>
                <span>📶 100% 🔋</span>
            </div>
            <div class="app-grid">
                <div class="app-icon" onclick="alert('เปิด Play Store')">🛍️<span>Play Store</span></div>
                <div class="app-icon" onclick="alert('เปิด Chrome')">🌐<span>Browser</span></div>
                <div class="app-icon" onclick="alert('เปิด Settings')">⚙️<span>Settings</span></div>
                <div class="app-icon" onclick="alert('เปิด Files')">📁<span>Files</span></div>
                <div class="app-icon" onclick="alert('เปิด TikTok')">🎵<span>TikTok</span></div>
                <div class="app-icon" onclick="alert('เปิด Game')">🎮<span>Games</span></div>
            </div>
            <div class="nav-bar">
                <span>◀</span>
                <span>●</span>
                <span>◼</span>
            </div>
        </div>
    `;
}
