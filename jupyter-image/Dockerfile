# Use the Python Alpine Linux base image
FROM us-docker.pkg.dev/deeplearning-platform-release/gcr.io/base-cpu.py310:m114
# FROM gcr.io/deeplearning-platform-release/sklearn-cpu.py310


LABEL description="Docker image for custom jupyter notebook instances."
COPY requirements.txt /home/

WORKDIR /home

RUN pip --no-cache-dir install -r requirements.txt \
&& npm install --global d3-color@3.1.0 ejs@3.1.7 http-cache-semantics@4.1.1 \
&& rm requirements.txt \
&& rm -rf /tmp/* /root/.cache /root/.npm /usr/lib/python*/ensurepip /usr/lib/python*/turtledemo /usr/lib/python*/test /usr/share/man 
