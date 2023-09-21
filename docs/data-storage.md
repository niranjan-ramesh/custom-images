# Data Storage

The proposed storage solution is one or more [Google Cloud Storage (GCS)](https://cloud.google.com/storage) buckets. There are a few reasons that object storage is being proposed.

1. The workload is analytical rather than transactional.
2. Data flows are one-way (i.e. data producers voluntarily submit data to PHAC)
3. Object storage is usually much less expensive per GB of data stored compared to managed database solutions.
4. Between [GCS FUSE](https://cloud.google.com/storage/docs/gcs-fuse) and native integration of GCS object storage with common data manipulation libraries such as [pandas](https://pandas.pydata.org/), end users can interact with GCS in a way that is very familiar to the filesystem interface they are used to.

## Data Flows

![Data Flows Diagram](/docs/data-storage-diagrams/data-flows.svg)