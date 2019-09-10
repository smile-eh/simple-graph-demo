MATCH (n:Course)-[r:DIRECTOR]->(nn:Person) 

WITH n, r, nn 
MATCH (n)-[rr:PROJECT_LEAD]->(nnn:Person) 

WITH n, nn, nnn, r, rr 
MATCH (n)-[rrr:PROGRAM_MANAGER]->(nnnn:Person) 

WITH n, nn, nnn, nnnn, r, rr, rrr 
MATCH (n)-[rrrr:POINT_OF_CONTACT]->(nnnnn:Person) 

RETURN n, nn, nnn, nnnn, nnnnn, r, rr, rrr, rrrr