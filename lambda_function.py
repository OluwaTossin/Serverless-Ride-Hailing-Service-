import json

def lambda_handler(event, context):
    # Parse the request body
    pickup_location = event.get('pickupLocation', '')
    dropoff_location = event.get('dropoffLocation', '')

    # Simulate processing the ride request
    message = f"Ride requested from {pickup_location} to {dropoff_location}."
    
    return {
        'statusCode': 200,
        'body': json.dumps({'message': message})
    }
