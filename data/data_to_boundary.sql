update district set district=trim(regexp_replace(district , '\s+', ' ', 'g'));


update ward set district_n='Bukoba' where  district_n='Bukoba Rural';
update ward set district_n='Butiam'  where district_n='Butiama';
update ward set district_n='Handeni Mji' where district_n='Handeni Township Authority';

update ward set district_n='Iringa'  where district_n ='Iringa Rural';
update ward set district_n='Kigoma Urban'  where district_n ='Kigoma Municipal-Ujiji';
update ward set district_n='Kigoma'  where district_n = 'Kigoma Rural';

update ward set district_n='Lindi'  where district_n = 'Lindi Rural';
update ward set district_n='Masasi Township Authority'  where district_n ='Masasi Township Authority';
update ward set district_n='Mbeya'  where district_n ='Mbeya Rural';
update ward set district_n='Moshi Urban'  where district_n ='Moshi Municipal';

update ward set district_n='Mpanda'  where district_n ='Mpanda Rural';
update ward set district_n='Mtwara'  where district_n ='Mtwara Rural';

update ward set district_n='Musoma Urban'  where district_n ='Musoma Municipal';
update ward set district_n='Njombe'  where district_n ='Njombe Rural';
update ward set district_n='Nyang''hwale'  where district_n ='Nyang''wale';
update ward set district_n='Shinyanga'  where district_n ='Shinyanga Rural';
update ward set district_n='Songea'  where district_n ='Songea Rural';
update ward set district_n='Sumbawanga'  where district_n ='Sumbawanga Rural';
update ward set district_n='Tanga Urban'  where district_n ='Tanga';






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