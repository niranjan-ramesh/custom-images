'''
DATA_PROVIDERS mocks out what multiple providers at multiple levels of aggregation
could look like.

For example, an individual clinic could register as a provider and submit a spreadsheet
directly to PHAC. Alternatively, a province could submit a "rolled up" spreadsheet
that includes indidividual providers within that province.
'''
DATA_PROVIDERS = [
    'Ottawa, Ontario Clinic XYZ',
    'Ontario Hospital Toronto 1',
    'Other Ontario',
    'Quebec',
    'Quebec - Montreal Hospital 1',
    'Quebec - Montreal Clinic 1',
    'Nova Scotia',
    'New Brunswick',
    'PEI',
    'Newfoundland and Labrador',
    'Alberta',
    'MB - Winnipeg',
    'MB - Other',
    'Sask',
    'BC',
    'YT',
    'NWT',
    'Nunavut'
]

ALPHANUMERIC = 'abcdefghijklmnopqrstuvwxyz0123456789'

PTS = [
    "Alberta",
    "British Columbia",
    "Manitoba",
    "New Brunswick",
    "Newfoundland and Labrador",
    "Nova Scotia",
    "Ontario",
    "Prince Edward Island",
    "Quebec",
    "Saskatchewan",
    "Northwest Territories",
    "Nunavut",
    "Yukon"
]

ORIGINS = [
    'Status Indian',
    'Metis',
    'Inuit',
    'Non-Status Indian',
    'Canadian Born',
    'Foreign Born',
    'Unknown'
]

REGIONS = [
    "EMR",
    "EUR",
    "AFR",
    "AMR",
    "SEAR",
    "WPR",
    "Unknown"
]

IMMIGRATION_STATUS = [
    "Permanent Resident",
    "Foreign-born Canadian Citizen",
    "Convention Refugee",
    "Other Current Immigration Status",
    "Refugee",
    "Refugee Claimant",
    "Student Permit",
    "Unknown",
    "Visitor",
    "Work Permit",
    ""
]

RISK_FACTORS = [
    "Yes",
    "No",
    "Unknown",
    "",
]

CASE_FINDING = [
    "Symptoms compatible with site of disease",
    "Incidental finding",
    "Immigration medical surveillance",
    "Contact Investigation",
    "Post-mortem",
    "Occupational Screening",
    "Other screening",
    "Other",
    "Unknown"
]

TROUBLES = [
    "Yes",
    "No"
]

HIV_STATUS = [
    "Negative",
    "Positive",
    "Test not offered",
    "Test refused",
    "Unknown",
]