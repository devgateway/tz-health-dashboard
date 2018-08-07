package org.devgateway.dialect;

import org.hibernate.dialect.function.StandardSQLFunction;


/**
* @author Sebastian Dimunzio
*/

public class Dialect extends org.hibernate.spatial.dialect.postgis.PostgisPG9Dialect {
    public Dialect() {
        super();
        this.registerFunction("simplify", new StandardSQLFunction("ST_Simplify"));
        this.registerFunction("simplifyPreserve", new StandardSQLFunction("ST_SimplifyPreserveTopology"));
        this.registerFunction("contains", new StandardSQLFunction("ST_Contains"));
   }
}
