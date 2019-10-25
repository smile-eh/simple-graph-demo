"""
Purpose of this file:
    This script will read a csv that has the following columns:
        Course Code/ Code du Cours,Course Title/ Titre du Cours (English/ Anglais),Course Title/ Titre du Cours (French/ Fran�ais),Business Type (English /Anglais),Business Type (French /Fran�ais ),Provider / Fournisseur,Description (EN),Description (FR)..... other fields unimportant
    The script will read each line for, record that is provided, 
        Read the description
        Classify using Google NLP
        Set the Auto-Classified column (index X) to the return from google
    Once all lines have been read it outputs the file to a new name
"""
import csv
import numpy
from google_classifier import get_category


class CSVClassifier:
    """
    Purpose of this class:
        Provided a CSV file and a column/header
        Add a new column/header to the end called "Auto_Classified"
        For each record in that column
            Send the contents of the record to an NLP classifier
            Add the return value from the classifier to the "Auto_Classified" column
        
        Output the updated file to a new file

    Creation
        Initialize with CSV location and column, &
        Initialize with only CSV location, &
        Initialize with only column, &
        Initialize without any field set, &
            -No info currently. Accepted behaviour, but set all before using.
                One should be able to reuse this class, but update the column to classify a second column

    Usage:
        Calling classify_file() with CSV location and column:
            -Performs as expected
        
        Calling classify_file() with only CSV location set:
            -Throws error - set column before using
        
        Calling classify_file() with only column set:
            -Throws error - set CSV location before using

        Calling classify_file() with a column that does not exist:
            -Throws error - column not found, check columns in csv file
    """

    file_location = None
    column_header = None
    csv_file = None

    def __init__(self, file_location=None, column_header=None):
        self.file_location = file_location
        self.column_header = column_header
        self.column_index = 6  # DEFAULT VALUE

    def classify_file(self):
        """
        Purpose of this method:
            Checks that required fields are set
            Checks if the file exists
            Reads the file
            Determines if the columnn header exists in the file
        """
        good_in_the_world = True
        if self.file_location is None:
            raise RuntimeError("error - set CSV location before using")
        if self.column_header is None:
            raise RuntimeError("error - set column before using")

        # raw data, straight from csv
        data_raw = self.read_file()

        # data with only the records that have a description we can work with
        data_proper_lines = self.clean_file_only_proper_lines(data_raw)

        for r in data_proper_lines[0:2]:
            print(r)

        # match the supplied column header with the index
        # self.column_index = self.get_index_of_column_header()

        # data with the new header
        data_new_headers = self.add_google_header(data_proper_lines)

        # data with the classifications according to google
        data_classified_descriptions = self.classify_descriptions(data_new_headers)

        self.write_file(data_classified_descriptions)

    """
    Purpose of this method
        This will read a csv file and return an array of arrays of strings
        example: [[str:course_code],[str:desc_eng],[str:desc_fr],[str:business_type_eng],[str:business_type_fr],[str:other....]]
    """

    def read_file(self):
        line_list = []
        with open(self.file_location, "r", encoding="ISO-8859-1") as f:
            reader = csv.reader(f, delimiter=",", quotechar='"')
            line_list = list(reader)
        return numpy.asarray(line_list)

    """
    Puprose of th is method:
        Update the headers of a list, adding a new column when printing to a CSV
        Adds the google_classification header to the end of a list
    """

    def add_google_header(self, csv_list):
        csv_list[0] = numpy.concatenate(
            (csv_list[0], numpy.array(["google_classification"]))
        )
        return csv_list

    """
    Purpose of this method:
        For each cleaned record that is provided, 
            Read the description
            Classify using Google NLP
            Set the Auto-Classified column (index X) to the return from google
    """

    def classify_descriptions(self, csv_list):
        # for all the records in the list (except the first record)
        x = 1
        list_length = len(csv_list)
        for record in csv_list[1:]:
            auto_classify = get_category(record[self.column_index])
            print(record[self.column_index])
            if auto_classify:
                class_string = auto_classify[0].name
                print(class_string)
                print("Record {} of {}".format(x, list_length))
            else:
                class_string = ""
            csv_list[x] = numpy.concatenate((csv_list[x], numpy.array([class_string])))
            x = x + 1
        return csv_list

    """
    Purpose of this method
        This will accept an 2D array of strings and output this to a csv
        Each line will be a new row
        Each index of inner array will be a new record, seperated by a comma
    """

    def write_file(self, data_to_write):
        with open("./data/output_1.csv", "w", encoding="utf-8") as csvfile:
            writer = csv.writer(
                csvfile, delimiter=",", quotechar='"', quoting=csv.QUOTE_MINIMAL
            )
            for record in data_to_write:
                writer.writerow(record)
        print("Completed output to data/output_1.csv")

    """
    Purpose of this method
        This will iterate through an array of arrays of strings
        For each record if the 2nd (index 1) and 3rd (index 2) record, if it contains the expected value it keeps it
        For all other records they are ignored and not returned to the calling parent 
    """

    def clean_file_only_proper_lines(self, data_raw):
        # Create an array of lines that we are keeping
        proper_line_list = []
        # Add the header line to the output
        proper_line_list.append(data_raw[0])
        for record in data_raw[1:]:
            # if the descriptions is one we have cleanup function for, add it to output
            if record[self.column_index].startswith("#N/A") is False:
                proper_line_list.append(record)
        return proper_line_list

    def __does_column_exist__(self):
        """
        Purpose of this method:
            Returns whether or not self.file_location exists
        """


def begin_classification():
    print("Begin classification...")
    classifier = CSVClassifier(
        file_location="./data/csps_working_product_list_test.csv",
        column_header="Description (EN)",
    )
    classifier.classify_file()
    print("End classification...")


if __name__ == "__main__":
    begin_classification()
