let currentSelectedPlan = {
    name: "Extreme Compute",
    cpu: "1,200 vCPU",
    ram: "500 GB RAM"
};

function selectPlan(cardElement, name, cpu, ram) {
    document.querySelectorAll('.plan-card').forEach(card => card.classList.remove('active'));
    cardElement.classList.add('active');
    currentSelectedPlan = { name, cpu, ram };
}

document.getElementById('confirm-plan-btn').addEventListener('click', () => {
    document.getElementById('plan-modal').style.display = 'none';
    
    document.getElementById('display-plan-name').textContent = currentSelectedPlan.name;
    const badge = document.getElementById('display-specs');
    badge.textContent = `${currentSelectedPlan.cpu} | ${currentSelectedPlan.ram}`;
    badge.classList.add('active');
    
    document.getElementById('status-dot').className = 'status-dot green';
    document.getElementById('ping').textContent = '12ms';

    document.getElementById('overlay-title').textContent = `${currentSelectedPlan.name} Ready`;
    document.getElementById('overlay-desc').textContent = `Specs: ${currentSelectedPlan.cpu} / ${currentSelectedPlan.ram}`;
    document.getElementById('open-modal-btn').textContent = 'เชื่อมต่อหน้าจอ Cloud Phone';
});

document.getElementById('open-modal-btn').addEventListener('click', () => {
    const btn = document.getElementById('open-modal-btn');
    if (btn.textContent === 'เปิดหน้าเลือกแพ็กเกจ') {
        document.getElementById('plan-modal').style.display = 'flex';
    } else {
        document.getElementById('vmos-overlay').style.display = 'none';
        const frame = document.getElementById('stream-frame');
        frame.style.display = 'block';
        frame.src = 'https://example.com';
    }
});

document.getElementById('change-plan-btn').addEventListener('click', () => {
    document.getElementById('plan-modal').style.display = 'flex';
});

document.getElementById('home-btn').addEventListener('click', () => alert('ส่งคำสั่ง: Home'));
document.getElementById('back-btn').addEventListener('click', () => alert('ส่งคำสั่ง: Back'));
document.getElementById('recent-btn').addEventListener('click', () => alert('ส่งคำสั่ง: Recents'));
