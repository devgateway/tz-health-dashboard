package org.devgateway.rdi.tanzania.services.dhis2;

import org.devgateway.rdi.tanzania.domain.*;
import org.devgateway.rdi.tanzania.repositories.FacilityGroupRepository;
import org.devgateway.rdi.tanzania.repositories.OPDDiagnosticRepository;
import org.devgateway.rdi.tanzania.repositories.RMNCHRepository;
import org.devgateway.rdi.tanzania.repositories.ServiceAreaPopulationRepository;
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

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;

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


    @Autowired
    ServiceAreaPopulationRepository serviceAreaPopulationRepository;

    @Autowired
    OPDDiagnosticRepository opdDiagnosticRepository;

    @Autowired
    RMNCHRepository rmnchRepository;

    @Autowired
    FacilityGroupRepository facilityGroupRepository;

    @PersistenceContext
    private EntityManager manager;

    //deleta all data and import it again
    public void clean() {
        serviceAreaPopulationRepository.deleteAllInBatch();
        opdDiagnosticRepository.deleteAllInBatch();
        rmnchRepository.deleteAllInBatch();


        dhis2DataElementGroupService.cleanDataElements();

        facilityService.cleanGroups();
        facilityService.cleanFacilities();

        dhis2DimensionService.cleanDimensions();
    }

    public List<Item> dimensionsItems() {

        HashSet<Item> items = new HashSet<>();

        LOGGER.info("Getting dimensions");
        List<Dimension> dimensions = dhis2DimensionService.getAllDimensions();


        dimensions.forEach(dimension -> {

            dhis2DimensionService.save(dimension);
            List<Item> its = dhis2DimensionService.getDimensionItems(dimension);

            its.forEach(item -> {
                Item theFinalItem = item;

                if (items.stream().filter(item1 -> item1.getDhis2Id().equalsIgnoreCase(item.getDhis2Id())).count() > 0) {
                    theFinalItem = items.stream().filter(item1 -> item1.getDhis2Id().equalsIgnoreCase(item.getDhis2Id())).findFirst().get();
                    LOGGER.info("Reused " + item.getName());
                }

                theFinalItem.addDimension(dimension);
                items.add(theFinalItem)

                ;
            });

        });
        return dhis2DimensionService.saveItems(new ArrayList<>(items));
    }


    public List<DataElementGroup> dataElementGroups() {
        List<DataElementGroup> dataElementGroups = dhis2DataElementGroupService.getDataElementGroups();
        return dhis2DataElementGroupService.saveGroups(dataElementGroups);

    }

    public List<DataElementGroup> dataElements(List<DataElementGroup> groups) {
        groups.forEach(dataElementGroup -> {

            List<DataElement> dataElements = dhis2DataElementGroupService.getDataElements(dataElementGroup.getDhis2Id());
            dataElements.forEach(dataElement -> dataElement.setDataElementGroup(dataElementGroup));
            dataElementGroup.setDataElements(dataElements);
        });


        return dhis2DataElementGroupService.saveGroups(groups);

    }

    public List<Facility> addWard(List<Facility> facilities) {
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
        return facilities;
    }

    public List<Facility> orgUnits() {
        List<Facility> facilities = dhisOrgUnitService.getOrgUnitsList();
        LOGGER.info("Got " + facilities.size() + " Facilities");

        addWard(facilities);

        facilities.stream().forEach(facility -> {
                    facility.getFacilityGroups().forEach(facilityGroup -> {

                        FacilityGroup facilityGroup1 = facilityGroupRepository.findOne(facilityGroup.getId());


                        if (facilityGroup1.getItem() != null) {
                            if (facilityGroup1.getItem().getDimensions().stream()
                                    .filter(dimension -> dimension.getName().equalsIgnoreCase("Type"))
                                    .findFirst().isPresent()) {
                                facility.setType(facilityGroup1.getItem());
                            }
                            if (facilityGroup1.getItem().getDimensions().stream()
                                    .filter(dimension -> dimension.getName().equalsIgnoreCase("Detailed Type"))
                                    .findFirst().isPresent()) {
                                facility.setDetailedType(facilityGroup1.getItem());
                            }
                            if (facilityGroup1.getItem().getDimensions().stream()
                                    .filter(dimension -> dimension.getName().
                                            equalsIgnoreCase("Ownership")).findFirst().isPresent()) {
                                facility.setOwnership(facilityGroup1.getItem());
                            }
                            if (facilityGroup1.getItem().getDimensions().stream()
                                    .filter(dimension -> dimension.getName().equalsIgnoreCase("Detailed Ownership"))
                                    .findFirst().isPresent()) {
                                facility.setDetailedOwnership(facilityGroup1.getItem());
                            }
                        }

                    });
                }


        );

        return facilityService.save(facilities);

    }


    public List<FacilityGroup> orgUnitsGroups() {
        List<FacilityGroup> facilityGroups = dhis2OrgGroupService.getOrgGroups();
        return facilityService.saveGroups(facilityGroups);
    }

    public void importMedata() {
        dimensionsItems();

        orgUnitsGroups();

        List<DataElementGroup> dataElementGroups = dataElementGroups();

        //Import data Element of needed groups

        List<DataElementGroup> dataElementGroups1 = dataElementGroups.stream()
                .filter(dataElementGroup ->
                        dataElementGroup.getName().equalsIgnoreCase("Population") ||
                                dataElementGroup.getName().equalsIgnoreCase("OPD Diagnoses") ||
                                dataElementGroup.getName().equalsIgnoreCase("ANC Visits and Vaccination") ||
                                dataElementGroup.getName().equalsIgnoreCase("L&D: Kujifungua (Delivery)") ||
                                dataElementGroup.getName().equalsIgnoreCase("Child Health: Vaccination Services") ||
                                dataElementGroup.getName().equalsIgnoreCase("Child Health: Growth, Vit A & Deworming") ||
                                dataElementGroup.getName().equalsIgnoreCase("ANC: Malaria and Other Services")

                ).collect(Collectors.toList());

        dataElements(dataElementGroups1);

        orgUnits();

    }

}
