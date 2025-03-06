window.onload = () => {
    let currentUser = localStorage.getItem('currentUser');
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let user = users.find(u => u.username === currentUser);

    if (currentUser === 'guest') {
        document.getElementById('guest-section').style.display = 'block';
        document.getElementById('user-section').style.display = 'none';
    } else {
        document.getElementById('guest-section').style.display = 'none';
        document.getElementById('user-section').style.display = 'block';

        if (user.profile) {
            document.getElementById('first-name').value = user.profile.firstName || '';
            document.getElementById('last-name').value = user.profile.lastName || '';
            if (user.profile.image) {
                document.getElementById('profile-pic').src = user.profile.image;
            }
        }
    }
};

function saveProfile() {
    let firstName = document.getElementById('first-name').value;
    let lastName = document.getElementById('last-name').value;
    let imageInput = document.getElementById('profile-pic-upload');
    let image = '';

    if (imageInput.files[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
            image = e.target.result;
            saveProfileData(firstName, lastName, image);
        };
        reader.readAsDataURL(imageInput.files[0]);
    } else {
        saveProfileData(firstName, lastName, image);
    }
}

function saveProfileData(firstName, lastName, image) {
    let currentUser = localStorage.getItem('currentUser');
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let user = users.find(u => u.username === currentUser);

    user.profile = { firstName, lastName, image };
    localStorage.setItem('users', JSON.stringify(users));
    alert('پروفایل با موفقیت ذخیره شد!');
}
