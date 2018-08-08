package org.devgateway.rdi.tanzania.services.dhis2;

import org.devgateway.rdi.tanzania.dhis.pojo.OrgUnitsGroupsResults;
import org.devgateway.rdi.tanzania.domain.orgs.FacilityGroup;
import org.devgateway.rdi.tanzania.domain.orgs.Item;
import org.devgateway.rdi.tanzania.repositories.DimensionRepository;
import org.devgateway.rdi.tanzania.repositories.ItemRepository;
import org.hisp.dhis.Dhis2;
import org.hisp.dhis.Dhis2Config;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;
import java.util.stream.Collectors;

/**
 * @author Sebastian Dimunzio
 */

@Service
public class Dhis2OrgGroupService {


    @Autowired
    Dhis2Config dhis2Config;


    @Autowired
    DimensionRepository dimensionRepository;


    @Autowired
    ItemRepository itemRepository;

    private static String PATH = "/29/organisationUnitGroups.json";

    public List<FacilityGroup> getOrgGroups() {

        Dhis2 dhis2 = new Dhis2(dhis2Config);

        OrgUnitsGroupsResults results = dhis2.getObject(UriComponentsBuilder.fromPath(PATH)
                .queryParam("paging", false)
                .queryParam("fields", "id,organisationUnits,displayName,dimensionItem")
                .toUriString(), OrgUnitsGroupsResults.class);


        return results.getOrganisationUnitGroups().stream().map(orgUnitGroup -> {

                    FacilityGroup facilityGroup = new FacilityGroup(orgUnitGroup.getId(), orgUnitGroup.getDisplayName());
                    facilityGroup.setDhis2Id(orgUnitGroup.getId());
                    try {
                        List<Item> items = itemRepository.findByDhis2Id(orgUnitGroup.getDimensionItem());

                        facilityGroup.setItems(items);
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                    return facilityGroup;
                }
        ).collect(Collectors.toList());

    }


}
