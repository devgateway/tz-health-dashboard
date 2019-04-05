 ## Prerequisites

 - PostgreSQL => 9.5
 - Postgis => 2.3.1
- Java JDK => 1.8.0_144 or OpenJDK  =>1.8.0_181
- Node => v4.7.2
- NPM => 3.5.2
- GitHub Client  
- Maven 3.x

### Configuring 
There are a few parameters that has to be visited before compiling.
API configuration application.properties

    #database connection url 
    spring.datasource.url= jdbc:postgresql://localhost:5432/tanzania
    #database user name 
    spring.datasource.username=postgres
    #database user password
    spring.datasource.password=PG_PASSWORD
    server.port = 8083
    #Compiled UI files
    ui.path=/opt/tanzania/ui
    User Interface configuration  api.js
    

### API Server URL & Port
    const API_ROOT_URL = (document.location.hostname === 'localhost') ? 'http://localhost:8083' : '';
    //API Endpoints configuration
    const API_REGIONS = API_ROOT_URL + '/geo/regions'
    const API_DISTRICTS = API_ROOT_URL + '/geo/districts'
    const API_WARDS = API_ROOT_URL + '/geo/wards'
    const API_WARD_INFO = API_ROOT_URL + '/wards'
    const API_WARD_REPORT_INFO = `${API_ROOT_URL}/wards`
    const API_FACILITY_REPORT_INFO = `${API_ROOT_URL}/facilities`
    const API_FACILITIES = `${API_ROOT_URL}/facilities`


## Compiling 
The project is comprised of two modules: the UI module and the API module. The API runs as a standalone web application. The UI is served by the embedded web server as static content, therefore the UI should be compiled before compiling and packaging the API module.
 #### User Interface (UI)
To build the UI you should have installed the following prerequisites.
GitHub Client  
Node => v4.7.2
NPM => 3.5.2

    cd dashboard-ui
    npm install
    npm run build

Compiled code will be placed into build folder.

#### API 
To build the API  you should have installed the following prerequisites.

 - GitHub Client  
 - Java JDK => 1.8.0_144 or OpenJDK  =>1.8.0_181 
 - Maven 3.x

    cd dashboard-api
    mvn clean compile install package 
    Running 
    Prerequisites 
    PostgreSQL => 9.5
    Postgis => 2.3.1
    Java JDK => 1.8.0_144 or OpenJDK  =>1.8.0_181

Before running you have to create the database and ensure the PostGIS extension has been installed.
The createdb tool creates a new PostgreSQL database.

	createdb -Upostgres tanzania

Under the bin folder you can find a series of scripts that will help to run the application. Before running it, you have to copy the compiled jar into the bin folder and the UI compiled files into the previous configured UI PATH (see Configuring section). 

    cp dashboard-api/target/dashboard-api-1.0-SNAPSHOT.jar bin
    cp -r dashboard-ui/build/* {PATH_TO_UI_STATIC_FILES}
    cd bin
    ./dashboard.sh  

During the first run, the application will create all tables. In the second execution, the system will add postgis extension to the database and create table indices. 

## Filling the database 
Once the application is running, you can open the http://localhost:8083 to open the landing page. The first time you open the database, it will be empty as no data is served from the API to the UI. 

The first data-set that has to be loaded into the database is the list of administrative divisions and the related census data. 
Once the application is running, you can open the http://localhost:8083 and open the home page. At this time, the database is empty and no data is served from the API to the UI.  

**Administrative Division & Census Data** 
The first dataset that has to be loaded into the database is the list of administrative divisions and the 2012 census information.

Under the data folder you will find the script file load_boundaries.sh which contains the sequence of commands needed to load the dataset:

	 cd data
	./load_boundaries.sh  


**DHIS2 Metadata** 
The system requires having a local copy of some DHIS2 metadata such as Dimensions, Data Elements, Org Units Groups, Organisation Units List (Facilities), etc. Together with the web dashboard, there are two others tools compiled in the compiled jar:a metadata Import tool and an analytic Import tool. 
Scripts are provided under the folder to run each of the tools.

	cd bin
	./metadata_import.sh  


**Updating Orphan Facilities**
During metadata import, the system attempts to assign an administrative boundary to each facility by using the facility coordinates. However, in some cases due to a lack of precision, the system cannot make the assignment. An additional SQL script has been added which tries to fix this problem by getting the nearest ward using the st_distance PostGIS function. The sql file can be located under the data folder.

>  psql -Upostgres -dtanzania < facilites_near_to_wards.sql

**Automatic Configuration**
By setting the spring property **spring.jpa.hibernate.ddl-auto** to **create**, the system will create all tables, load boundary data, run metadata import, and update orphan facilities. Auto configuration can be achieved by running the following command:

> ./dashboard.sh --spring.jpa.hibernate.ddl-auto=create 

**Analytic Data** 
The system consumes DHIS2 Analytic data to fulfill ward and facility reports. DG has developed a custom DHIS2 Analytic Client which is packaged and compiled together with the dashboard classes. The tool has a pre-set configuration to capture current dashboard data, but it can be easily extended in the future in order to add any other extra information that may be required for feeding new dashboard features. 

A script is provided under the bin folder which can be used to launch the analytic import:

	cd bin
	./analityc_import.sh 

The script requires two mandatory parameters, region name and year. The following command will import 2018 data of facilities in Dar Es Salaam Region: 

> analityc_import.sh -r "Dar es salaam"  -y2018

The data imported will include: Catchment Population, Out-Patient Diseases and RMNCH statistics.

By passing the -c parameter, the system will clean up any existing data for the given region and year.  Additionally, the import accepts the -d parameter, which can be used to define which dataset has to be imported (by default all datasets will be imported). The -d parameters should be used together with one of the following options:  PO (Population), OP (OPD), or RM (RMNCH).
The command below will clean up 2018 OPD data for all facilities in Dar es Salaam region and import it again:

	analityc_import.sh -r "Dar es salaam" -y2018 -dOP -c



