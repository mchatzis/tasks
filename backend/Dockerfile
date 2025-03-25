# Use the desired base image with Python 3.11
FROM python:3.11-bullseye

# Set the working directory
WORKDIR /usr/src/app

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Install system dependencies
RUN apt-get update

# Create a directory for the app user
RUN addgroup --system appgroup && \
    adduser --system appuser --ingroup appgroup && \
    mkdir -p /home/company/backend && \
    chown -R appuser:appgroup /home/company

# Upgrade pip
RUN python -m pip install --upgrade pip

# Copy the requirements file
COPY ./requirements.txt .

# Create and activate a virtual environment
RUN python -m venv venv
ENV PATH="/usr/src/app/venv/bin:$PATH"

# Install project dependencies
RUN pip install --no-deps -r requirements.txt

# Switch to the app user
USER appuser

# Set the working directory for the app user
WORKDIR /home/company/backend

# Copy the project
COPY --chown=appuser:appgroup . /home/company/backend

# Run entrypoint.sh
CMD ["bash", "/home/company/backend/entrypoint.sh"]
