"""
Purpose of this file:
    This script will read a csv that has the following columns:
        course_code,course_description_en,course_description_fr,business_type_en,business_type_fr,..... other fields unimportant
    The script will read each line
    For each line it will determine if the description start with '<h2>Description</h2> <p>' and ends with '</p>'
    If it does not, it excludes the line from the output
    If it does
        It removes the tags
        It adds the updated line to the output list
    Once all lines have been read it outputs the file to a new name
"""

import csv
import numpy

"""
Purpose of this method
    Main method, begin the program and call each method to complete the task of the script
    Algo:
        Read the file
        Remove the lines that wont be used
        Clean the remaining records
        Output the file
"""
def begin_cleanup():
    ## data = [[str:course_code],[str:desc_eng],[str:desc_fr],[str:business_type_eng],[str:business_type_fr],[str:other....]] 
    # data_raw = read_file(filename)
    # data_proper_lines = clean_file_only_proper_lines(data_raw)
    # data_final = clean_file_remove_tags(data_proper_lines)
    # output_file(data_final)
    input_filename = "./data/raw_course_info.csv"
    data_raw = read_file(input_filename)
    data_proper_lines = clean_file_only_proper_lines(data_raw)
    data_final = clean_file_remove_tags(data_proper_lines)
    write_file(data_final)
    print(data_final)

"""
Purpose of this method
    This will read a csv file and return an array of arrays of strings
    example: [[str:course_code],[str:desc_eng],[str:desc_fr],[str:business_type_eng],[str:business_type_fr],[str:other....]]
"""
def read_file(filename):
    line_list = []
    with open(filename, "r") as f:
        reader = csv.reader(f)
        line_list = list(reader)
    return numpy.asarray(line_list)

"""
Purpose of this method
    This will iterate through an array of arrays of strings
    For each record if the 2nd (index 1) and 3rd (index 2) record, if it contains the expected value it keeps it
    For all other records they are ignored and not returned to the calling parent 
"""

def clean_file_only_proper_lines(data_raw):
    proper_line_list = []
    for record in data_raw:
        if record[1].startswith("<h2>Description</h2> <p>"):
            proper_line_list.append(record)
    return proper_line_list

"""
Purpose of this method
    This will iterate through an array of arrays of strings
    For each record it will strip '<h2>Description</h2> <p>' and '</p>' from the 2nd (index 1) and 3rd (index 2) record
    The updated array will be returned to the calling parent
"""
def clean_file_remove_tags(data_proper_lines):
    tagless_list = []
    for record in data_proper_lines:
        new_record = record
        
        new_record[1] = new_record[1].replace("<h2>Description</h2> <p>", "")
        new_record[1] = new_record[1].replace("</p>", "")
         
        new_record[2] = new_record[2].replace("<h2>Description</h2> <p>", "")
        new_record[2] = new_record[2].replace("</p>", "")
        
        tagless_list.append(new_record)
    return tagless_list


"""
Purpose of this method
    This will accept an 2D array of strings and output this to a csv
    Each line will be a new row
    Each index of inner array will be a new record, seperated by a comma
"""
def write_file(data_to_write):
    with open("eggs.csv", "w") as csvfile:
        spamwriter = csv.writer(csvfile, delimiter="|")
        for record in data_to_write:
            spamwriter.writerow(record)
    print("done")

if __name__ == "__main__":
    begin_cleanup()