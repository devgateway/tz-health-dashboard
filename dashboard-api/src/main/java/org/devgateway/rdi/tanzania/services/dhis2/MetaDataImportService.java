package org.devgateway.rdi.tanzania.services.dhis2;

import org.devgateway.rdi.tanzania.domain.*;
import org.devgateway.rdi.tanzania.services.FacilityService;
import org.devgateway.rdi.tanzania.services.WardService;
import org.devgateway.rdi.tanzania.services.dhis2.metadata.DataElementService;
import org.devgateway.rdi.tanzania.services.dhis2.metadata.DimensionService;
import org.devgateway.rdi.tanzania.services.dhis2.metadata.OrgGroupService;
import org.devgateway.rdi.tanzania.services.dhis2.metadata.OrgUnitService;
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
        facilityService.cleanGroups();
        facilityService.cleanFacilities();
        dhis2DimensionService.cleanDimensions();

    }

    public List<Dimension> dimensions() {
        LOGGER.info("Getting dimensions");
        List<Dimension> dimensions = dhis2DimensionService.getAllDimensions(true);
        dhis2DimensionService.save(dimensions);
        return dimensions;
    }


    public List<DataElementGroup> dataElementGroups() {
        List<DataElementGroup> dataElementGroups = dhis2DataElementGroupService.getDataElementGroups();
        dhis2DataElementGroupService.saveGroups(dataElementGroups);
        return dataElementGroups;
    }

    public List<DataElementGroup> dataElements(List<DataElementGroup> groups) {
        groups.forEach(dataElementGroup -> {
            List<DataElement> dataElements = dhis2DataElementGroupService.getDataElements(dataElementGroup.getDhis2Id());
            dataElements.forEach(dataElement -> dataElement.setDataElementGroup(dataElementGroup));
            dataElementGroup.setDataElements(dataElements);
        });


        dhis2DataElementGroupService.saveGroups(groups);
        return groups;
    }

    public void orgUnits() {
        List<Facility> facilities = dhisOrgUnitService.getOrgUnitsList();
        LOGGER.info("Got " + facilities.size() + " Facilities");

        facilities.forEach(facility -> {
            //LOGGER.info("Getting ward by point for facility " + f.getName());
            Ward ward = wardService.wadByPoint(facility.getPoint());

            if (ward != null) {
                facility.setWard(ward);
                LOGGER.info("Ward found was" + ward.getName());

            } else {
                LOGGER.warn("No ward found for " + facility.getCode() + " - " + facility.getName()
                        + "   coordinates are (" + facility.getPoint() + ")");
            }
        });


        facilities.stream().forEach(facility -> {
                    facility.getFacilityGroups().forEach(facilityGroup -> {

                        if (facilityGroup.getItem() != null) {
                            if (facilityGroup.getItem().getDimensions().stream()
                                    .filter(dimension -> dimension.getName().equalsIgnoreCase("Type")).findFirst().isPresent()) {
                                facility.setType(facilityGroup.getItem());
                            }
                            if (facilityGroup.getItem().getDimensions().stream()
                                    .filter(dimension -> dimension.getName().equalsIgnoreCase("Detailed Type")).findFirst().isPresent()) {
                                facility.setDetailedType(facilityGroup.getItem());
                            }
                            if (facilityGroup.getItem().getDimensions().stream()
                                    .filter(dimension -> dimension.getName().equalsIgnoreCase("Ownership")).findFirst().isPresent()) {
                                facility.setOwnership(facilityGroup.getItem());
                            }
                            if (facilityGroup.getItem().getDimensions().stream()
                                    .filter(dimension -> dimension.getName().equalsIgnoreCase("Detailed Ownership")).findFirst().isPresent()) {
                                facility.setDetailedOwnership(facilityGroup.getItem());
                            }
                        }

                    });
                }


        );

        facilityService.save(facilities);

    }


    public void orgUnitsGroups() {
        List<FacilityGroup> facilityGroups = dhis2OrgGroupService.getOrgGroups();
        facilityService.saveGroups(facilityGroups);
    }


}
