MATCH (n:Course)-[r:DIRECTOR]->(nn:Person) 
WITH n, r, nn 
MATCH (n)-[rr:PROJECT_LEAD]->(nnn:Person) 
WITH n, nn, nnn, r, rr 
RETURN n, nn, nnn, r, rr