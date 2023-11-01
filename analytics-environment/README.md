# TB Analytics

This directory consists of sample Jupyter notebooks that contain code for synthetic data generation, data transformations and 1-2 visualizations and final data tables for trends in the cases of TB.

## Files

The directory structure is as follows:
```
analytics-environment
├── BCDataTransformation.ipynb
├── README.md
├── Reporting.ipynb
├── SampleRNotebook.ipynb
├── constants.py
├── generate-synthetic-data.ipynb
└── tests
    ├── BCCaseFileUploading.xlsx
    ├── BCOutcomesUploading.xlsx
    ├── bcdata.xlsx
    └── demographics_data.xlsx
```

It is best to view the notebook files in the following order:

1. [**generate-synthetic-data.ipynb**](generate-synthetic-data.ipynb): Consists of code to generate synthetic Case file and Outcomes file data for Alberta, BC and Manitoba.
2. [**constants.py**](constants.py): Consists of constant values that can be used for synthetic data generation.
3. [**BCDataTransformation.ipynb**](BCDataTransformation.ipynb): Consists of python code to transform the synthetic BC data to the common format.
4. [**Reporting.ipynb**](Reporting.ipynb): Consists of sample visualizations and final data tables for trends from TB data.
5. [**SampleRNotebook.ipynb**](SampleRNotebook.ipynb): Consists of sample R code for processing TB data. 
