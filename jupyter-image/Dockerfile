# Use the Python Alpine Linux base image
FROM us-docker.pkg.dev/deeplearning-platform-release/gcr.io/base-cpu.py310:m114


LABEL description="Docker image for custom jupyter notebook instances."
COPY requirements.txt /home/

WORKDIR /home

RUN pip --no-cache-dir install -r requirements.txt \
&& rm requirements.txt \
&& rm -rf /tmp/* /root/.cache /root/.npm /usr/lib/python*/ensurepip /usr/lib/python*/turtledemo /usr/lib/python*/test /usr/share/man 



