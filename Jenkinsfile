pipeline {
    agent any
    
    environment {
        // AWS Region for your resources
        AWS_DEFAULT_REGION = 'us-east-1'
        // Your Lambda function names
        LAMBDA_FUNCTION_REQUEST_RIDE = 'RequestRide'
        LAMBDA_FUNCTION_LIST_RIDES = 'ListRides'
        LAMBDA_FUNCTION_ACCEPT_RIDE = 'AcceptRide'
        // S3 bucket name for the frontend assets
        S3_BUCKET_NAME = 'ride-hailing-service-frontend'
        // Docker image name (local build, not ECR push since you're using Docker Desktop)
        DOCKER_IMAGE_NAME = 'ride-hailing-service-backend'
    }
    
    stages {
        stage('Build') {
            steps {
                echo 'Building Docker image...'
                sh "docker build -t ${DOCKER_IMAGE_NAME} ."
                echo 'Building frontend assets...'
                // Assuming you have a build script in your package.json
                sh 'npm install && npm run build'
            }
        }
        
        stage('Test') {
            steps {
                echo 'Running backend tests...'
                // Add your backend test commands here
                // For example, Python unit tests
                sh 'python -m unittest discover'

                echo 'Running frontend tests...'
                // Add your frontend test commands here
                // For example, if you're using React and Jest
                sh 'npm test'
            }
        }
        
        stage('Deploy') {
            steps {
                echo 'Deploying backend to AWS Lambda...'
                // Zip the Lambda function code
                sh 'zip -r function.zip .'
                // Update Lambda functions for each action
                sh "aws lambda update-function-code --function-name ${LAMBDA_FUNCTION_REQUEST_RIDE} --zip-file fileb://function.zip"
                sh "aws lambda update-function-code --function-name ${LAMBDA_FUNCTION_LIST_RIDES} --zip-file fileb://function.zip"
                sh "aws lambda update-function-code --function-name ${LAMBDA_FUNCTION_ACCEPT_RIDE} --zip-file fileb://function.zip"

                echo 'Uploading frontend assets to S3...'
                // Sync built frontend assets to the S3 bucket
                sh "aws s3 sync ./build s3://${S3_BUCKET_NAME} --delete"
            }
        }
    }
    post {
        always {
            echo 'Cleaning up...'
            // Cleanup after deployment
            sh 'rm -rf function.zip'
            sh 'rm -rf build'
            // Optionally remove Docker image to save space
            sh "docker rmi ${DOCKER_IMAGE_NAME}"
        }
    }
}
