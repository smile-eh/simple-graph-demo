MATCH (n_cou:Course{code:'X042'})-[r_top:TOPIC]->(n_top:Topic{name_en:'Human Resources'}) 

WITH n_top, n_cou, r_top
MATCH (n_cou)-[r_delvia:DELIVERED_VIA]->(n_deltyp:DeliveryType)

RETURN n_top, n_cou, r_top, r_delvia, n_deltyp