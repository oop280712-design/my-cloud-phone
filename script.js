// ==========================================================================
// BlueFinger Cloud Phone - Ultra-Realistic System Script
// ==========================================================================

// 1. สิทธิ์ VIP
const vipUsers = [
    "sawat2823@gmail.com",
    "oop280712@gmail.com"
];

let currentUserEmail = "sawat2823@gmail.com"; 
let myCloudDevices = [];
let selectedDeviceCount = 1;
let activeDevice = null;

// 2. ตรวจสอบ VIP
function checkIsVip(email) {
    return vipUsers.includes(email.trim().toLowerCase());
}

document.addEventListener("DOMContentLoaded", () => {
    updateUserBadge();
    startAndroidClock();
});

function updateUserBadge() {
    const userBadge = document.getElementById('userBadge');
    const isVip = checkIsVip(currentUserEmail);

    if (userBadge) {
        if (isVip) {
            userBadge.innerHTML = `<i class="fa-solid fa-crown text-amber-400"></i> VIP: ${currentUserEmail}`;
            userBadge.className = "user-badge vip-active";
        } else {
            userBadge.innerHTML = `<i class="fa-solid fa-user"></i> Standard: ${currentUserEmail}`;
            userBadge.className = "user-badge";
        }
    }
}

// 3. นาฬิกา Android สมจริง
function startAndroidClock() {
    setInterval(() => {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const timeStr = `${hours}:${minutes}`;

        const clockElem = document.getElementById('androidClock');
        const widgetTime = document.getElementById('widgetTime');
        
        if (clockElem) clockElem.innerText = timeStr;
        if (widgetTime) widgetTime.innerText = timeStr;
    }, 1000);
}

// 4. เลือกแพ็กเกจ
function selectPackage(element, count) {
    document.querySelectorAll('.package-card').forEach(card => card.classList.remove('active'));
    element.classList.add('active');
    selectedDeviceCount = count;
}

// 5. ซื้อ/สร้างคลาวด์โฟนรวมเล่ม
function confirmPurchase() {
    if (!checkIsVip(currentUserEmail)) {
        alert("⚠️ บัญชีของคุณไม่มีสิทธิ์ VIP กรุณาติดต่อผู้ดูแลระบบ");
        return;
    }

    myCloudDevices = [];
    for (let i = 1; i <= selectedDeviceCount; i++) {
        myCloudDevices.push({
            id: i,
            name: `Google Pixel 7 Pro (VIP #${i})`,
            ip: `10.0.0.${10 + i}`,
            port: 5555 + (i - 1),
            status: "Online",
            androidVer: "Android 13 (SDK 33)",
            fps: "60 FPS"
        });
    }

    renderDashboard();
    document.getElementById('buySection').classList.add('hidden');
    document.getElementById('dashboardSection').classList.remove('hidden');
}

// 6. เรนเดอร์หน้าคลังคลาวด์
function renderDashboard() {
    const listContainer = document.getElementById('cloudList');
    const countSpan = document.getElementById('cloudCount');

    if (countSpan) countSpan.innerText = myCloudDevices.length;

    if (listContainer) {
        listContainer.innerHTML = '';
        myCloudDevices.forEach(device => {
            const item = document.createElement('div');
            item.className = 'cloud-card';
            item.innerHTML = `
                <div class="cloud-card-header">
                    <div class="device-title">
                        <i class="fa-solid fa-mobile-screen text-sky-400"></i>
                        <span>${device.name}</span>
                    </div>
                    <span class="badge-online"><i class="fa-solid fa-circle"></i> ${device.status}</span>
                </div>
                <div class="cloud-card-body">
                    <div><span>OS:</span> ${device.androidVer}</div>
                    <div><span>IP:</span> ${device.ip}:${device.port}</div>
                    <div><span>Stream:</span> WebRTC / H.264 (${device.fps})</div>
                </div>
                <button class="btn-control" onclick="openEmulator('${device.name}')">
                    <i class="fa-solid fa-display"></i> เข้าควบคุมเครื่อง
                </button>
            `;
            listContainer.appendChild(item);
        });
    }
}

