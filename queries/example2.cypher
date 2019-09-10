MATCH (c:Course)-[r:TOPIC]->(n:Topic{name_en:'Human Resources'})

WITH n, c, r
MATCH (c)-[rr:DELIVERED_VIA]->(d:DeliveryType)

RETURN n, c, r, rr, d