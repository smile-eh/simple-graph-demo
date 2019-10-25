MATCH (c_node:Course)-[gc_rel:GOOGLE_CATEGORY]->(gc_node:GoogleCategorization) 
RETURN c_node, gc_rel, gc_node