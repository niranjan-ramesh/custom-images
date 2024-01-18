# Use the Python Alpine Linux base image
FROM us-docker.pkg.dev/deeplearning-platform-release/gcr.io/base-cpu.py310:m114
# FROM gcr.io/deeplearning-platform-release/sklearn-cpu.py310

LABEL description="Docker image for custom jupyter notebook instances."
COPY requirements.txt /home/

WORKDIR /home

RUN pip --no-cache-dir install -r requirements.txt \
&& rm -rf requirements.txt \
/opt/conda/pkgs/dlenv-base-1.0.20231210-py310_0/share/jupyter/lab/staging/node_modules \
/usr/local/share/.cache