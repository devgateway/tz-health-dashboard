CREATE OR REPLACE FUNCTION public.get_nearest_ward_by_facility(bigint)
  RETURNS record AS
$BODY$
DECLARE
	ret record;
BEGIN
raise notice 'Value: %', $1;

select ST_Distance(a.point,b.geom) ,a.id, a.name,b.gid,b.name into ret from  facility a , boundary b where  id=$1 and b.dtype='WARD' order by ST_Distance(a.point,b.geom)  asc limit 1;
RETURN ret;
END;
$BODY$
 LANGUAGE plpgsql;



update facility as f set ward_gid=t.ward_id
from
	facility f1 ,
	get_nearest_ward_by_facility(f1.id) as t(distance double precision,
	facility_id bigint,
	facility_name varchar,
	ward_id bigint,
	ward_name varchar)

where f1.ward_gid is null  and f1.point is not null   and f1.id=f.id
