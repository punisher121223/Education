window.onload = () => {
    let user = localStorage.getItem('currentUser');
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let currentUser = users.find(u => u.username === user);

    if (currentUser.profile) {
        document.getElementById('first-name').value = currentUser.profile.firstName || '';
        document.getElementById('last-name').value = currentUser.profile.lastName || '';
        if (currentUser.profile.image) {
            document.getElementById('profile-pic').src = currentUser.profile.image;
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
    let user = localStorage.getItem('currentUser');
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let currentUser = users.find(u => u.username === user);

    currentUser.profile = { firstName, lastName, image };
    localStorage.setItem('users', JSON.stringify(users));
    alert('پروفایل با موفقیت ذخیره شد!');
}
