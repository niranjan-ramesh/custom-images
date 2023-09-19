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