psql -Upostgres -d tanzania -c "truncate table boundary"
psql -Upostgres -d tanzania -c "drop table if exists region"
psql -Upostgres -d tanzania -c "drop table if exists district"
psql -Upostgres -d tanzania -c "drop table if exists ward"

shp2pgsql  tza_popa_adm1_regions_TNBS2012_OCHA.shp  public.region| psql -Upostgres -d tanzania
shp2pgsql  tza_popa_adm2_districts_TNBS2012_OCHA.shp public.district| psql -Upostgres -d tanzania
shp2pgsql  tza_popa_adm3_wards_census2012_TNBS_MapAction_OCHA.shp  public.ward| psql -Upostgres -d tanzania

psql -Upostgres -dtanzania < data_to_boundary.sql




