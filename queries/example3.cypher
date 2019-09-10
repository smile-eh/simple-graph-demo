MATCH (c:Course)-[r:TOPIC]->(n:Topic) 
WITH n, c, r 
MATCH (c)-[rr:DELIVERED_VIA]->(d:DeliveryType) 
RETURN n, c, r, rr, d