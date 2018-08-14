package org.devgateway.rdi.tanzania.services.dhis2;

import org.devgateway.rdi.tanzania.dhis.pojo.orgUnits.OrgUnitsGroupsResults;
import org.devgateway.rdi.tanzania.domain.FacilityGroup;
import org.devgateway.rdi.tanzania.domain.Item;
import org.devgateway.rdi.tanzania.repositories.ItemRepository;
import org.hisp.dhis.Dhis2Config;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * @author Sebastian Dimunzio
 */

@Service
public class OrgGroupService extends AbstractService {


    @Autowired
    Dhis2Config dhis2Config;

    @Autowired
    ItemRepository itemRepository;

    private static String PATH = "/29/organisationUnitGroups.json";

    public List<FacilityGroup> getOrgGroups() {
        OrgUnitsGroupsResults results = getObjects(OrgUnitsGroupsResults.class,
                PATH, false, "id,organisationUnits,displayName,dimensionItem");

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
