drop table _facility;

create table _facility (
Facility_Number		varchar(255),
Facility_Name 		varchar(255),
Common_Name		varchar(255),
Zone			varchar(255),
Region			varchar(255),
District		varchar(255),
Council			varchar(255),
Ward			varchar(255),
Village_Street		varchar(255),
Facility_Type		varchar(255),
Operating_Status	varchar(255),
Ownership		varchar(255),
Registration 		varchar(255),
CTC_Number		varchar(255),
Latitude		varchar(255),
Longitude 		varchar (255));


COPY _facility

FROM 'facility.csv' DELIMITER ',' CSV HEADER;


