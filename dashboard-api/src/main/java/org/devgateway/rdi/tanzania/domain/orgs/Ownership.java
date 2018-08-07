package org.devgateway.rdi.tanzania.domain.orgs;

import javax.persistence.Entity;

/**
 * @author Sebastian Dimunzio
 */

@Entity
public class Ownership extends Dhis2Item {
    public Ownership(String name, String dhis2Id) {
        super(name, dhis2Id);
    }

    public Ownership() {
    }
}
