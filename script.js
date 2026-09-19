// รายชื่ออีเมลสิทธิ์ VIP (เข้าถึงแพ็กเกจ VIP ฟรี)
const VIP_EMAILS = [
    'oop280712@gmail.com',
    'sawat2823@gmail.com'
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

// 3. เข้าสู่ระบบและประเมินผลแพ็กเกจ
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

    const pkgBtn = document.getElementById('pkgBtn');
    const vipNoticeText = document.getElementById('vipNoticeText');

    // ประเมินผลสิทธิ์ VIP สำหรับแพ็กเกจ
    if (VIP_EMAILS.includes(email)) {
        vipNoticeText.style.display = 'block';
        pkgBtn.innerText = '🎁 กดรับสิทธิ์ VIP เข้าใช้งานฟรี';
        pkgBtn.style.backgroundColor = '#16a34a'; // ปุ่มสีเขียวสำหรับ VIP
    } else {
        vipNoticeText.style.display = 'none';
        pkgBtn.innerText = '💳 ชำระเงินเพื่อเปิดใช้งาน';
        pkgBtn.style.backgroundColor = '#2563eb';
    }
}

// 4. ปุ่มเลือกแพ็กเกจ
function selectPackage() {
    if (!currentUser) return;

    if (VIP_EMAILS.includes(currentUser.email)) {
        alert('🌟 ยินดีต้อนรับสิทธิ์ VIP! เข้าสู่ระบบ Cloud Phone เรียบร้อยแล้ว');
        document.getElementById('packageCard').style.display = 'none';
        startCloudInstance(currentUser.username + " (VIP Plan)");
    } else {
        alert('🔒 กรุณาชำระเงินเพื่อซื้อแพ็กเกจ VIP ก่อนเข้าใช้งาน');
    }
}

// 5. เปิดหน้าจอ Cloud Phone
function startCloudInstance(displayName) {
    document.getElementById('dashboard').style.display = 'block';
    document.getElementById('welcomeUser').innerText = displayName;
}
