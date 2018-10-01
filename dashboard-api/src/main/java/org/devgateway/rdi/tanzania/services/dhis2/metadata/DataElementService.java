package org.devgateway.rdi.tanzania.services.dhis2.metadata;

import org.devgateway.rdi.tanzania.dhis.pojo.MetaDataResponse;
import org.devgateway.rdi.tanzania.domain.DataElement;
import org.devgateway.rdi.tanzania.domain.DataElementGroup;
import org.devgateway.rdi.tanzania.domain.Translation;
import org.devgateway.rdi.tanzania.repositories.DataElementGroupRepository;
import org.devgateway.rdi.tanzania.repositories.TranslationRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;
import java.util.stream.Collectors;

/**
 * @author Sebastian Dimunzio
 */

@Service
public class DataElementService extends Dhis2Service {


    private static final Logger LOGGER = LoggerFactory.getLogger(DataElementService.class);


    private static String PATH = "/29/dataElementGroups";

    @Autowired
    TranslationRepository translationRepository;
    @Autowired
    DataElementGroupRepository dataElementGroupRepository;

    public List<DataElementGroup> getDataElementGroups() {
        MetaDataResponse groups = getObjects(MetaDataResponse.class, PATH, false, "id,displayName");
        return groups.getDataElements()
                .stream()
                .map(dhis2Object -> new DataElementGroup(dhis2Object.getId(), dhis2Object.getDisplayName()))
                .collect(Collectors.toList());

    }


    public List<DataElement> getDataElements(String key) {

        MetaDataResponse results = getObjects(MetaDataResponse.class,
                UriComponentsBuilder.fromPath(PATH)
                        .pathSegment(key)
                        .pathSegment("dataElements")
                        .toUriString(),
                false, "*");


        return results.getDataElements().stream().map(dhis2Object -> {

            DataElement dataElement = new DataElement(dhis2Object.getId(), dhis2Object.getDisplayName());
            List<Translation> ts = translationRepository.findByKey(dhis2Object.getId());
            if (ts != null && ts.size() > 0) {
                //if translation are locally provided
                dataElement.setTranslations(ts);
            } else if (dhis2Object.getTranslations() != null && dhis2Object.getTranslations().size() > 0) {
                dhis2Object.getTranslations().forEach(translation -> {
                    //get dhis2 translations
                    if (translation.getProperty().equalsIgnoreCase("NAME")) {
                        Translation t = new Translation();
                        t.setLocale(translation.getLocale());
                        t.setKey(dataElement.getDhis2Id());
                        t.setValue(translation.getValue());
                        t.setProvided(false);
                        dataElement.addTranslations(t);

                    }
                });

            }


            return dataElement;
        }).collect(Collectors.toList());

    }

    public List<DataElementGroup> saveGroups(List<DataElementGroup> dataElementGroups) {
        return dataElementGroupRepository.save(dataElementGroups);
    }

    public void cleanDataElements() {
        dataElementGroupRepository.deleteAll();
    }

}
