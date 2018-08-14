package org.devgateway.rdi.tanzania.services.dhis2;

import org.devgateway.rdi.tanzania.domain.*;
import org.devgateway.rdi.tanzania.services.FacilityService;
import org.devgateway.rdi.tanzania.services.WardService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

/**
 * @author Sebastian Dimunzio
 */

@Service
@Transactional
public class MetaDataImportService {


    private static final Logger LOGGER = LoggerFactory.getLogger(MetaDataImportService.class);

    @Autowired
    WardService wardService;

    @Autowired
    OrgUnitService dhisOrgUnitService;

    @Autowired
    DimensionService dhis2DimensionService;

    @Autowired
    OrgGroupService dhis2OrgGroupService;

    @Autowired
    FacilityService facilityService;

    @Autowired
    DataElementService dhis2DataElementGroupService;


    //deleta all data and import it again
    public void clean() {
        dhis2DataElementGroupService.cleanDataElements();
        dhis2DimensionService.cleanDimensions();
        facilityService.cleanFacilities();

    }

    public void dimensions() {
        LOGGER.info("Getting dimensions");
        List<Dimension> dimensions = dhis2DimensionService.getAllDimensions(true);
        dhis2DimensionService.save(dimensions);
    }


    public void dataElementGroups() {
        List<DataElementGroup> dataElementGroups = dhis2DataElementGroupService.getDataElementGroups();
        dhis2DataElementGroupService.saveGroups(dataElementGroups);
        LOGGER.info(dataElementGroups.toString());
    }

    public void orgUnits() throws Exception {
        List<Facility> facilities = dhisOrgUnitService.getOrgUnitsList();
        LOGGER.info("Got " + facilities.size() + " Facilities");

        facilities.forEach(facility -> {
            //LOGGER.info("Getting ward by point for facility " + f.getName());
            Ward ward = wardService.wadByPoint(facility.getPoint());

            if (ward != null) {
                facility.setWard(ward);
                LOGGER.info("Ward found was" + ward.getName());
            } else {
                LOGGER.warn("No war found for " + facility.getCode() + " - " + facility.getName()
                        + "  with coordinates (" + facility.getPoint() + ")");
            }
        });


        facilities.stream().forEach(facility -> {
                    facility.getFacilityGroups().forEach(facilityGroup -> {
                                facilityGroup.getItems().forEach(item -> {
                                    if (item.getDimension().getName().equalsIgnoreCase("Type")) {
                                        facility.setType(item);
                                    }
                                    if (item.getDimension().getName().equalsIgnoreCase("Detailed Type")) {
                                        facility.setDetailedType(item);
                                    }
                                    if (item.getDimension().getName().equalsIgnoreCase("Ownership")) {
                                        facility.setOwnership(item);
                                    }
                                    if (item.getDimension().getName().equalsIgnoreCase("Detailed Ownership")) {
                                        facility.setDetailedOwnership(item);
                                    }
                                });
                            }

                    );
                }


        );

        facilityService.save(facilities);


    }


    public void orgUnitsGroups() {
        List<FacilityGroup> facilityGroups = dhis2OrgGroupService.getOrgGroups();
        facilityService.saveGroups(facilityGroups);
    }


}
