package org.devgateway.rdi.tanzania.services.dhis2.analytics;

import org.devgateway.rdi.tanzania.dhis.analytics.QueryBuilder;
import org.devgateway.rdi.tanzania.dhis.analytics.QueryDimension;
import org.devgateway.rdi.tanzania.dhis.analytics.QueryUtil;
import org.devgateway.rdi.tanzania.dhis.analytics.results.AnalyticsResultsTable;
import org.devgateway.rdi.tanzania.domain.DataElement;
import org.devgateway.rdi.tanzania.domain.Facility;
import org.devgateway.rdi.tanzania.domain.RMNCH;
import org.devgateway.rdi.tanzania.domain.Region;
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
public class Dhis2RMNNCHService extends Dhis2AnalyticImport<RMNCH> {

    private static final Logger LOGGER = LoggerFactory.getLogger(Dhis2RMNNCHService.class);

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
    RMNCHRepository rmnchRepository;


    public List<RMNCH> save(List<RMNCH> items) {
        rmnchRepository.save(items);
        rmnchRepository.flush();
        return items;
    }


    public void clean(Region r) {
        rmnchRepository.deleteUsingRegion(r.getGid());
    }

    @Override
    public List<RMNCH> byFacilities(List<Facility> facilities, QueryDimension period) {

        List<RMNCH> results = new ArrayList<>();

        LOGGER.info("->:" + facilities.size() + " facilities will be processed");
        if (facilities.size() > 0) {

            Dhis2 dhis2 = new Dhis2(dhis2Config);

            List<DataElement> elementList = new ArrayList<>();

            //"ZbmHzUkeJbQ";"ANC Waliopewa Iron/ Folic vidonge vya Kutosha"
            elementList.add(dataElementRepository.findOneByDhis2Id("ZbmHzUkeJbQ"));

            //"WAdaCligbNP";"ANC Umri wa mimba chini ya wiki 12 (< 12weeks)"
            elementList.add(dataElementRepository.findOneByDhis2Id("WAdaCligbNP"));

            //"yqA1CfsfBHQ";"ANC Hudhurio la nne wajawazito wote"
            elementList.add(dataElementRepository.findOneByDhis2Id("yqA1CfsfBHQ"));

            //"RyNkn76uTJo";"ANC Wajawazito waliopata Chanjo ya TT2+"
            elementList.add(dataElementRepository.findOneByDhis2Id("RyNkn76uTJo"));

            //"Zn1VXPl11BD";"Nyongeza ya Vitamin A Watoto chini ya umri wa mwaka 1"
            elementList.add(dataElementRepository.findOneByDhis2Id("Zn1VXPl11BD"));

            //"Nd5BDnxVEP0";"Nyongeza ya Vitamin A Watoto umri zaidi ya mwaka 1 - 5"
            elementList.add(dataElementRepository.findOneByDhis2Id("Nd5BDnxVEP0"));

            //"KTXcMFWnbrP";"Watoto Waliochanjwa Polio"
            elementList.add(dataElementRepository.findOneByDhis2Id("KTXcMFWnbrP"));

            //"V2ZzQl7dgVF";"Watoto Waliochanjwa Penta"
            elementList.add(dataElementRepository.findOneByDhis2Id("V2ZzQl7dgVF"));

            //"DPLR0aQemYC";"Waliozalishwa na Watoa Huduma Wenye Ujuzi"
            elementList.add(dataElementRepository.findOneByDhis2Id("DPLR0aQemYC"));


            QueryDimension dx = QueryUtil.dxDimension(QueryUtil.dataElemenst2Items(elementList));

            QueryDimension ouDimension = QueryUtil.ouDimension(QueryUtil.org2sItems(facilities));

            QueryBuilder queryBuilder = QueryBuilder.geInstance()
                    .addDimension(dx)
                    .addDimension(period)
                    .addDimension(ouDimension);


            AnalyticsResultsTable resultsTable = dhis2.getObject(queryBuilder.build(), AnalyticsResultsTable.class);


            if (resultsTable.getRows().size() > 0) {
                resultsTable.getRows().forEach(strings -> {
                    RMNCH rmnch = new RMNCH();
                    String dataID = strings[0];
                    String dateStr = strings[1];
                    String facilityID = strings[2];
                    String valueStr = strings[3];

                    if (valueStr != null && !valueStr.isEmpty()) {
                        DataElement dataElement = dataElementRepository.findOneByDhis2Id(dataID);
                        rmnch.setIndicator(dataElement);
                        rmnch.setYear(Integer.parseInt(dateStr.substring(0, 4)));
                        rmnch.setMonth(Integer.parseInt(dateStr.substring(4, 6)));

                        Integer quarter = ((Double) Math.ceil(rmnch.getMonth() / 3d)).intValue();
                        rmnch.setQuarter(quarter);
                        rmnch.setValue(new Double(Double.parseDouble(valueStr)).intValue());
                        Facility f = facilities.stream().filter(facility -> facility.getDhis2Id().equalsIgnoreCase(facilityID)).findAny().get();
                        rmnch.setFacility(f);
                        results.add(rmnch);
                    }

                });


            }


        }
        return save(results);
    }


}
