const form = document.querySelector('form');
const idCardContainer = document.querySelector('.id-card');
idCardContainer.style.display = 'none';

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const course = document.getElementById('course').value;
  const id = document.getElementById('id').value;
  const dob = document.getElementById('dob').value;
  const email = document.getElementById('email').value;
  const title = document.querySelector('input[name="title"]:checked')?.value || '';

  const photoInput = document.getElementById('photo');
  let photoURL = 'https://randomuser.me/api/portraits/men/32.jpg';
  if(photoInput.files && photoInput.files[0]) {
    photoURL = URL.createObjectURL(photoInput.files[0]);
  }

  idCardContainer.querySelector('.card-photo').src = photoURL;
  idCardContainer.querySelector('.card-name').innerText = name;
  idCardContainer.querySelector('.card-title').innerText = title;
  idCardContainer.querySelector('.card-course').innerText = course;
  idCardContainer.querySelector('.card-id').innerText = id;
  idCardContainer.querySelector('.card-dob').innerText = dob;
  idCardContainer.querySelector('.card-email').innerText = email;

  idCardContainer.style.display = 'flex';
  idCardContainer.scrollIntoView({ behavior: 'smooth' });
});