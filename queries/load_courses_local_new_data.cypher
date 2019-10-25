// For each row we will

// Create a Course with
// 	course_code = record[0]
// 	course_desc_en = record[1]
// 	course_desc_fr = record[2]
// 	displayed_on_gccampus_en = record[7]
// 	displayed_on_gccampus_fr = record[8]
// 	duration = record[9]
// 	required_en = record[14]
// 	required_fr = record[15]

// Create a BusinessType with
// 	type_en = record[3]
// 	type_fr = record[4]
// 	Relate from Course with relationship BUSINESS_TYPE

// Create a Provider with
// 	name_en = record[5]
// 	name_fr = record[6]
// 	Relate from Course with relationship PROVIDED_BY

// Create a Topic with
// 	name_en = record[10]
// 	name_fr = record[11]
// 	Relate from Course with relationship TOPIC

// Create a BusinessLine with
// 	name_en = record[12]
// 	name_fr = record[13]
// 	Relate from Course with relationship BUSINESS_LINE

// Create a Community with
// 	name_en = record[16]
// 	name_fr = record[17]
// 	Relate from Course with relationship COMMUNITY

// Create a Person with
// 	name = record[18]
// 	Relate from Course with relationship POINT_OF_CONTACT

// Create a Person with
// 	name = record[19]
// 	Relate from Course with relationship DIRECTOR

// Create a Person with
// 	name = record[20]	
// 	Relate from Course with relationship PROGRAM_MANAGER

// Create a Person with
// 	name = record[21]	
// 	Relate from Course with relationship PROJECT_LEAD

// Create a GoogleCategorization with
//  Category = record[22]
//    Relate from Course with relationship GOOGLE_CATEGORY

// Download the data
CALL apoc.load.csv("output_1.csv", {sep:',', quoteChar:'"'}) YIELD map as row 

//Create a Course
WITH row 
MERGE(c:Course{code:row.Course_Code, description_en:row.Description_en, description_fr:row.Description_fr})

// Create a GoogleCategorization with relationship GOOGLE_CATEGORY
WITH c, row
MERGE(gc:GoogleCategorization{category:row.google_classification})

WITH c, gc, row
MERGE (c)-[:GOOGLE_CATEGORY]->(gc)