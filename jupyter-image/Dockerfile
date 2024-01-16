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

RUN apk add openssh-server
RUN adduser -D jupyteruser

USER jupyteruser
EXPOSE 8080

ENTRYPOINT exec jupyter lab --ip=0.0.0.0 --port=8080 --no-browser --NotebookApp.token="" --ServerApp.allow_origin="*"



