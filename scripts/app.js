const databasePath = 'db/users.json';

// التسجيل
document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const user = { fullName, email, password };

    // حفظ المستخدم في قاعدة البيانات
    const response = await fetch(databasePath);
    const users = await response.json();

    users.push(user);

    await fetch(databasePath, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(users, null, 2)
    });

    alert('تم إنشاء الحساب بنجاح!');
    window.location.href = 'login.html';
});

// تسجيل الدخول
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const response = await fetch(databasePath);
    const users = await response.json();

    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
        alert('تم تسجيل الدخول بنجاح!');
        window.location.href = 'index.html';
    } else {
        alert('معلومات تسجيل الدخول غير صحيحة!');
    }
});

// تحميل المستخدمين في لوحة التحكم
window.onload = async () => {
    const usersTable = document.getElementById('usersTable')?.querySelector('tbody');

    if (usersTable) {
        const response = await fetch(databasePath);
        const users = await response.json();

        users.forEach((user) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.fullName}</td>
                <td>${user.email}</td>
                <td><button>إزالة</button></td>
            `;
            usersTable.appendChild(row);
        });
    }
};
