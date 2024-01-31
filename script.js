document.getElementById('requestRideForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const pickupLocation = document.getElementById('pickupLocation').value;
    const dropoffLocation = document.getElementById('dropoffLocation').value;

    // Prepare the data to be sent in the POST request
    const requestData = {
        pickupLocation: pickupLocation,
        dropoffLocation: dropoffLocation
    };

    // The URL to your API Gateway endpoint for requesting a ride
    const apiEndpoint = 'https://a1y8egpsx4.execute-api.us-east-1.amazonaws.com/dev/ride-requests';

    // Use fetch API to make the POST request
    fetch(apiEndpoint, {
        method: 'POST',
        body: JSON.stringify(requestData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log(data); // You can handle the response data here
        alert('Ride requested successfully!');
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
        alert('Failed to request ride.');
    });

    // Reset form after submission
    this.reset();
});
