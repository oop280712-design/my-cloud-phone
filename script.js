// รายชื่ออีเมลสิทธิ์ VIP ฟรี 24 ชม.
const VIP_EMAILS = [
    'oop280712@gmail.com',
    'sawat2823@gmail.com'
];

// 1. ฟังก์ชันสมัครสมาชิกและเซฟรหัสผ่าน
function registerUser(event) {
    event.preventDefault();
    const email = document.getElementById('regEmail').value.trim().toLowerCase();
    const username = document.getElementById('regUsername').value.trim();
    const password = document.getElementById('regPassword').value;

    if (!email || !username || !password) {
        alert('กรุณากรอกข้อมูลให้ครบทุกช่อง');
        return;
    }

    // เซฟข้อมูลลง localStorage
    const userData = { email, username, password };
    localStorage.setItem('user_' + email, JSON.stringify(userData));

    // แสดงหน้ายืนยันการสมัครสำเร็จ
    document.getElementById('registerCard').style.display = 'none';
    document.getElementById('successCard').style.display = 'block';
}

// 2. ฟังก์ชันสลับไปหน้าล็อกอิน
function goToLogin() {
    document.getElementById('successCard').style.display = 'none';
    document.getElementById('loginCard').style.display = 'block';
}

// 3. ฟังก์ชันเข้าสู่ระบบและประเมินผลสิทธิ์ (Login & Evaluate)
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

    // --- ส่วนประเมินผลสิทธิ์ใช้งาน ---
    if (VIP_EMAILS.includes(email)) {
        alert('✅ ยินดีต้อนรับสิทธิ์ VIP! อนุมัติเข้าใช้งานฟรี');
        startCloudInstance(user.username);
    } else {
        alert('❌ บัญชีของคุณยังไม่ได้ชำระเงิน กรุณาซื้อแพ็กเกจก่อนใช้งาน');
    }
}

// 4. ฟังก์ชันแสดงหน้าจอ Cloud Phone (เหมือน RedFinger)
function startCloudInstance(username) {
    document.getElementById('loginCard').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    document.getElementById('welcomeUser').innerText = username;

    // จำลองการเชื่อมต่อ สตรีม Android
    console.log("Triggering GitHub Actions Workflows for Redroid...");
}
