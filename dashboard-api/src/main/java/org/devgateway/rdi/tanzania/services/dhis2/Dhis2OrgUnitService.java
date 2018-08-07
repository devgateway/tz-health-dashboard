package org.devgateway.rdi.tanzania.services.dhis2;

import com.google.gson.internal.LinkedTreeMap;
import com.vividsolutions.jts.geom.Coordinate;
import com.vividsolutions.jts.geom.GeometryFactory;
import org.devgateway.rdi.tanzania.dhis.Dhis2TClient;
import org.devgateway.rdi.tanzania.domain.orgs.Facility;
import org.devgateway.rdi.tanzania.domain.orgs.FacilityGroup;
import org.devgateway.rdi.tanzania.repositories.FacilityGroupRepository;
import org.geojson.FeatureCollection;
import org.hisp.dhis.Dhis2Config;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Component;

import javax.annotation.PreDestroy;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

/**
 * @author Sebastian Dimunzio
 */
@SpringBootApplication

/*
 * Gets organizaition Unit
 * */

@Component
@Transactional
public class Dhis2OrgUnitService {

    private static final Logger LOGGER = LoggerFactory.getLogger(FeatureCollection.class);


    @Autowired
    Dhis2Config dhis2Config;

    @Autowired
    FacilityGroupRepository facilityGroupRepository;

    public List<Facility> getOrgUnitsList() throws Exception {
        //Custom dhis2Client
        Dhis2TClient dhis2TClient = new Dhis2TClient(dhis2Config);

        ArrayList<Facility> facilities = new ArrayList<>();

        LinkedTreeMap data = dhis2TClient.getObject("/29/organisationUnits.geojson?level=4&fields=*", LinkedTreeMap.class);
        ArrayList<LinkedTreeMap<String, Object>> features = (ArrayList) data.get("features");

        IntStream.range(0, features.size()).forEach(idx -> {

            try {
                LinkedTreeMap feature = features.get(idx);

                LinkedTreeMap<String, Object> props = (LinkedTreeMap<String, Object>) feature.get("properties");

                if (props != null) {
                    Facility f = new Facility();
                    f.setName((String) props.get("name"));
                    f.setCode((String) props.get("code"));

                    List<String> groups = (List<String>) props.get("groups");

                    if (groups != null) {

                        List<FacilityGroup> facilityGroups = groups.stream().map(id -> facilityGroupRepository.findOneByDhis2Id(id))
                                .filter(g -> g != null).collect(Collectors.toList());
                        f.setFacilityGroups(facilityGroups);
                    }



                    f.setDhis2Id((String) feature.get("id"));
                    f.setDhis2ParentId((String) props.get("parent"));

                    GeometryFactory geometryFactory = new GeometryFactory();

                    ArrayList coordinates = (ArrayList) ((LinkedTreeMap) feature.get("geometry")).get("coordinates");
                    if (coordinates != null && coordinates.size() > 0) {
                        try {
                            Object longitude = coordinates.get(0);
                            Object latitude = coordinates.get(1);

                            if (latitude != null && longitude != null) {
                                Double x;
                                Double y;
                                x = Double.parseDouble((String) longitude.toString());
                                y = Double.parseDouble((String) latitude.toString());
                                f.setPoint(geometryFactory.createPoint(new Coordinate(x, y)));


                            }
                        } catch (Exception e) {
                            e.printStackTrace();
                        }

                    }
                    facilities.add(f);
                } else {
                    LOGGER.error("Facility without properties found");
                }

            } catch (Exception e) {
                LOGGER.error(e.getMessage());
            }
        });


        return facilities;
    }


    @PreDestroy
    public void onDestroy() throws Exception {
        System.out.println("Spring Container is destroyed!");
    }


}
