package org.devgateway.rdi.tanzania.domain.orgs;

import javax.persistence.Entity;

/**
 * @author Sebastian Dimunzio
 */

@Entity
public class DetailedType extends Dhis2Item {
    public DetailedType(String name, String dhis2Id) {
        super(name, dhis2Id);
    }

    public DetailedType() {
    }
}
