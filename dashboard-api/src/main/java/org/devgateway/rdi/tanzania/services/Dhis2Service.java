package org.devgateway.rdi.tanzania.services;

import org.devgateway.rdi.tanzania.dhis.pojo.PaginatedResults;
import org.hisp.dhis.Dhis2;
import org.hisp.dhis.Dhis2Config;
import org.hisp.dhis.query.Filter;
import org.hisp.dhis.query.Order;
import org.hisp.dhis.query.Paging;
import org.hisp.dhis.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Iterator;

/**
 * @author Sebastian Dimunzio
 */

public abstract class Dhis2Service {


    @Autowired
    Dhis2Config dhis2Config;


}


