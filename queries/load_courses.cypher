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

// Download the data
CALL apoc.load.csv("https://raw.githubusercontent.com/smile-eh/simple-graph-demo/master/data/course_info_cleaned.csv", {sep:"|"}) YIELD map as row 

//Create a Course
WITH row 
MERGE(c:Course{code:row.course_code, description_en:row.course_description_en, description_fr:row.course_description_fr, displayed_on_gccampus_en:row.displayed_on_gccampus_en, displayed_on_gccampus_fr:row.displayed_on_gccampus_fr, duration:row.duration, required_en:row.required_training_en, required_fr:row.required_training_fr})

// Create a BusinessType
WITH c, row
MERGE(bt:DeliveryType{type_en:row.business_type_en, type_fr:row.business_type_fr})

WITH c, bt, row
MERGE (c)-[:DELIVERED_VIA]->(bt)

// Create a Provider
WITH c, row
MERGE(p:Provider{name_en:row.provider_en, name_fr:row.provider_fr})

WITH c, p, row
MERGE (c)-[:PROVIDED_BY]->(p)

// Create a Topic
WITH c, row
MERGE(t:Topic{name_en:row.main_topic_en, name_fr:row.main_topic_fr})

WITH c, t, row
MERGE (c)-[:TOPIC]->(t)

// Create a BusinessLine
WITH c, row
MERGE(bl:BusinessLine{name_en:row.business_line_en, name_fr:row.business_line_fr})

WITH c, bl, row
MERGE (c)-[:BUSINESS_LINE]->(bl)

// Create a Community
WITH c, row
MERGE(com:Community{name_en:row.communities_en, name_fr:row.communities_fr})

WITH c, com, row
MERGE (c)-[:COMMUNITY]->(com)

// Create a Person with relationship POINT_OF_CONTACT
WITH c, row
MERGE(ppoc:Person{name:row.point_of_contact})

WITH c, ppoc, row
MERGE (c)-[:POINT_OF_CONTACT]->(ppoc)

// Create a Person with relationship DIRECTOR
WITH c, row
MERGE(pd:Person{name:row.director})

WITH c, pd, row
MERGE (c)-[:DIRECTOR]->(pd)

// Create a Person with relationship PROGRAM_MANAGER
WITH c, row
MERGE(ppm:Person{name:row.program_manager})

WITH c, ppm, row
MERGE (c)-[:PROGRAM_MANAGER]->(ppm)

// Create a Person with relationship PROJECT_LEAD
WITH c, row
MERGE(ppl:Person{name:row.project_lead})

WITH c, ppl, row
MERGE (c)-[:PROJECT_LEAD]->(ppl)