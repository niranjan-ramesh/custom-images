library(readxl)
library(writexl)
library("ggplot2")

#Load data from file
file_path_incoming_data <- "analytics-population/data/INACData.xlsx"
file_path_outgoing_data <- "analytics-population/data/CTBRSResults.xlsx"

full_data <- as.data.frame(
  read_excel(
    file_path_incoming_data, sheet = 2, range = "A6:K195", col_names = FALSE
  )
)

#Define default data lines count which belong to a region
count_values <- 19

#Function of transforming loaded data into a vector
get_data <- function(income_data, vector_number, count_lines = NULL) {
  data_set <- c()

  for (i in seq_along(income_data[[vector_number]])) {
    value <- income_data[[vector_number]][i]

    if (is.na(value)) {
      next
    }

    data_set <- c(data_set, value)

    if (!is.null(count_lines) && i == count_lines) {
      return(data_set)
    }
  }

  return(data_set)
}

#Creating data vectors (columns)
regions <- get_data(full_data, 1)
ages <- get_data(full_data, 2, count_values)
total_count <- get_data(full_data, 3)
male_count <- get_data(full_data, 4)
female_count <- get_data(full_data, 5)

#Preparing data object in current table format incoming data
structured_data <- list()
index <- 1

for (region in regions) {
  for (age in ages) {
    list <- list()
    list[[age]] <- c(
      total_count[index],
      male_count[index],
      female_count[index]
    )
    structured_data[[ region ]] <- c(structured_data[[ region ]], list)
    index <- index + 1
  }
}

#Processing data.
#As an example we make a one result table in a different format data
ages_column <- c()

for (name_region in names(structured_data)) {
  for (data_region in  structured_data[name_region]) {
    for (name_age in  names(data_region)) {
      ages_column <- c(ages_column, name_age)
    }

    break
  }

  break
}

region_column <- list()

for (name_region in names(structured_data)) {
  amount_column <- c()

  for (data_region in  structured_data[name_region]) {
    for (name_age in  names(data_region)) {
      for (data_age in  data_region[name_age]) {
        amount_column <- c(amount_column, data_age[1])
      }
    }
  }

  region_column[[name_region]] <- amount_column
}


#Saving data
data_frame_out <- data.frame(
  `Age group` = c(ages_column)
)

for (region in names(region_column)) {
  data_frame_out <- cbind(data_frame_out, amount = region_column[region])
  names(data_frame_out)[names(data_frame_out) == "amount"] <- region
}

write_xlsx(data_frame_out, file_path_outgoing_data)

#Graphic
ggplot(data_frame_out, aes(Canada,Age.group)) + geom_col()