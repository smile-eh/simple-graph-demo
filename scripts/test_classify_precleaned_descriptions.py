import pytest
from classify_precleaned_descriptions import CSVClassifier


def test_fields_good_no_errors():
    """
    What this is testing:
        This is testing a 'good' scenario
        When .classify_file is called no errors should be thrown
        pytest will catch if any are thrown
        essentially asserting that 1 == 1
    """
    test_classifier = CSVClassifier(
        file_location="./data/test_data.csv", column_header="Description (EN)"
    )
    test_classifier.classify_file()
    # no errors, a.k.a. 1==1
    assert 1 is 1


def test_csv_field_not_set():
    """
    What this is testing:
        This is testing when the file location is not set
        When .classify_file is called RunTimeError should be thrown
        that runtime error should have the text:
            "error - set CSV location before using"
    """
    test_classifier = CSVClassifier(column_header="Description (EN)")
    with pytest.raises(RuntimeError) as error_info:
        test_classifier.classify_file()
    assert "set CSV location" in str(error_info.value)


def test_column_field_not_set():
    """
    What this is testing:
        This is testing when the file location is not set
        When .classify_file is called RunTimeError should be thrown
        that runtime error should have the text:
            "error - set column before using"
    """
    test_classifier = CSVClassifier(file_location="./data/test_data.csv")
    with pytest.raises(Exception) as error_info:
        test_classifier.classify_file()
    assert "set column" in str(error_info.value)


# uncomment for use when creating and debugging tests
"""
if __name__ == "__main__":
    test_csv_field_not_set()
"""
