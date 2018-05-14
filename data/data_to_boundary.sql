insert into boundary (dtype,geom,gid,name,population,population_male,population_female)
select
'REGION' as dtype,
geom,
nextval('hibernate_sequence') as gid,
region as name ,
pop12 as population,
male12 as population_male,
female12 as population_female
from region;



insert into boundary (dtype,geom,gid,name,population,population_male,population_female,region_gid)
select
'DISTRICT' as dtype,
d.geom,
nextval('hibernate_sequence')  as gid,
d.district as name ,
d.pop12 as population,
d.male12 as population_male,
d.female12 as population_female,
b.gid as region_id
from district d left join boundary b on d.region=b.name and dtype='REGION';


insert into boundary (dtype,geom,gid,name,ward_type,division,population,population_male
,population_female
,population_rural
,population_rural_male
,population_rural_female
,population_urban
,population_urban_male
,population_urban_female
,district_gid)

select  'WARD' as dtype,
d.geom,
nextval('hibernate_sequence')  as gid,
d.ward_name as name ,
d.ward_type as ward_type,
d.division as division,
d.total_both as population,
d.total_male as population_male,
d.total_fema as population_female,

d.rural_both as population_rural,
d.rural_male as population_rural_male,
d.rural_fema as population_rural_female,

d.urban_both as population_urban,
d.urban_male as population_urban_male,
d.urban_fema as population_urban_female,

b.gid as disctrict_id

from ward d left join boundary b on d.district_n=b.name and dtype='DISTRICT' ;