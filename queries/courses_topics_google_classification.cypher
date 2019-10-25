MATCH (c_node:Course)-[t_rel:TOPIC]->(t_node:Topic) 
WITH c_node, t_rel, t_node
MATCH (c_node)-[gc_rel:GOOGLE_CATEGORY]->(gc_node:GoogleCategorization) 
RETURN c_node, t_rel, t_node, gc_rel, gc_node