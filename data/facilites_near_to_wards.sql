update facility as f set ward_gid=t.ward_id
from
	facility f1 ,
	get_nearest_ward_by_facility(f1.id) as t(distance double precision,
	facility_id bigint,
	facility_name varchar,
	ward_id bigint,
	ward_name varchar)

where f1.ward_gid is null  and f1.point is not null   and f1.id=f.id
