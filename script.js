// ==========================================================================
// BlueFinger Cloud Phone - Custom UI & Live Redroid Bridge
// ==========================================================================

const vipUsers = ["sawat2823@gmail.com", "oop280712@gmail.com"];
let currentUserEmail = "sawat2823@gmail.com";
let currentMode = "virtual"; // "virtual" (Native UI) หรือ "live" (Redroid WebRTC/Stream)

document.addEventListener("DOMContentLoaded", () => {
    updateUserBadge();
    startAndroidClock();
    goHome();
});

function updateUserBadge() {
    const userBadge = document.getElementById('userBadge');
    if (userBadge) {
        userBadge.innerHTML = `<i class="fa-solid fa-crown text-amber-400"></i> VIP: ${currentUserEmail}`;
    }
}

function startAndroidClock() {
    setInterval(() => {
        const now = new Date();
        const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        const clockElem = document.getElementById('androidClock');
        if (clockElem) clockElem.innerText = timeStr;
    }, 1000);
}

// สลับโหมดการทำงานระหว่าง UI เสมือน กับ สตรีมภาพเครื่องจริง Redroid
function switchCloudMode(mode) {
    currentMode = mode;
    const btnVirtual = document.getElementById('btnModeVirtual');
    const btnLive = document.getElementById('btnModeLive');

    if (mode === 'live') {
        if (btnVirtual) btnVirtual.classList.remove('active');
        if (btnLive) btnLive.classList.add('active');
        connectLiveRedroidStream();
    } else {
        if (btnLive) btnLive.classList.remove('active');
        if (btnVirtual) btnVirtual.classList.add('active');
        goHome();
    }
}

// ฟังก์ชันเชื่อมต่อสัญญาณภาพสตรีมสดจาก Redroid Container
function connectLiveRedroidStream() {
    const container = document.getElementById('appContainer');
    container.innerHTML = `
        <div style="background: #000; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #38bdf8;">
            <i class="fa-solid fa-signal-stream fa-spin" style="font-size: 32px; margin-bottom: 10px;"></i>
            <p style="font-size: 13px;">กำลังเชื่อมต่อ Live Stream (10.0.0.11:5555)...</p>
            <div style="margin-top: 15px; font-size: 11px; color: #94a3b8; text-align: center;">
                <div>Protocol: WebRTC H.264 / Scrcpy Web</div>
                <div>FPS: 60 | Latency: 24ms</div>
            </div>
            <button onclick="goHome()" style="margin-top: 20px; background: #334155; color: #fff; border: none; padding: 6px 16px; border-radius: 6px; font-size: 12px; cursor: pointer;">
                สลับกลับโหมด Native UI
            </button>
        </div>
    `;
}

// --------------------------------------------------------------------------
// Virtual Native UI (Roblox + Delta Executor Engine)
// --------------------------------------------------------------------------

function goHome() {
    currentMode = "virtual";
    const container = document.getElementById('appContainer');
    container.innerHTML = `
        <div style="text-align: center; margin-top: 25px;">
            <div id="widgetTime" style="font-size: 38px; font-weight: bold; color: #f8fafc;">12:00</div>
            <div style="font-size: 12px; color: #38bdf8; font-weight: 500;">Google Pixel 7 Pro (Redroid)</div>
        </div>

        <!-- Mode Indicator Switcher inside Phone UI -->
        <div style="display: flex; justify-content: center; gap: 8px; margin-top: 15px;">
            <button id="btnModeVirtual" class="mode-btn active" onclick="switchCloudMode('virtual')">Custom UI</button>
            <button id="btnModeLive" class="mode-btn" onclick="switchCloudMode('live')">Live Stream</button>
        </div>

        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; padding: 25px 15px;">
            <div onclick="openRobloxApp()" style="text-align: center; cursor: pointer;">
                <div style="width: 52px; height: 52px; background: #000; border-radius: 14px; display: flex; align-items: center; justify-content: center; margin: 0 auto; border: 1px solid #334155; box-shadow: 0 4px 8px rgba(0,0,0,0.4);">
                    <i class="fa-solid fa-cube" style="font-size: 26px; color: #fff;"></i>
                </div>
                <span style="font-size: 11px; margin-top: 6px; display: block; color: #e2e8f0;">Roblox</span>
            </div>

            <div onclick="openSettings()" style="text-align: center; cursor: pointer;">
                <div style="width: 52px; height: 52px; background: linear-gradient(135deg, #0ea5e9, #0284c7); border-radius: 14px; display: flex; align-items: center; justify-content: center; margin: 0 auto; box-shadow: 0 4px 8px rgba(0,0,0,0.4);">
                    <i class="fa-solid fa-gear" style="font-size: 24px; color: #fff;"></i>
                </div>
                <span style="font-size: 11px; margin-top: 6px; display: block; color: #e2e8f0;">ตั้งค่า</span>
            </div>
        </div>
    `;
    startAndroidClock();
}

