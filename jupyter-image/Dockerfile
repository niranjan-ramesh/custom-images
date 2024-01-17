# Use the Python Alpine Linux base image
FROM python:3.10-alpine

LABEL description="Docker image for custom Python jupyter kernel in Vertex AI managed notebook instances."

COPY requirements.txt /user/
WORKDIR /user

# Install build dependencies
RUN apk --no-cache add --virtual build-deps gcc=13.2.1_git20231014-r0 \
    linux-headers=6.5-r0 \
    build-base=0.5-r3 \
    libffi-dev=3.4.4-r3 \
# Install python dependencies
&& pip --no-cache-dir install -r requirements.txt \
# Delete build dependencies
&& apk del build-deps

WORKDIR /home

# Cleanup unnecessary files
RUN rm -rf /tmp/* /root/.cache /root/.npm /usr/lib/python*/ensurepip /usr/lib/python*/turtledemo /usr/lib/python*/test /usr/share/man /user

EXPOSE 8080
ENTRYPOINT ["jupyter", "lab", "--ip=0.0.0.0", "--port=8080", "NotebookApp.open_browser = False", 'ServerApp.token = ""', 'ServerApp.password = ""', "ServerApp.port = 8080", 'ServerApp.allow_origin_pat = "(^https://8080-dot-[0-9]+-dot-devshell\.appspot\.com$)|(^https://colab\.(?:sandbox|research)\.google\.com$)|(^(https?://)?[0-9a-z\-]+\.[0-9a-z\-]+\.cloudshell\.dev$)|(^(https?://)ssh\.cloud\.google\.com/devshell$)"', "ServerApp.allow_remote_access = True"]
