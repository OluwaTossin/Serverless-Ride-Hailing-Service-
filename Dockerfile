# Define the base image
FROM public.ecr.aws/lambda/python:3.8

# Copy function code and any additional files to the container
COPY lambda_function.py ./

# Set the CMD to your handler (could also be done as a parameter override outside of the Dockerfile)
CMD [ "lambda_function.lambda_handler" ]