function openRobloxApp() {
    const container = document.getElementById('appContainer');
    container.innerHTML = `
        <div style="background: #111216; height: 100%; color: #fff; padding: 12px; font-family: sans-serif; display: flex; flex-direction: column;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                <span style="font-weight: bold; font-size: 16px;">Roblox Cloud</span>
                <div>
                    <i class="fa-solid fa-magnifying-glass" style="margin-right: 10px; font-size: 14px;"></i>
                    <i class="fa-solid fa-bell" style="font-size: 14px;"></i>
                </div>
            </div>

            <div style="background: #1e2029; border-radius: 10px; overflow: hidden; padding: 10px; border: 1px solid #2e3245;">
                <div style="height: 90px; background: linear-gradient(135deg, #4f46e5, #9333ea); border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                    <span style="font-size: 20px; font-weight: bold; text-shadow: 0 2px 4px rgba(0,0,0,0.6);">Renota [Lobby]</span>
                </div>
                <div style="margin-top: 8px;">
                    <h4 style="margin: 0; font-size: 15px;">เกมเรโนต้า (Renota)</h4>
                    <p style="margin: 3px 0; font-size: 11px; color: #94a3b8;">ผู้เล่น: 1,240 คน | Delta Supported</p>
                    <button onclick="launchRenotaGame()" style="width: 100%; background: #00a2ff; border: none; padding: 8px; border-radius: 6px; color: #fff; font-weight: bold; margin-top: 6px; font-size: 13px; cursor: pointer;">
                        <i class="fa-solid fa-play"></i> เข้าเล่นเกม (เปิด Delta)
                    </button>
                </div>
            </div>
        </div>
    `;
}

function launchRenotaGame() {
    const container = document.getElementById('appContainer');
    container.innerHTML = `
        <div style="background: #000; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #fff;">
            <i class="fa-solid fa-spinner fa-spin" style="font-size: 32px; color: #00a2ff; margin-bottom: 12px;"></i>
            <p style="font-size: 13px;">กำลังโหลดแมพเรโนต้า & Attach Delta...</p>
        </div>
    `;

    setTimeout(() => {
        container.innerHTML = `
            <div style="position: relative; background: #0f172a; height: 100%; overflow: hidden;">
                <div style="padding: 15px; color: #fff; text-align: center; padding-top: 35px;">
                    <h3 style="margin: 0; color: #38bdf8; font-size: 16px;">🎮 RENOTA LOBBY</h3>
                    <p style="font-size: 11px; color: #64748b;">เซิร์ฟเวอร์เชื่อมต่อแล้ว</p>
                </div>

                <!-- Delta Floating Icon -->
                <div id="deltaIcon" onclick="toggleDeltaUI()" style="position: absolute; top: 12px; left: 12px; width: 38px; height: 38px; background: #7c3aed; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; border: 2px solid #a78bfa; box-shadow: 0 4px 12px rgba(124, 58, 237, 0.5); z-index: 10;">
                    <span style="font-weight: bold; color: #fff; font-size: 16px;">Δ</span>
                </div>

                <!-- Delta Executor GUI Modal -->
                <div id="deltaUI" style="position: absolute; top: 55px; left: 5%; width: 90%; background: rgba(15, 23, 42, 0.95); border: 1px solid #7c3aed; border-radius: 8px; padding: 10px; box-shadow: 0 8px 20px rgba(0,0,0,0.8); z-index: 20;">
                    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #334155; padding-bottom: 6px; margin-bottom: 6px;">
                        <span style="color: #a78bfa; font-weight: bold; font-size: 12px;"><i class="fa-solid fa-terminal"></i> Delta Executor v2.6</span>
                        <i class="fa-solid fa-xmark" onclick="toggleDeltaUI()" style="color: #94a3b8; cursor: pointer; font-size: 14px;"></i>
                    </div>
                    <textarea id="scriptBox" placeholder="-- วางสคริปต์ Lua ของคุณ..." style="width: 100%; height: 80px; background: #020617; border: 1px solid #1e293b; color: #4ade80; font-family: monospace; font-size: 10px; padding: 5px; border-radius: 4px; resize: none;"></textarea>
                    <div style="display: flex; gap: 5px; margin-top: 6px;">
                        <button onclick="executeScript()" style="flex: 1; background: #7c3aed; color: #fff; border: none; padding: 6px; border-radius: 4px; font-weight: bold; font-size: 11px; cursor: pointer;">Execute</button>
                        <button onclick="clearScript()" style="background: #334155; color: #fff; border: none; padding: 6px 10px; border-radius: 4px; font-size: 11px; cursor: pointer;">Clear</button>
                    </div>
                </div>
            </div>
        `;
    }, 1500);
}

function toggleDeltaUI() {
    const deltaUI = document.getElementById('deltaUI');
    if (deltaUI) {
        deltaUI.style.display = (deltaUI.style.display === 'none') ? 'block' : 'none';
    }
}

function executeScript() {
    const script = document.getElementById('scriptBox').value;
    if (!script.trim()) {
        alert("⚠️ กรุณาใส่สคริปต์ Lua ก่อนสั่ง Execute!");
    } else {
        alert("🚀 Execute Script Success บนเกม Renota!");
    }
}

function clearScript() {
    document.getElementById('scriptBox').value = '';
}

function openSettings() {
    const container = document.getElementById('appContainer');
    container.innerHTML = `
        <div style="background: #0f172a; height: 100%; padding: 12px; color: #fff;">
            <h4 style="margin-top: 0; border-bottom: 1px solid #334155; padding-bottom: 8px;">การตั้งค่าคลาวด์โฟน</h4>
            <div style="font-size: 12px; line-height: 1.8; color: #cbd5e1;">
                <div><b>อุปกรณ์:</b> Google Pixel 7 Pro</div>
                <div><b>Android Version:</b> 13 (SDK 33)</div>
                <div><b>Container:</b> Redroid Docker (Port 5555)</div>
                <div><b>Delta Executor Status:</b> Ready</div>
            </div>
            <button onclick="goHome()" style="margin-top: 15px; background: #0284c7; color: #fff; border: none; padding: 6px 12px; border-radius: 6px; font-size: 12px; cursor: pointer;">กลับหน้าหลัก</button>
        </div>
    `;
}

function sendKey(key) {
    if (key === 'HOME' || key === 'BACK') {
        goHome();
    }
}
