document.getElementById('requestRideForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const pickupLocation = document.getElementById('pickupLocation').value;
    const dropoffLocation = document.getElementById('dropoffLocation').value;

    // Here you would make an API call to your backend to request a ride
    console.log(`Requesting ride from ${pickupLocation} to ${dropoffLocation}`);

    // Reset form after submission or show a message
    alert('Ride requested successfully!');
    this.reset();
});
