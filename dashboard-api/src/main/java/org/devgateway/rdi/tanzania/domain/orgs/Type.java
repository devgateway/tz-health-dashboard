package org.devgateway.rdi.tanzania.domain.orgs;

import javax.persistence.Entity;

/**
 * @author Sebastian Dimunzio
 */

@Entity
public class Type extends Dhis2Item {

    public Type(String name, String dhis2Id) {
        super(name, dhis2Id);
    }


    public Type() {
    }
}
