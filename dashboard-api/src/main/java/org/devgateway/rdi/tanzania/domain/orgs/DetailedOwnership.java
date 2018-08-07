package org.devgateway.rdi.tanzania.domain.orgs;

import javax.persistence.Entity;

/**
 * @author Sebastian Dimunzio
 */

@Entity
public class DetailedOwnership extends Dhis2Item {

    public DetailedOwnership(String name, String dhis2Id) {
        super(name, dhis2Id);
    }

    public DetailedOwnership() {
    }
}
