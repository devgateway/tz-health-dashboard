package org.devgateway.rdi.tanzania.services.dhis2.analytics;

import org.devgateway.rdi.tanzania.dhis.analytics.QueryBuilder;
import org.devgateway.rdi.tanzania.dhis.analytics.QueryDimension;
import org.devgateway.rdi.tanzania.dhis.analytics.QueryUtil;
import org.devgateway.rdi.tanzania.dhis.analytics.results.AnalyticsResultsTable;
import org.devgateway.rdi.tanzania.domain.*;
import org.devgateway.rdi.tanzania.repositories.*;
import org.hisp.dhis.Dhis2;
import org.hisp.dhis.Dhis2Config;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * @author Sebastian Dimunzio
 */

@Service
public class Dhis2OPDDiagnosesService extends Dhis2AnalyticImport<OPDDiagnostic> {

    private static final Logger LOGGER = LoggerFactory.getLogger(Dhis2OPDDiagnosesService.class);

    @Autowired
    Dhis2Config dhis2Config;

    @Autowired
    DataElementRepository dataElementRepository;

    @Autowired
    DataElementGroupRepository dataElementGroupRepository;

    @Autowired
    DimensionRepository dimensionRepository;


    @Autowired
    ItemRepository itemRepository;


    @Autowired
    FacilityRepository facilityRepository;

    @Autowired
    OPDDiagnosticRepository opdDiagnosticRepository;

    public List<OPDDiagnostic> save(List<OPDDiagnostic> diagnostics) {
        opdDiagnosticRepository.save(diagnostics);
        opdDiagnosticRepository.flush();
        return diagnostics;

    }


    @Override
    public List<OPDDiagnostic> _byFacilities(List<Facility> facilities, QueryDimension period) {

        List<OPDDiagnostic> opdDiagnostics = new ArrayList<>();

        LOGGER.info("->: Getting Diagnoses of " + facilities.size() + " facilities");
        if (facilities.size() > 0) {

            Dhis2 dhis2 = new Dhis2(dhis2Config);

            //"jfnNzTy6eUL";"OPD Diagnoses"
            DataElementGroup group = dataElementGroupRepository.findOneByDhis2Id("jfnNzTy6eUL");

            //Elements to import = ALL OPD
            List<DataElement> elements = group.getDataElements();

            //13767;"l2RYQfC9SfV";"Age"
            Dimension age = dimensionRepository.findOneByDhis2Id("l2RYQfC9SfV");

            QueryDimension dx = QueryUtil.dxDimension(QueryUtil.dataElemenst2Items(elements));

            QueryDimension ageDimension = new QueryDimension(age).
                    setItems(QueryUtil.items2Items(new ArrayList<>(age.getItems())));


            QueryDimension ouDimension = QueryUtil.ouDimension(QueryUtil.org2sItems(facilities));

            QueryBuilder queryBuilder = QueryBuilder.geInstance()
                    .addDimension(dx)
                    .addDimension(ageDimension)
                    .addDimension(period)
                    .addDimension(ouDimension);

            AnalyticsResultsTable resultsTable = dhis2.getObject(queryBuilder.build(), AnalyticsResultsTable.class);


            if (resultsTable.getRows().size() > 0) {
                LOGGER.info("Got " + resultsTable.getRows().size() + " rows of  " + facilities.size() + " facilities");


                resultsTable.getRows().forEach(strings -> {

                    OPDDiagnostic opdDiagnostic = new OPDDiagnostic();
                    String dataID = strings[0];
                    String ageID = strings[1];
                    String dateStr = strings[2];
                    String facilityID = strings[3];
                    String valueStr = strings[4];

                    if (valueStr != null && !valueStr.isEmpty()) {
                        DataElement diagnostic = dataElementRepository.findOneByDhis2Id(dataID);
                        opdDiagnostic.setDiagnostic(diagnostic);
                        opdDiagnostic.setYear(Integer.parseInt(dateStr.substring(0, 4)));
                        opdDiagnostic.setMonth(Integer.parseInt(dateStr.substring(4, 6)));

                        Integer quarter = ((Double) Math.ceil(opdDiagnostic.getMonth() / 3d)).intValue();

                        opdDiagnostic.setQuarter(quarter);

                        opdDiagnostic.setAge(itemRepository.findByDhis2Id(ageID));
                        opdDiagnostic.setValue(new Double(Double.parseDouble(valueStr)).intValue());
                        Facility f = facilities.stream().filter(facility -> facility.getDhis2Id().equalsIgnoreCase(facilityID)).findAny().get();
                        opdDiagnostic.setFacility(f);
                        opdDiagnostic.setWard(f.getWard());

                        opdDiagnostics.add(opdDiagnostic);
                    }

                });

            }


        }
        save(opdDiagnostics);
        return opdDiagnostics;
    }


    public void clean(Region r, Integer year) {
        opdDiagnosticRepository.deleteUsingRegion(r.getGid(), year);
    }
}
