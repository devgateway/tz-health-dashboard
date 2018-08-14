package org.devgateway.rdi.tanzania.services.dhis2;

import org.devgateway.rdi.tanzania.dhis.pojo.Results;
import org.devgateway.rdi.tanzania.domain.DataElementGroup;
import org.devgateway.rdi.tanzania.repositories.DataElementGroupRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * @author Sebastian Dimunzio
 */

@Service
public class DataElementService extends AbstractService {


    private static final Logger LOGGER = LoggerFactory.getLogger(DataElementService.class);


    private static String PATH = "/29/dataElementGroups.json";

    @Autowired
    DataElementGroupRepository dataElementGroupRepository;

    public List<DataElementGroup> getDataElementGroups() {
        Results groups = getObjects(Results.class, PATH, false, "id,displayName");
        return groups.getDataElements()
                .stream()
                .map(dhis2Object -> new DataElementGroup(dhis2Object.getId(), dhis2Object.getDisplayName()))
                .collect(Collectors.toList());

    }

    public List<DataElementGroup> saveGroups(List<DataElementGroup> dataElementGroups) {
        return dataElementGroupRepository.save(dataElementGroups);
    }

    public void cleanDataElements(){
        dataElementGroupRepository.deleteAll();
    }
}