// 7. เปิดเครื่อง Emulator
function openEmulator(deviceName) {
    activeDevice = deviceName;
    document.getElementById('activeDeviceName').innerText = deviceName;
    document.getElementById('dashboardSection').classList.add('hidden');
    document.getElementById('emulatorSection').classList.remove('hidden');
    goHome();
}

function closeEmulator() {
    document.getElementById('emulatorSection').classList.add('hidden');
    document.getElementById('dashboardSection').classList.remove('hidden');
}

function showBuySection() {
    document.getElementById('dashboardSection').classList.add('hidden');
    document.getElementById('buySection').classList.remove('hidden');
}

// 8. จำลองการทำงานหน้าจอแอปแบบสมจริง
function launchApp(appName, iconUrl) {
    const container = document.getElementById('appContainer');
    container.innerHTML = `
        <div class="app-view">
            <div class="app-view-header">
                <span>${appName}</span>
                <i class="fa-solid fa-xmark cursor-pointer" onclick="goHome()"></i>
            </div>
            <div class="app-view-body">
                <i class="fa-solid fa-spinner fa-spin app-loader"></i>
                <p>กำลังเชื่อมต่อข้อมูล ${appName} บนเครื่อง Pixel 7 Pro...</p>
                <div class="mock-feed">
                    <div class="mock-post"></div>
                    <div class="mock-post"></div>
                </div>
            </div>
        </div>
    `;
}

function openSettings() {
    const container = document.getElementById('appContainer');
    container.innerHTML = `
        <div class="app-view">
            <div class="app-view-header">
                <span>การตั้งค่า (Settings)</span>
            </div>
            <div class="app-view-body settings-list">
                <div class="setting-item">
                    <span>เกี่ยวกับโทรศัพท์</span>
                    <small>Pixel 7 Pro (Android 13)</small>
                </div>
                <div class="setting-item">
                    <span>สถานะ Root / Magisk</span>
                    <small class="text-green">Hidden (Play Integrity Passed)</small>
                </div>
                <div class="setting-item">
                    <span>ADB Connection</span>
                    <small class="text-sky">Port 5555 Active</small>
                </div>
            </div>
        </div>
    `;
}

function goHome() {
    const container = document.getElementById('appContainer');
    container.innerHTML = `
        <div class="widget-clock">
            <div id="widgetTime" class="widget-time">12:00</div>
            <div class="widget-date">วันศุกร์, 25 กันยายน</div>
        </div>
        <div class="app-grid">
            <div class="app-icon" onclick="launchApp('LINE')">
                <div class="icon-box bg-line"><i class="fa-comment-dots fa-solid"></i></div>
                <span>LINE</span>
            </div>
            <div class="app-icon" onclick="launchApp('Facebook')">
                <div class="icon-box bg-fb"><i class="fa-brands fa-facebook-f"></i></div>
                <span>Facebook</span>
            </div>
            <div class="app-icon" onclick="launchApp('TikTok')">
                <div class="icon-box bg-tiktok"><i class="fa-brands fa-tiktok"></i></div>
                <span>TikTok</span>
            </div>
            <div class="app-icon" onclick="launchApp('Shopee')">
                <div class="icon-box bg-shopee"><i class="fa-solid fa-bag-shopping"></i></div>
                <span>Shopee</span>
            </div>
            <div class="app-icon" onclick="launchApp('Play Store')">
                <div class="icon-box bg-playstore"><i class="fa-solid fa-play"></i></div>
                <span>Play Store</span>
            </div>
            <div class="app-icon" onclick="openSettings()">
                <div class="icon-box bg-settings"><i class="fa-solid fa-gear"></i></div>
                <span>ตั้งค่า</span>
            </div>
        </div>
    `;
    startAndroidClock();
}

// 9. คำสั่งปุ่มควบคุม Android
function sendKey(key) {
    if (key === 'HOME' || key === 'BACK') {
        goHome();
    } else {
        console.log(`Android Input Event: ${key}`);
    }
}

function toggleRotate() {
    const screen = document.getElementById('phoneScreen');
    screen.classList.toggle('rotated');
}

function openAdbConsole() {
    alert("💻 ADB Shell Connected: \n$ adb connect 127.0.0.1:5555\nConnected to redroid-pixel7");
}
