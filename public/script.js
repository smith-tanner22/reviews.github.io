document.getElementById('submit-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const type = document.getElementById('type').value;
    const date = document.getElementById('date').value;
    const review = document.getElementById('review').value;
    const rating = document.getElementById('rating').value;
    const imageurl = document.getElementById('imageurl').value;

    fetch('/submit-form', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, type, date, review, rating, imageurl })
    })
    .then(response => response.text())
    .then(data => {
        alert(data) // Show response from the server
    })
    .catch(error => {
        console.error('Error:', error)
    })
})