package org.devgateway.rdi.tanzania.services.dhis2;

import org.devgateway.rdi.tanzania.domain.Diagnostic;
import org.devgateway.rdi.tanzania.domain.Ward;
import org.devgateway.rdi.tanzania.domain.orgs.*;
import org.devgateway.rdi.tanzania.repositories.*;
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
public class Dhis2MetaDataImportService {

    private static final Logger LOGGER = LoggerFactory.getLogger(Dhis2MetaDataImportService.class);

    @Autowired
    DimensionRepository dimensionRepository;

    @Autowired
    Dhis2OrgUnitService dhis2Facility;

    @Autowired
    Dhis2DiagnosesService dhis2DiagnosesService;

    @Autowired
    Dhis2DimensionService dhis2DimensionService;

    @Autowired
    WardRepository wardRepository;

    @Autowired
    DiagnosticRepository diagnosticRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    Dhis2OrgGroupService dhis2OrgGroupService;

    @Autowired
    FacilityRepository facilityRepository;

    @Autowired
    FacilityGroupRepository facilityGroupRepository;


    //deleta all data and import it again
    public void clean(){
        facilityRepository.deleteAllInBatch();
        facilityGroupRepository.deleteAllInBatch();
        categoryRepository.deleteAllInBatch();

    }


    public void orgUnitsImport() throws Exception {
        List<Facility> facilities = dhis2Facility.getOrgUnitsList();
        LOGGER.info("Got " + facilities.size() + " Facilities");
        facilities.forEach(facility -> {
            //LOGGER.info("Getting ward by point for facility " + f.getName());
            Ward ward = wardRepository.findWardByPoint(facility.getPoint());

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
                                facilityGroup.getItems().forEach(dhis2Item -> {
                                    if (dhis2Item instanceof Type) {
                                        facility.setType((Type) dhis2Item);
                                    }
                                    if (dhis2Item instanceof DetailedType) {
                                        facility.setDetailedType((DetailedType) dhis2Item);
                                    }

                                    if (dhis2Item instanceof Ownership) {
                                        facility.setOwnership((Ownership) dhis2Item);
                                    }
                                    if (dhis2Item instanceof DetailedOwnership) {
                                        facility.setDetailedOwnership((DetailedOwnership) dhis2Item);
                                    }
                                });
                            }

                    );
                }


        );

        facilityRepository.save(facilities);
        facilityRepository.flush();

    }

    public void diagnosisImport() throws Exception {
        List<Diagnostic> diagnostics = dhis2DiagnosesService.getDiagnoses();
        diagnosticRepository.save(diagnostics);
    }

    public void orgUnitsRelatedDimensionsImport() {
        dimensionRepository.deleteAll();
        dimensionRepository.flush();

        List<Type> types = dhis2DimensionService.getTypes();
        List<Ownership> ownerships = dhis2DimensionService.getOwnerships();
        List<DetailedOwnership> detailedOwnershipList = dhis2DimensionService.getDetailedOwnerships();
        List<DetailedType> detailedTypeList = dhis2DimensionService.getDetailedTypes();
        categoryRepository.save(types);
        categoryRepository.save(ownerships);
        categoryRepository.save(detailedOwnershipList);
        categoryRepository.save(detailedTypeList);
        categoryRepository.flush();
    }

    public void orgUnitsGroupsImport() {
        List<FacilityGroup> facilityGroups = dhis2OrgGroupService.getOrgGroups();
        facilityGroupRepository.save(facilityGroups);
    }


}
